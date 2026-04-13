"use client"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { heroes } from "@/lib/data"
import { HeroRole } from "@/types/hero"
import { HeroCard } from "./hero-card"
import {
  trackHeroRoleFilter,
  trackHeroesViewed,
  trackHeroSearch,
  trackPageVisit,
} from "@/lib/user-activity"

const roleFilters: Array<HeroRole | "All"> = [
  "All",
  "EXP",
  "Gold",
  "Mid",
  "Jungle",
  "Roam",
]

export function HeroesGrid() {
  const [search, setSearch] = useState("")
  const [selectedRole, setSelectedRole] = useState<HeroRole | "All">("All")

  useEffect(() => {
    trackPageVisit("heroes")
    trackHeroesViewed()
  }, [])

  useEffect(() => {
    const trimmed = search.trim()
    if (!trimmed) return

    const timeout = window.setTimeout(() => {
      trackHeroSearch(trimmed)
    }, 500)

    return () => window.clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    trackHeroRoleFilter(selectedRole)
  }, [selectedRole])

  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {
      const matchesSearch = hero.name.toLowerCase().includes(search.toLowerCase())
      const matchesRole =
        selectedRole === "All" || hero.roles.includes(selectedRole)

      return matchesSearch && matchesRole
    })
  }, [search, selectedRole])

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Heróis</h1>
              <p className="mt-1 text-sm text-zinc-400">
                Explore todos os heróis, filtre por rota e encontre picks mais rápido.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
              {filteredHeroes.length} herói{filteredHeroes.length !== 1 ? "s" : ""} encontrado{filteredHeroes.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Pesquisar herói..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-2xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {roleFilters.map((role) => {
              const active = selectedRole === role

              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:bg-zinc-800"
                  }`}
                >
                  {role === "All" ? "Todas" : role}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {filteredHeroes.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredHeroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
          ))}
        </section>
      ) : (
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 text-center shadow-2xl">
          <h2 className="text-lg font-semibold text-white">
            Nenhum herói encontrado
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Tente outro nome ou troque o filtro de rota para ampliar os resultados.
          </p>
        </section>
      )}
    </div>
  )
}