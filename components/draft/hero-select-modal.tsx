"use client"

import { X } from "lucide-react"
import { DraftSuggestions } from "./draft-suggestions"
import { HeroList } from "./hero-list"
import { Hero, HeroRole } from "@/types/hero"
import type { BanSuggestion, Suggestion } from "@/lib/pick-suggester"

type HeroSelectModalProps = {
  open: boolean
  onClose: () => void
  search: string
  onSearchChange: (value: string) => void
  selectedRole: HeroRole | "All"
  onRoleChange: (value: HeroRole | "All") => void
  usedHeroNames: string[]
  currentActionType: "pick" | "ban"
  roleSuggestions: Record<HeroRole, Suggestion[]>
  banSuggestions: BanSuggestion[]
  onSelectHero: (hero: Hero) => void
}

export function HeroSelectModal({
  open,
  onClose,
  search,
  onSearchChange,
  selectedRole,
  onRoleChange,
  usedHeroNames,
  currentActionType,
  roleSuggestions,
  banSuggestions,
  onSelectHero,
}: HeroSelectModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-red-400">
            TIAMAT GG
          </p>
          <h2 className="text-xl font-black uppercase tracking-[0.15em] text-white">
            Seleção de Herói
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-700 bg-slate-950 p-2 text-slate-300 transition hover:border-red-500 hover:text-red-400"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_420px]">
        <HeroList
          search={search}
          onSearchChange={onSearchChange}
          selectedRole={selectedRole}
          onRoleChange={onRoleChange}
          usedHeroNames={usedHeroNames}
          onSelectHero={onSelectHero}
        />

        <div className="hidden flex-col border-l border-slate-800 bg-[#05070d] lg:flex">
          <div className="border-b border-slate-800 p-4">
            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-slate-300">
              Sugestões Inteligentes
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Baseado na fase atual do draft.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <DraftSuggestions
              roleSuggestions={roleSuggestions}
              banSuggestions={banSuggestions}
              currentActionType={currentActionType}
            />
          </div>
        </div>
      </div>
    </div>
  )
}