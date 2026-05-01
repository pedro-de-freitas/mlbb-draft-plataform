"use client"

import { X } from "lucide-react"
import { DraftSuggestions } from "./draft-suggestions"
import { HeroRole } from "@/types/hero"
import type { BanSuggestion, Suggestion } from "@/lib/pick-suggester"

type SuggestionsModalProps = {
  open: boolean
  onClose: () => void
  currentActionType: "pick" | "ban"
  roleSuggestions: Record<HeroRole, Suggestion[]>
  banSuggestions: BanSuggestion[]
}

export function SuggestionsModal({
  open,
  onClose,
  currentActionType,
  roleSuggestions,
  banSuggestions,
}: SuggestionsModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl">
      <div className="h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-[#05070d] shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-purple-400">
              Sugestões inteligentes
            </p>
            <h2 className="text-xl font-black uppercase text-white">
              {currentActionType === "ban" ? "Sugestões de ban" : "Sugestões de pick"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-950 p-2 text-slate-300 hover:border-red-500 hover:text-red-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(90vh-81px)] overflow-y-auto p-5">
          <DraftSuggestions
            roleSuggestions={roleSuggestions}
            banSuggestions={banSuggestions}
            currentActionType={currentActionType}
          />
        </div>
      </div>
    </div>
  )
}