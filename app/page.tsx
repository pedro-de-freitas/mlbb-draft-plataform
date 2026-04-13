"use client"

import { useEffect, useMemo, useState } from "react"
import { AppShell } from "@/components/layout/appshell/app-shell"
import { metaData } from "@/lib/meta-data"
import { curatedMatchups } from "@/lib/counters-data"
import {
  getAnalyzedHeroesCount,
  getSavedDraftsCount,
  getUserActivity,
  trackPageVisit,
  UserActivityState,
} from "@/lib/user-activity"

function formatRelativeDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "Data inválida"

  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  })
}

function DashboardStatCard({
  label,
  value,
  helper,
}: {
  label: string
  value: string | number
  helper: string
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">
      <p className="text-sm text-zinc-400">{label}</p>
      <h2 className="mt-2 text-2xl font-bold text-white">{value}</h2>
      <p className="mt-2 text-xs leading-5 text-zinc-500">{helper}</p>
    </div>
  )
}

function DashboardSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export default function HomePage() {
  const [activity] = useState<UserActivityState>(() => getUserActivity())

  useEffect(() => {
    trackPageVisit("dashboard")
  }, [])

  const analyzedHeroes = useMemo(() => getAnalyzedHeroesCount(), [activity])
  const savedDraftsCount = useMemo(() => getSavedDraftsCount(), [activity])

  const countersRegistered = useMemo(() => {
    return Object.keys(curatedMatchups).length
  }, [])

  const topMetaHeroes = useMemo(() => {
    return metaData.heroes.slice(0, 5)
  }, [])

  const recentActions = activity?.recentActions ?? []
  const pageVisits = activity?.pageVisits ?? {
    dashboard: 0,
    draft: 0,
    simulator: 0,
    meta: 0,
    heroes: 0,
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p className="mt-2 text-sm text-zinc-400 sm:text-base">
            Visão geral da tua atividade na plataforma, do meta atual e do uso
            das ferramentas de draft, picks, bans, counters e simulador.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <DashboardStatCard
            label="Meta atual"
            value={metaData.patchLabel}
            helper={`Atualizado em ${metaData.updatedAt}`}
          />

          <DashboardStatCard
            label="Heróis analisados"
            value={analyzedHeroes}
            helper="Quantidade única de heróis presentes nos drafts salvos pelo usuário."
          />

          <DashboardStatCard
            label="Drafts simulados"
            value={activity?.draftsSimulated ?? 0}
            helper="Total de vezes que o simulador foi usado com drafts salvos."
          />

          <DashboardStatCard
            label="Counters cadastrados"
            value={countersRegistered}
            helper="Total de heróis com base de matchup disponível no sistema."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <DashboardSection
            title="Visão geral"
            description="Resumo prático do estado atual do usuário e da plataforma."
          >
            <div className="space-y-3 text-sm leading-6 text-zinc-300">
              <p>
                Você tem{" "}
                <span className="font-semibold text-white">{savedDraftsCount}</span>{" "}
                drafts salvos, já analisou{" "}
                <span className="font-semibold text-white">{analyzedHeroes}</span>{" "}
                heróis dentro dos seus drafts e usou o simulador{" "}
                <span className="font-semibold text-white">
                  {activity?.draftsSimulated ?? 0}
                </span>{" "}
                vezes.
              </p>

              <p>
                O sistema está operando com a base de meta{" "}
                <span className="font-semibold text-white">{metaData.patchLabel}</span>,
                e as sugestões de picks e bans já consideram estrutura do draft,
                counters, sinergias e prioridade de meta.
              </p>
            </div>
          </DashboardSection>

          <DashboardSection
            title="Próximo passo"
            description="Sugestão objetiva para aproveitar melhor a plataforma."
          >
            <p className="text-sm leading-6 text-zinc-300">
              Monte drafts mais variados, salve composições por objetivo
              específico e compare cenários no simulador para entender melhor
              win conditions, riscos e matchups entre Blue e Red Side.
            </p>
          </DashboardSection>

          <DashboardSection
            title="Uso das páginas"
            description="Quantidade de visitas registradas por área."
          >
            <div className="space-y-2 text-sm text-zinc-300">
              <p>
                • Dashboard:{" "}
                <span className="font-semibold text-white">{pageVisits.dashboard}</span>
              </p>
              <p>
                • Draft:{" "}
                <span className="font-semibold text-white">{pageVisits.draft}</span>
              </p>
              <p>
                • Simulador:{" "}
                <span className="font-semibold text-white">{pageVisits.simulator}</span>
              </p>
              <p>
                • Meta:{" "}
                <span className="font-semibold text-white">{pageVisits.meta}</span>
              </p>
              <p>
                • Heroes:{" "}
                <span className="font-semibold text-white">{pageVisits.heroes}</span>
              </p>
            </div>
          </DashboardSection>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <DashboardSection
            title="Top prioridades do meta"
            description="Heróis mais bem posicionados na tua base atual de meta."
          >
            <div className="grid gap-3">
              {topMetaHeroes.map((hero) => (
                <div
                  key={hero.heroName}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{hero.heroName}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {hero.bestRoles.join(" • ")} • Tier {hero.tier}
                      </p>
                    </div>

                    <div className="text-right text-xs text-zinc-400">
                      <p>Priority {hero.priorityScore}</p>
                      <p>Ban {hero.banPriority}</p>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1 text-sm text-zinc-300">
                    {hero.reasons.slice(0, 2).map((reason) => (
                      <li key={reason}>• {reason}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DashboardSection>

          <DashboardSection
            title="Atividade recente"
            description="Últimas ações registradas do usuário na plataforma."
          >
            {recentActions.length > 0 ? (
              <div className="space-y-3">
                {recentActions.map((action) => (
                  <div
                    key={action.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                  >
                    <p className="font-medium text-white">{action.label}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {formatRelativeDate(action.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400">
                Ainda não há ações registradas. Comece criando drafts, abrindo o
                meta e usando o simulador.
              </p>
            )}
          </DashboardSection>
        </div>
      </div>
    </AppShell>
  )
}