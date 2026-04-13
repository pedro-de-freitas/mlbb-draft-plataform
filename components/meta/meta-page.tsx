"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { getHeroImage } from "@/lib/get-hero-image"
import { HeroRole } from "@/types/hero"
import { metaData } from "@/lib/meta-data"
import { trackMetaViewed, trackPageVisit } from "@/lib/user-activity"

const tiers = ["S+", "S", "A", "B", "C"] as const

export function MetaPage() {
  const [selectedRole, setSelectedRole] = useState<HeroRole | "All">("All")
  const [selectedTier, setSelectedTier] = useState<(typeof tiers)[number] | "All">("All")
  const [search, setSearch] = useState("")

  useEffect(() => {
    trackPageVisit("meta")
    trackMetaViewed()
  }, [])

  const filteredHeroes = useMemo(() => {
    return metaData.heroes.filter((hero) => {
      const matchesRole =
        selectedRole === "All" || hero.bestRoles.includes(selectedRole)

      const matchesTier =
        selectedTier === "All" || hero.tier === selectedTier

      const matchesSearch =
        !search.trim() ||
        hero.heroName.toLowerCase().includes(search.toLowerCase())

      return matchesRole && matchesTier && matchesSearch
    })
  }, [selectedRole, selectedTier, search])

  const topBlindPicks = [...metaData.heroes]
    .sort((a, b) => b.blindPickScore - a.blindPickScore)
    .slice(0, 6)

  const topBanPriorities = [...metaData.heroes]
    .sort((a, b) => b.banPriority - a.banPriority)
    .slice(0, 6)

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-bold text-white">Meta</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Veja os heróis mais fortes do meta atual, prioridades de ban,
              melhores blind picks, combinações fortes e tendências que também
              impactam as sugestões de picks e bans do Draft.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              Atualizado para
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {metaData.patchLabel}
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Snapshot: {metaData.updatedAt}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <InfoPanel title="Leitura geral do meta">
          {metaData.overview}
        </InfoPanel>

        <InfoPanel title="Impacto no Draft">
          Esta página não é só informativa: os pesos do meta também entram nas
          sugestões de pick e ban, elevando heróis prioritários e dando mais valor
          a picks estáveis, blind picks fortes e bans de alto impacto.
        </InfoPanel>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CardList
          title="Melhores blind picks"
          description="Heróis que entram bem cedo no draft e são mais difíceis de punir."
          items={topBlindPicks.map((hero) => ({
            title: hero.heroName,
            subtitle: `${hero.tier} • Blind ${hero.blindPickScore}`,
            description: hero.reasons.join(" • "),
          }))}
        />

        <CardList
          title="Maiores prioridades de ban"
          description="Heróis que merecem mais respeito no meta atual."
          items={topBanPriorities.map((hero) => ({
            title: hero.heroName,
            subtitle: `${hero.tier} • Ban ${hero.banPriority}`,
            description: hero.reasons.join(" • "),
          }))}
        />
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">Filtros</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Filtre por rota, tier ou nome do herói.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar herói"
            className="h-11 rounded-2xl border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
          />

          <select
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value as HeroRole | "All")}
            className="h-11 rounded-2xl border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none focus:border-zinc-500"
          >
            <option value="All">Todas as rotas</option>
            <option value="EXP">EXP</option>
            <option value="Gold">Gold</option>
            <option value="Mid">Mid</option>
            <option value="Jungle">Jungle</option>
            <option value="Roam">Roam</option>
          </select>

          <select
            value={selectedTier}
            onChange={(event) => setSelectedTier(event.target.value as (typeof tiers)[number] | "All")}
            className="h-11 rounded-2xl border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none focus:border-zinc-500"
          >
            <option value="All">Todos os tiers</option>
            {tiers.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">Tier list do meta</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Heróis com peso real no meta atual e já conectados ao Draft.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filteredHeroes.map((hero) => (
            <div
              key={hero.heroName}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-zinc-800">
                  <Image
                    src={getHeroImage(hero.heroName)}
                    alt={hero.heroName}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">{hero.heroName}</p>
                      <p className="mt-1 text-xs text-zinc-400">
                        {hero.bestRoles.join(" • ")}
                      </p>
                    </div>

                    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-bold text-zinc-200">
                      {hero.tier}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hero.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] font-bold uppercase text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <MiniMetric label="Priority" value={hero.priorityScore} />
                <MiniMetric label="Ban" value={hero.banPriority} />
                <MiniMetric label="Blind" value={hero.blindPickScore} />
              </div>

              <ul className="mt-4 space-y-1.5 text-sm text-zinc-300">
                {hero.reasons.map((reason) => (
                  <li key={reason}>• {reason}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CardList
          title="Tendências do meta"
          description="Leituras estratégicas do patch atual."
          items={metaData.trends.map((trend) => ({
            title: trend.title,
            subtitle: "Tendência",
            description: trend.description,
          }))}
        />

        <CardList
          title="Combinações fortes"
          description="Duplas e núcleos que se encaixam muito bem."
          items={metaData.combos.map((combo) => ({
            title: combo.heroes.join(" + "),
            subtitle: combo.label,
            description: combo.description,
          }))}
        />
      </section>
    </div>
  )
}

function InfoPanel({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <p className="mt-3 text-sm text-zinc-300">{children}</p>
    </section>
  )
}

function CardList({
  title,
  description,
  items,
}: {
  title: string
  description: string
  items: { title: string; subtitle: string; description: string }[]
}) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="mt-1 text-sm text-zinc-400">{description}</p>
      </div>

      <div className="grid gap-3">
        {items.map((item) => (
          <div
            key={`${item.title}-${item.subtitle}`}
            className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
          >
            <p className="font-semibold text-white">{item.title}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
              {item.subtitle}
            </p>
            <p className="mt-3 text-sm text-zinc-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function MiniMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black/20 p-3">
      <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-white">{value}</p>
    </div>
  )
}