import { DraftEntry } from "@/types/draft"

const STORAGE_KEY = "mlbb_current_draft"

function isBrowser() {
  return typeof window !== "undefined"
}

export function getCurrentDraft(): DraftEntry[] {
  if (!isBrowser()) return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw) as DraftEntry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCurrentDraft(entries: DraftEntry[]) {
  if (!isBrowser()) return

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {}
}

export function clearCurrentDraft() {
  if (!isBrowser()) return

  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {}
}