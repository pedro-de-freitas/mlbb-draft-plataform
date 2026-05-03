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
  onSelectHero: (hero: Hero) => void
}

const roles: Array<HeroRole | "All"> = [
  "All",
  "EXP",
  "Jungle",
  "Mid",
  "Gold",
  "Roam",
]

export function HeroList({
  search,
  onSearchChange,
  selectedRole,
  onRoleChange,
  usedHeroNames,
  onSelectHero,
}: HeroListProps) {
  const filteredHeroes = heroes.filter((hero) => {
    const matchSearch = hero.name.toLowerCase().includes(search.toLowerCase())
    const matchRole = selectedRole === "All" || hero.roles.includes(selectedRole)

    return matchSearch && matchRole
  })

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-slate-800 bg-[#05070d] p-4 sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Pesquisar herói..."
            className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 pl-11 pr-4 text-sm font-semibold text-white outline-none placeholder:text-slate-600 focus:border-red-500"
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => onRoleChange(role)}
              className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-black uppercase transition ${
                selectedRole === role
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500"
              }`}
            >
              {role === "All" ? "Todos" : role}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {filteredHeroes.map((hero) => {
            const used = usedHeroNames.includes(hero.name)

            return (
              <button
                key={hero.id}
                type="button"
                disabled={used}
                onClick={() => onSelectHero(hero)}
                className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 transition ${
                  used
                    ? "cursor-not-allowed opacity-25 grayscale"
                    : "hover:scale-105 hover:border-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.3)]"
                }`}
              >
                <Image
                  src={getHeroImage(hero.name)}
                  alt={hero.name}
                  width={220}
                  height={220}
                  className="h-[110px] w-full object-cover sm:h-[140px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-0 w-full p-2">
                  <p className="line-clamp-2 text-xs font-bold leading-tight text-white">
                    {hero.name}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}