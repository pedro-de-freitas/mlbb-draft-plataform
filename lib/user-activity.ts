import { getSavedDrafts } from "@/lib/saved-draft"

const STORAGE_KEY = "mlbb_user_activity"
const DEDUPE_KEY = "mlbb_user_activity_dedupe"

export type UserActivityState = {
  pageVisits: Record<string, number>
  draftsSimulated: number
  draftsSaved: number
  heroPageViews: number
  heroSearches: number
  heroRoleFilterChanges: number
  recentActions: {
    id: string
    label: string
    createdAt: string
  }[]
}

type DedupeState = Record<string, number>

function isBrowser() {
  return typeof window !== "undefined"
}

function buildDefaultState(): UserActivityState {
  return {
    pageVisits: {
      dashboard: 0,
      draft: 0,
      simulator: 0,
      meta: 0,
      heroes: 0,
    },
    draftsSimulated: 0,
    draftsSaved: 0,
    heroPageViews: 0,
    heroSearches: 0,
    heroRoleFilterChanges: 0,
    recentActions: [],
  }
}

function getDedupeState(): DedupeState {
  if (!isBrowser()) return {}

  try {
    const raw = window.localStorage.getItem(DEDUPE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as DedupeState
    return parsed && typeof parsed === "object" ? parsed : {}
  } catch {
    return {}
  }
}

function saveDedupeState(state: DedupeState) {
  if (!isBrowser()) return
  window.localStorage.setItem(DEDUPE_KEY, JSON.stringify(state))
}

function shouldSkipDuplicate(actionKey: string, windowMs = 1200) {
  if (!isBrowser()) return false

  const dedupe = getDedupeState()
  const now = Date.now()
  const lastTime = dedupe[actionKey] ?? 0

  if (now - lastTime < windowMs) {
    return true
  }

  dedupe[actionKey] = now
  saveDedupeState(dedupe)
  return false
}

export function getUserActivity(): UserActivityState {
  if (!isBrowser()) return buildDefaultState()

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildDefaultState()

    const parsed = JSON.parse(raw) as UserActivityState

    return {
      pageVisits: {
        dashboard: parsed.pageVisits?.dashboard ?? 0,
        draft: parsed.pageVisits?.draft ?? 0,
        simulator: parsed.pageVisits?.simulator ?? 0,
        meta: parsed.pageVisits?.meta ?? 0,
        heroes: parsed.pageVisits?.heroes ?? 0,
      },
      draftsSimulated: parsed.draftsSimulated ?? 0,
      draftsSaved: parsed.draftsSaved ?? 0,
      heroPageViews: parsed.heroPageViews ?? 0,
      heroSearches: parsed.heroSearches ?? 0,
      heroRoleFilterChanges: parsed.heroRoleFilterChanges ?? 0,
      recentActions: Array.isArray(parsed.recentActions)
        ? parsed.recentActions.slice(0, 20)
        : [],
    }
  } catch {
    return buildDefaultState()
  }
}

function saveUserActivity(next: UserActivityState) {
  if (!isBrowser()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

function pushRecentAction(
  state: UserActivityState,
  label: string
): UserActivityState {
  const action = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
    label,
    createdAt: new Date().toISOString(),
  }

  return {
    ...state,
    recentActions: [action, ...state.recentActions].slice(0, 12),
  }
}

export function trackPageVisit(
  page: "dashboard" | "draft" | "simulator" | "meta" | "heroes"
) {
  if (!isBrowser()) return
  if (shouldSkipDuplicate(`page:${page}`, 1200)) return

  const current = getUserActivity()
  const next: UserActivityState = {
    ...current,
    pageVisits: {
      ...current.pageVisits,
      [page]: (current.pageVisits[page] ?? 0) + 1,
    },
  }

  saveUserActivity(next)
}

export function trackDraftSaved(name: string) {
  if (!isBrowser()) return
  if (shouldSkipDuplicate(`draft-saved:${name}`, 1200)) return

  const current = getUserActivity()
  const next = pushRecentAction(
    {
      ...current,
      draftsSaved: current.draftsSaved + 1,
    },
    `Draft salvo: ${name}`
  )

  saveUserActivity(next)
}

export function trackSimulationUsed(draftName: string) {
  if (!isBrowser()) return
  if (shouldSkipDuplicate(`simulation:${draftName}`, 1200)) return

  const current = getUserActivity()
  const next = pushRecentAction(
    {
      ...current,
      draftsSimulated: current.draftsSimulated + 1,
    },
    `Simulação aberta: ${draftName}`
  )

  saveUserActivity(next)
}

export function trackMetaViewed() {
  if (!isBrowser()) return
  if (shouldSkipDuplicate("meta:view", 1200)) return

  const current = getUserActivity()
  const next = pushRecentAction(current, "Página Meta visualizada")
  saveUserActivity(next)
}

export function trackDraftViewed() {
  if (!isBrowser()) return
  if (shouldSkipDuplicate("draft:view", 1200)) return

  const current = getUserActivity()
  const next = pushRecentAction(current, "Página Draft visualizada")
  saveUserActivity(next)
}

export function trackHeroesViewed() {
  if (!isBrowser()) return
  if (shouldSkipDuplicate("heroes:view", 1200)) return

  const current = getUserActivity()
  const next = pushRecentAction(
    {
      ...current,
      heroPageViews: current.heroPageViews + 1,
    },
    "Página Heroes visualizada"
  )

  saveUserActivity(next)
}

export function trackHeroSearch(term: string) {
  if (!isBrowser()) return
  const normalized = term.trim().toLowerCase()
  if (!normalized) return
  if (shouldSkipDuplicate(`hero-search:${normalized}`, 800)) return

  const current = getUserActivity()
  const next = pushRecentAction(
    {
      ...current,
      heroSearches: current.heroSearches + 1,
    },
    `Busca de herói: ${term}`
  )

  saveUserActivity(next)
}

export function trackHeroRoleFilter(role: string) {
  if (!isBrowser()) return
  if (role === "All") return
  if (shouldSkipDuplicate(`hero-role:${role}`, 800)) return

  const current = getUserActivity()
  const next = pushRecentAction(
    {
      ...current,
      heroRoleFilterChanges: current.heroRoleFilterChanges + 1,
    },
    `Filtro de herói: ${role}`
  )

  saveUserActivity(next)
}

export function getAnalyzedHeroesCount() {
  const drafts = getSavedDrafts()
  const uniqueHeroes = new Set<string>()

  drafts.forEach((draft) => {
    draft.entries.forEach((entry) => {
      if (entry.type === "pick" || entry.type === "ban") {
        uniqueHeroes.add(entry.hero.name)
      }
    })
  })

  return uniqueHeroes.size
}

export function getSavedDraftsCount() {
  return getSavedDrafts().length
}