import { DraftEntry } from "@/types/draft"
import { trackDraftSaved } from "@/lib/user-activity"

export type SavedDraft = {
  id: string
  name: string
  createdAt: string
  entries: DraftEntry[]
}

const STORAGE_KEY = "mlbb_saved_drafts"

function isBrowser() {
  return typeof window !== "undefined"
}

export function getSavedDrafts(): SavedDraft[] {
  if (!isBrowser()) return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw) as SavedDraft[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveDraft(name: string, entries: DraftEntry[]) {
  if (!isBrowser()) return null
  if (!name.trim()) return null
  if (entries.length === 0) return null

  const drafts = getSavedDrafts()

  const newDraft: SavedDraft = {
    id: crypto.randomUUID(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
    entries,
  }

  const nextDrafts = [newDraft, ...drafts]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts))

  trackDraftSaved(newDraft.name)

  return newDraft
}

export function deleteDraft(id: string) {
  if (!isBrowser()) return

  const drafts = getSavedDrafts().filter((draft) => draft.id !== id)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
}

export function getDraftById(id: string) {
  return getSavedDrafts().find((draft) => draft.id === id) ?? null
}