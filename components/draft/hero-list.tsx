"use client"

import Image from "next/image"
import { Search } from "lucide-react"
import { heroes } from "@/lib/data"
import { Hero, HeroRole } from "@/types/hero"
import { getHeroImage } from "@/lib/get-hero-image"

type HeroListProps = {
  search: string
  onSearchChange: (value: string) => void
  selectedRole: HeroRole | "All"
  onRoleChange: (value: HeroRole | "All") => void
  usedHeroNames: string[]
  currentActionLabel?: string
  onSelectHero: (hero: Hero) => void
}

const roleFilters: Array<HeroRole | "All"> = [
  "All",
  "EXP",
  "Gold",
  "Mid",
  "Jungle",
  "Roam",
]

function roleBadgeStyles(role: HeroRole) {
  switch (role) {
    case "EXP":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
    case "Gold":
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
    case "Mid":
      return "border-violet-500/20 bg-violet-500/10 text-violet-300"
    case "Jungle":
      return "border-red-500/20 bg-red-500/10 text-red-300"
    case "Roam":
      return "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
    default:
      return "border-zinc-700 bg-zinc-800 text-zinc-300"
  }
}

export function HeroList({
  search,
  onSearchChange,
  selectedRole,
  onRoleChange,
  usedHeroNames,
  currentActionLabel,
  onSelectHero,
}: HeroListProps) {
  const filteredHeroes = heroes.filter((hero) => {
    const matchesSearch = hero.name.toLowerCase().includes(search.toLowerCase())
    const matchesRole =
      selectedRole === "All" || hero.roles.includes(selectedRole)

    return matchesSearch && matchesRole
  })

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-sm">
      <div className="border-b border-zinc-800 p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-white sm:text-xl">Heróis</h2>
        <p className="mt-1 text-sm text-zinc-400">
          Pesquise por nome e filtre por rota.
        </p>

        {currentActionLabel && (
          <div className="mt-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {currentActionLabel}
          </div>
        )}

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Pesquisar herói..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 w-full rounded-2xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {roleFilters.map((role) => {
            const active = selectedRole === role

            return (
              <button
                key={role}
                onClick={() => onRoleChange(role)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  active
                    ? "border-red-500 bg-red-500 text-white"
                    : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800"
                }`}
              >
                {role === "All" ? "Todas" : role}
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-h-[72vh] overflow-y-auto p-4 sm:p-5">
        {filteredHeroes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/60 p-6 text-center text-sm text-zinc-400">
            Nenhum herói encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-1">
            {filteredHeroes.map((hero) => {
              const isUsed = usedHeroNames.includes(hero.name)

              return (
                <button
                  key={hero.id}
                  onClick={() => onSelectHero(hero)}
                  disabled={isUsed}
                  className={`rounded-2xl border p-4 text-left transition ${
                    isUsed
                      ? "cursor-not-allowed border-zinc-800 bg-zinc-950/50 opacity-50"
                      : "border-zinc-800 bg-zinc-950 hover:border-red-500/40 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-zinc-800">
                      <Image
                        src={getHeroImage(hero.name)}
                        alt={hero.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-base font-semibold text-white">
                            {hero.name}
                          </p>
                          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                            {hero.specialty}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {hero.roles.map((role) => (
                          <span
                            key={role}
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase sm:text-xs ${roleBadgeStyles(
                              role
                            )}`}
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      {isUsed ? "Já usado no draft" : "Clique para selecionar"}
                    </span>

                    {!isUsed && (
                      <span className="text-xs font-medium text-red-300">
                        Escolher
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}