"use client"

import { SavedDraft } from "@/lib/saved-draft"

type SavedDraftSelectProps = {
  drafts: SavedDraft[]
  selectedId: string
  onChange: (id: string) => void
  label: string
}

export function SavedDraftSelect({
  drafts,
  selectedId,
  onChange,
  label,
}: SavedDraftSelectProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
      <p className="text-sm font-semibold text-zinc-300">{label}</p>

      <select
        value={selectedId}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 h-11 w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none focus:border-zinc-500"
      >
        <option value="">Selecione um draft salvo</option>
        {drafts.map((draft) => (
          <option key={draft.id} value={draft.id}>
            {draft.name}
          </option>
        ))}
      </select>
    </div>
  )
}