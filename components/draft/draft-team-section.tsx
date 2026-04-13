import type { ReactNode } from "react"
import { ShieldBan, Sparkles, Swords } from "lucide-react"
import { DraftEntry, TeamRoleAssignments } from "@/types/draft"
import { HeroRole } from "@/types/hero"
import { DraftSlot } from "./draft-slot"
import { analyzeTeam } from "@/lib/draft-analyzer"
import { getHeroMatchup } from "@/lib/hero-matchup"
import { roleOrder } from "./draft-constants"

type DraftTeamSectionProps = {
  side: "blue" | "red"
  enemyPicks: DraftEntry[]
  picks: DraftEntry[]
  bans: DraftEntry[]
  assignments: TeamRoleAssignments
  analysis: ReturnType<typeof analyzeTeam>
  onAssignRole: (side: "blue" | "red", heroName: string, role: HeroRole) => void
}

export function DraftTeamSection({
  side,
  enemyPicks,
  picks,
  bans,
  assignments,
  analysis,
  onAssignRole,
}: DraftTeamSectionProps) {
  const isBlue = side === "blue"

  const matchupNotes = picks.flatMap((pick) => {
    const data = getHeroMatchup(pick.hero.name)
    const enemyNames = enemyPicks.map((enemy) => enemy.hero.name)

    const countersApplied = data.counters.filter((name) =>
      enemyNames.includes(name)
    )

    const synergies = data.synergies.filter((name) =>
      picks.some((ally) => ally.hero.name === name)
    )

    const notes: string[] = []

    if (countersApplied.length > 0) {
      notes.push(`${pick.hero.name} countera: ${countersApplied.join(", ")}`)
    }

    if (synergies.length > 0) {
      notes.push(`${pick.hero.name} sinergiza com: ${synergies.join(", ")}`)
    }

    return notes
  })

  const alerts = buildAlerts(analysis)

  const laneStrength = buildLaneStrength({
    picks,
    assignments,
    analysis,
  })

  return (
    <section
      className={`rounded-3xl border p-4 shadow-xl sm:p-6 ${
        isBlue
          ? "border-blue-500/20 bg-gradient-to-b from-blue-500/10 via-zinc-900 to-zinc-950"
          : "border-red-500/20 bg-gradient-to-b from-red-500/10 via-zinc-900 to-zinc-950"
      }`}
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className={`rounded-2xl border p-3 ${
            isBlue
              ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
              : "border-red-500/20 bg-red-500/10 text-red-300"
          }`}
        >
          {isBlue ? (
            <Swords className="h-5 w-5" />
          ) : (
            <ShieldBan className="h-5 w-5" />
          )}
        </div>

        <div>
          <h3
            className={`text-xl font-bold ${
              isBlue ? "text-blue-300" : "text-red-300"
            }`}
          >
            {isBlue ? "Blue Side" : "Red Side"}
          </h3>
          <p className="text-sm text-zinc-400">
            Análise de draft e atribuição de rota
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-zinc-300">Bans</p>
            <span className="text-xs text-zinc-500">5 slots</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <DraftSlot
                key={`ban-${side}-${index}`}
                label={`Ban ${index + 1}`}
                value={bans[index]?.hero.name}
                variant={side}
                compact
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-300">Picks</p>

          <div className="grid grid-cols-1 gap-4">
            {[0, 1, 2, 3, 4].map((index) => {
              const pick = picks[index]

              return (
                <div
                  key={`pick-${side}-${index}`}
                  className="rounded-2xl border border-zinc-800 bg-black/20 p-4 shadow-md"
                >
                  <div className="flex flex-col gap-3">
                    <DraftSlot
                      label={`Pick ${index + 1}`}
                      value={pick?.hero.name}
                      variant={side}
                    />

                    {pick && (
                      <div className="flex flex-wrap gap-2">
                        {roleOrder.map((role) => {
                          const active = pick.assignedRole === role
                          const natural = pick.hero.roles?.includes(role) ?? false

                          return (
                            <button
                              key={`${pick.hero.name}-${role}`}
                              type="button"
                              onClick={() => onAssignRole(side, pick.hero.name, role)}
                              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                                active
                                  ? isBlue
                                    ? "border-blue-500 bg-blue-500 text-white"
                                    : "border-red-500 bg-red-500 text-white"
                                  : natural
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                                  : "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                              }`}
                            >
                              {role}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-red-300" />
            <p className="text-sm font-semibold text-zinc-300">
              Análise da composição
            </p>
          </div>

          <div className="grid gap-3">
            <InfoBlock title="Resumo">{analysis.summary}</InfoBlock>

            <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Perfil de dano
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <MiniStat
                  label="Physical"
                  value={analysis.damageProfile?.physical ?? 0}
                />
                <MiniStat
                  label="Magic"
                  value={analysis.damageProfile?.magic ?? 0}
                />
                <MiniStat
                  label="Mixed"
                  value={analysis.damageProfile?.mixed ?? 0}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Métricas do draft
              </p>

              <div className="mt-3 grid gap-3 grid-cols-[repeat(auto-fit,minmax(110px,1fr))]">
                <MiniStat label="Early" value={analysis.metrics.earlyGame} />
                <MiniStat label="Late" value={analysis.metrics.lateGame} />
                <MiniStat label="Team Fight" value={analysis.metrics.teamFight} />
                <MiniStat label="Pick Off" value={analysis.metrics.pickOff} />
                <MiniStat label="Engage" value={analysis.metrics.engage} />
                <MiniStat label="Peel" value={analysis.metrics.peel} />
                <MiniStat label="Disengage" value={analysis.metrics.disengage} />
                <MiniStat label="Frontline" value={analysis.metrics.frontline} />
                <MiniStat
                  label="Phys Dmg"
                  value={analysis.metrics.physicalDamage}
                />
                <MiniStat
                  label="Magic Dmg"
                  value={analysis.metrics.magicDamage}
                />
                <MiniStat label="CC" value={analysis.metrics.crowdControl} />
              </div>
            </div>

            <ListBlock
              title="Pontos positivos"
              items={analysis.strengths}
              empty="Ainda sem pontos fortes definidos."
            />

            <ListBlock
              title="Pontos negativos"
              items={analysis.weaknesses}
              empty="Ainda sem fraquezas relevantes."
            />

            <ListBlock
              title="Alertas"
              items={alerts}
              empty="Nenhum alerta importante até agora."
            />

            <ListBlock
              title="Matchups"
              items={matchupNotes}
              empty="Sem interações fortes detectadas ainda."
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-zinc-300">
            Força por rota
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {roleOrder.map((role) => (
              <div
                key={`${side}-${role}`}
                className="rounded-2xl border border-zinc-800 bg-black/20 p-4 shadow-md"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  {role}
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  {assignments[role] || "Não definido"}
                </p>

                <p className="mt-2 text-xs text-zinc-400">
                  {laneStrength[role] || "Sem análise ainda."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function buildAlerts(analysis: ReturnType<typeof analyzeTeam>) {
  const alerts: string[] = []

  if (analysis.metrics.frontline === 0) {
    alerts.push("Time sem frontline confiável.")
  }

  if (analysis.metrics.engage === 0) {
    alerts.push("Comp com dificuldade para iniciar luta.")
  }

  if (
    analysis.metrics.disengage === 0 &&
    analysis.metrics.peel === 0 &&
    analysis.metrics.lateGame > 0
  ) {
    alerts.push("Comp escalando sem ferramentas boas para resetar ou proteger lutas.")
  }

  if (
    analysis.metrics.engage === 0 &&
    analysis.metrics.disengage === 0 &&
    analysis.metrics.peel === 0 &&
    analysis.metrics.teamFight > 0
  ) {
    alerts.push("O draft quer lutar, mas tem pouca capacidade de controlar o ritmo da fight.")
  }

  if (
    analysis.metrics.peel === 0 &&
    analysis.metrics.lateGame > 0
  ) {
    alerts.push("Há scaling, mas falta proteção para os carries.")
  }

  if (
    (analysis.damageProfile?.physical ?? 0) > 0 &&
    (analysis.damageProfile?.magic ?? 0) === 0
  ) {
    alerts.push("Dano muito concentrado em físico.")
  }

  if (
    (analysis.damageProfile?.magic ?? 0) > 0 &&
    (analysis.damageProfile?.physical ?? 0) === 0
  ) {
    alerts.push("Dano muito concentrado em mágico.")
  }

  if (analysis.metrics.crowdControl === 0 && analysis.metrics.teamFight > 0) {
    alerts.push("Tem potencial de team fight, mas pouco controle.")
  }

  return alerts
}

function buildLaneStrength({
  picks,
  assignments,
  analysis,
}: {
  picks: DraftEntry[]
  assignments: TeamRoleAssignments
  analysis: ReturnType<typeof analyzeTeam>
}) {
  const result: Partial<Record<HeroRole, string>> = {}

  roleOrder.forEach((role) => {
    const heroName = assignments[role]

    if (!heroName) {
      result[role] = "Rota ainda não atribuída."
      return
    }

    const pick = picks.find((item) => item.hero.name === heroName)

    if (!pick) {
      result[role] = "Sem análise ainda."
      return
    }

    const naturalForRole = pick.hero.roles?.includes(role) ?? false

    if (naturalForRole) {
      if (analysis.metrics.engage > 0 && (role === "Roam" || role === "EXP")) {
        result[role] = "Boa rota para impacto inicial e criação de jogadas."
        return
      }

      if (analysis.metrics.lateGame > analysis.metrics.earlyGame && role === "Gold") {
        result[role] = "Boa rota para escalar e carregar no mid/late game."
        return
      }

      if (analysis.metrics.earlyGame >= analysis.metrics.lateGame && role === "Jungle") {
        result[role] = "Rota com potencial para pressionar cedo."
        return
      }

      if (analysis.metrics.disengage > 0 && role === "Roam") {
        result[role] = "Boa rota para controlar ritmo de luta e proteger o time."
        return
      }

      if (role === "Mid") {
        result[role] = "Boa presença de rotação e apoio no mapa."
        return
      }

      result[role] = "Herói bem encaixado para essa rota."
      return
    }

    result[role] = "Função possível, mas não é a rota mais natural para esse herói."
  })

  return result
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <p className="mt-3 text-sm font-semibold text-white">{children}</p>
    </div>
  )
}

function ListBlock({
  title,
  items,
  empty,
}: {
  title: string
  items: string[]
  empty: string
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-zinc-300">
        {items.length > 0 ? (
          items.map((item) => <li key={item}>• {item}</li>)
        ) : (
          <li>• {empty}</li>
        )}
      </ul>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
      <p className="text-zinc-500">{label}</p>
      <p className="mt-1 font-bold text-white">{value}</p>
    </div>
  )
}