"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { heroes } from "@/lib/data"
import { getHeroImage } from "@/lib/get-hero-image"
import { getHeroMatchup } from "@/lib/hero-matchup" 
import { Hero, HeroRole } from "@/types/hero"

const roleFilters: Array<HeroRole | "All"> = [
  "All",
  "EXP",
  "Gold",
  "Mid",
  "Jungle",
  "Roam",
]

function roleBadgeStyles(role: string) {
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

export function CounterPanel() {
  const [search, setSearch] = useState("")
  const [selectedRole, setSelectedRole] = useState<HeroRole | "All">("All")
  const [selectedHeroName, setSelectedHeroName] = useState<string>(heroes[0]?.name ?? "")

  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {
      const matchesSearch = hero.name.toLowerCase().includes(search.toLowerCase())
      const matchesRole =
        selectedRole === "All" || hero.roles.includes(selectedRole)

      return matchesSearch && matchesRole
    })
  }, [search, selectedRole])

  const selectedHero =
    heroes.find((hero) => hero.name === selectedHeroName) ?? filteredHeroes[0]

  const matchup = selectedHero ? getHeroMatchup(selectedHero.name) : undefined

  return (
    <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[0.95fr_1.35fr]">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-sm">
        <div className="border-b border-zinc-800 p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-white sm:text-xl">Escolha um herói</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Pesquise e filtre para ver counters, sinergias e rotas.
          </p>

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Pesquisar herói..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-2xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {roleFilters.map((role) => {
              const active = selectedRole === role

              return (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
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
          <div className="grid grid-cols-1 gap-3">
            {filteredHeroes.map((hero) => {
              const active = selectedHero?.name === hero.name

              return (
                <button
                  key={hero.id}
                  onClick={() => setSelectedHeroName(hero.name)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-red-500/40 bg-zinc-950"
                      : "border-zinc-800 bg-zinc-950 hover:border-red-500/30 hover:bg-zinc-900"
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
                      <p className="truncate text-base font-semibold text-white">
                        {hero.name}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                        {hero.specialty}
                      </p>

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
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {selectedHero && matchup ? (
        <section className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 shadow-2xl">
            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[260px_1fr]">
              <div className="space-y-4">
                <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
                  <Image
                    src={getHeroImage(selectedHero.name)}
                    alt={selectedHero.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <InfoBox title="Função" value={selectedHero.specialty} />
                <InfoBox title="Tipo de dano" value={selectedHero.damageType} />
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
                    Counter Center
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-white">
                    {selectedHero.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Veja as melhores respostas contra esse herói, quem ele pune,
                    e com quais aliados ele funciona melhor.
                  </p>
                </div>

                <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Rotas</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedHero.roles.map((role) => (
                      <span
                        key={role}
                        className={`rounded-full border px-3 py-1.5 text-sm font-bold uppercase ${roleBadgeStyles(
                          role
                        )}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="grid gap-4 md:grid-cols-2">
                  <ListBox
                    title="Esse herói countera"
                    items={matchup.counters}
                    itemType="hero"
                  />
                  <ListBox
                    title="Counterado por"
                    items={matchup.counteredBy}
                    itemType="hero"
                  />
                </div>

                <ListBox
                  title="Melhores sinergias"
                  items={matchup.synergies}
                  itemType="hero"
                />

                <ListBox
                  title="Notas rápidas"
                  items={matchup.notes}
                  itemType="text"
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
          Selecione um herói para ver os detalhes.
        </section>
      )}
    </div>
  )
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  )
}

function ListBox({
  title,
  items,
  itemType,
}: {
  title: string
  items: string[]
  itemType: "hero" | "text"
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</p>

      <div className="mt-3 grid gap-3">
        {items.length > 0 ? (
          items.map((item) =>
            itemType === "hero" ? (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-3"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-zinc-800">
                  <Image
                    src={getHeroImage(item)}
                    alt={item}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-white">{item}</span>
              </div>
            ) : (
              <div
                key={item}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300"
              >
                • {item}
              </div>
            )
          )
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-400">
            Sem dados ainda.
          </div>
        )}
      </div>
    </section>
  )
}