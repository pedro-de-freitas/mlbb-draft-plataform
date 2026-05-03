"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { RotateCcw } from "lucide-react"
import { Hero, HeroRole } from "@/types/hero"
import { DraftEntry, TeamRoleAssignments } from "@/types/draft"
import { analyzeTeam } from "@/lib/draft-analyzer"
import { suggestBans, suggestPicksByRole } from "@/lib/pick-suggester"
import { analyzeDraftWithGemini } from "@/lib/gemini/gemini-draft"
import { draftSteps } from "./draft-constants"
import { DraftTeamSection } from "./draft-team-section"
import { HeroSelectModal } from "./hero-select-modal"
import { SuggestionsModal } from "./suggestions-modal"
import {
  clearCurrentDraft,
  getCurrentDraft,
  saveCurrentDraft,
} from "@/lib/current-drafts"
import { saveDraft } from "@/lib/saved-draft"

export function DraftBoard() {
  const [entries, setEntries] = useState<DraftEntry[]>(() => getCurrentDraft())
  const [search, setSearch] = useState("")
  const [selectedRole, setSelectedRole] = useState<HeroRole | "All">("All")
  const [heroModalOpen, setHeroModalOpen] = useState(false)
  const [suggestionsModalOpen, setSuggestionsModalOpen] = useState(false)
  const [draftName, setDraftName] = useState("")
  const [saveMessage, setSaveMessage] = useState("")
  const [geminiLoading, setGeminiLoading] = useState(false)
  const [geminiAnalysis, setGeminiAnalysis] = useState("")
  const [geminiError, setGeminiError] = useState("")

  useEffect(() => {
    saveCurrentDraft(entries)
  }, [entries])

  const currentStep = draftSteps[entries.length]

  const usedHeroNames = useMemo(
    () => entries.map((entry) => entry.hero.name),
    [entries]
  )

  const blueEntries = useMemo(
    () => entries.filter((entry) => entry.side === "blue"),
    [entries]
  )

  const redEntries = useMemo(
    () => entries.filter((entry) => entry.side === "red"),
    [entries]
  )

  const bluePicks = useMemo(
    () => blueEntries.filter((entry) => entry.type === "pick"),
    [blueEntries]
  )

  const redPicks = useMemo(
    () => redEntries.filter((entry) => entry.type === "pick"),
    [redEntries]
  )

  const blueBans = useMemo(
    () => blueEntries.filter((entry) => entry.type === "ban"),
    [blueEntries]
  )

  const redBans = useMemo(
    () => redEntries.filter((entry) => entry.type === "ban"),
    [redEntries]
  )

  const blueAssignments: TeamRoleAssignments = useMemo(() => {
    const assignments: TeamRoleAssignments = {}

    bluePicks.forEach((pick) => {
      if (pick.assignedRole) {
        assignments[pick.assignedRole] = pick.hero.name
      }
    })

    return assignments
  }, [bluePicks])

  const redAssignments: TeamRoleAssignments = useMemo(() => {
    const assignments: TeamRoleAssignments = {}

    redPicks.forEach((pick) => {
      if (pick.assignedRole) {
        assignments[pick.assignedRole] = pick.hero.name
      }
    })

    return assignments
  }, [redPicks])

  const blueAnalysis = useMemo(() => {
    return analyzeTeam(bluePicks, redPicks)
  }, [bluePicks, redPicks])

  const redAnalysis = useMemo(() => {
    return analyzeTeam(redPicks, bluePicks)
  }, [redPicks, bluePicks])

  const winnerText =
    blueAnalysis.score === redAnalysis.score
      ? "Draft equilibrado."
      : blueAnalysis.score > redAnalysis.score
      ? "Blue Side está mais forte."
      : "Red Side está mais forte."

  const roleSuggestions = useMemo(() => {
    const team = currentStep?.side === "red" ? redPicks : bluePicks
    const enemy = currentStep?.side === "red" ? bluePicks : redPicks

    return suggestPicksByRole(team, enemy, usedHeroNames)
  }, [currentStep, bluePicks, redPicks, usedHeroNames])

  const banSuggestions = useMemo(() => {
    const team = currentStep?.side === "red" ? redPicks : bluePicks
    const enemy = currentStep?.side === "red" ? bluePicks : redPicks

    return suggestBans(team, enemy, usedHeroNames)
  }, [currentStep, bluePicks, redPicks, usedHeroNames])

  function saveDraftForSimulator() {
    if (entries.length === 0) {
      setSaveMessage("Monte um draft antes de salvar.")
      return
    }

    const name =
      draftName.trim() || `Draft ${new Date().toLocaleString("pt-BR")}`

    const saved = saveDraft(name, entries)

    if (!saved) {
      setSaveMessage("Não foi possível salvar o draft.")
      return
    }

    setDraftName("")
    setSaveMessage(`Draft "${name}" salvo para o simulador.`)
  }

  async function handleGeminiAnalysis() {
    if (entries.length === 0) {
      setGeminiError("Monte um draft antes de analisar com IA.")
      return
    }

    try {
      setGeminiLoading(true)
      setGeminiError("")

      const analysis = await analyzeDraftWithGemini({
        entries,
        blueAnalysis,
        redAnalysis,
        currentStep,
      })

      setGeminiAnalysis(analysis)
    } catch {
      setGeminiError("Não foi possível analisar com Gemini agora.")
    } finally {
      setGeminiLoading(false)
    }
  }

  function openHeroSelection() {
    if (!currentStep) return
    setHeroModalOpen(true)
  }

  function handleSelectHero(hero: Hero) {
    if (!currentStep) return
    if (usedHeroNames.includes(hero.name)) return

    const entry: DraftEntry = {
      stepId: currentStep.id,
      side: currentStep.side,
      type: currentStep.type,
      hero,
      assignedRole: undefined,
    }

    setEntries((prev) => [...prev, entry])
    setHeroModalOpen(false)
  }

  function handleAssignRole(
    side: "blue" | "red",
    heroName: string,
    role: HeroRole
  ) {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.side !== side) return entry
        if (entry.type !== "pick") return entry
        if (entry.hero.name !== heroName) return entry

        return {
          ...entry,
          assignedRole: role,
        }
      })
    )
  }

  function resetDraft() {
    setEntries([])
    setSearch("")
    setSelectedRole("All")
    setHeroModalOpen(false)
    setSuggestionsModalOpen(false)
    setDraftName("")
    setSaveMessage("")
    setGeminiAnalysis("")
    setGeminiError("")
    clearCurrentDraft()
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(239,68,68,0.16),transparent_35%)]" />

      <header className="relative z-10 flex flex-col gap-4 border-b border-slate-800/80 bg-black/30 px-4 py-4 backdrop-blur-xl xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-red-500/30 bg-black/40">
            <Image
              src="/logo-tmt.svg"
              alt="Tiamat GG"
              fill
              sizes="56px"
              className="object-contain p-1"
              priority
            />
          </div>

          <div>
            <h1 className="text-xl font-black uppercase tracking-[0.14em] text-white sm:text-2xl">
              Draft Tools
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Competitive MLBB Platform
            </p>
          </div>
        </div>

        <div className="order-3 rounded-3xl border border-blue-500/30 bg-[#07111f]/90 px-8 py-4 text-center shadow-[0_0_40px_rgba(59,130,246,0.15)] xl:order-none">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
            Fase atual
          </p>
          <h2 className="mt-1 text-2xl font-black uppercase text-blue-400">
            {currentStep ? currentStep.label : "Draft finalizado"}
          </h2>
          <p className="text-xs font-bold text-slate-400">
            {entries.length} / {draftSteps.length}
          </p>
        </div>

        <button
          type="button"
          onClick={resetDraft}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs font-black uppercase text-slate-300 hover:border-red-500/60"
        >
          <RotateCcw className="h-4 w-4" />
          Resetar Draft
        </button>
      </header>

      <section className="relative z-10 mx-auto w-full max-w-[2100px] space-y-4 px-4 py-5">
        <div className="grid grid-cols-1 gap-4 min-[1200px]:grid-cols-2">
          <DraftTeamSection
            side="blue"
            enemyPicks={redPicks}
            picks={bluePicks}
            bans={blueBans}
            assignments={blueAssignments}
            analysis={blueAnalysis}
            currentStep={currentStep}
            onAssignRole={handleAssignRole}
            onEmptySlotClick={openHeroSelection}
          />

          <DraftTeamSection
            side="red"
            enemyPicks={bluePicks}
            picks={redPicks}
            bans={redBans}
            assignments={redAssignments}
            analysis={redAnalysis}
            currentStep={currentStep}
            onAssignRole={handleAssignRole}
            onEmptySlotClick={openHeroSelection}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 min-[1000px]:grid-cols-[360px_1fr_360px]">
          <div className="rounded-2xl border border-slate-800 bg-[#07111f]/90 p-5 text-center shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
              Sua ação
            </p>

            <button
              type="button"
              disabled={!currentStep}
              onClick={openHeroSelection}
              className="mt-4 w-full rounded-xl border border-blue-500/60 bg-blue-500/10 px-4 py-4 text-lg font-black uppercase tracking-[0.08em] text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.2)] transition hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentStep?.type === "ban"
                ? "› Escolher ban"
                : "› Escolher herói"}
            </button>

            <button
              type="button"
              onClick={() => setSuggestionsModalOpen(true)}
              disabled={!currentStep}
              className="mt-3 w-full rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-3 text-xs font-black uppercase text-purple-300 hover:bg-purple-500/20 disabled:opacity-40"
            >
              Ver sugestões
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#07111f]/90 p-5 shadow-2xl">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-center">
                <p className="text-xs font-black uppercase text-blue-300">
                  Blue
                </p>
                <p className="mt-2 text-4xl font-black text-blue-400">
                  {blueAnalysis.score}
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center">
                <p className="text-xs font-black uppercase text-red-300">
                  Red
                </p>
                <p className="mt-2 text-4xl font-black text-red-400">
                  {redAnalysis.score}
                </p>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              {winnerText}
            </p>

            <div className="mt-5 space-y-3 text-xs">
              <MetricRow
                label="Dano físico"
                blue={blueAnalysis.metrics.physicalDamage}
                red={redAnalysis.metrics.physicalDamage}
              />
              <MetricRow
                label="Dano mágico"
                blue={blueAnalysis.metrics.magicDamage}
                red={redAnalysis.metrics.magicDamage}
              />
              <MetricRow
                label="Tanque"
                blue={blueAnalysis.metrics.frontline}
                red={redAnalysis.metrics.frontline}
              />
              <MetricRow
                label="Controle"
                blue={blueAnalysis.metrics.crowdControl}
                red={redAnalysis.metrics.crowdControl}
              />
              <MetricRow
                label="Engage"
                blue={blueAnalysis.metrics.engage}
                red={redAnalysis.metrics.engage}
              />
              <MetricRow
                label="Disengage"
                blue={blueAnalysis.metrics.disengage}
                red={redAnalysis.metrics.disengage}
              />
              <MetricRow
                label="Escalar"
                blue={blueAnalysis.metrics.lateGame}
                red={redAnalysis.metrics.lateGame}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#07111f]/90 p-5 shadow-2xl">
            <p className="text-center text-xs font-black uppercase tracking-[0.25em] text-slate-500">
              Simulador
            </p>

            <input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Nome do draft..."
              className="mt-4 h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={saveDraftForSimulator}
              className="mt-3 w-full rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs font-black uppercase text-emerald-300 hover:bg-emerald-500/20"
            >
              Salvar para simular
            </button>

            {saveMessage && (
              <p className="mt-3 text-center text-xs text-emerald-300">
                {saveMessage}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5 shadow-2xl">
          <p className="text-center text-xs font-black uppercase tracking-[0.25em] text-purple-300">
            IA Gemini
          </p>

          <button
            type="button"
            onClick={handleGeminiAnalysis}
            disabled={geminiLoading || entries.length === 0}
            className="mt-4 w-full rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-3 text-xs font-black uppercase text-purple-300 hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {geminiLoading ? "Analisando..." : "Analisar draft com IA"}
          </button>

          {geminiError && (
            <p className="mt-3 text-center text-xs text-red-300">
              {geminiError}
            </p>
          )}

          {geminiAnalysis && (
            <div className="mt-4 max-h-[360px] overflow-y-auto whitespace-pre-line rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300">
              {geminiAnalysis}
            </div>
          )}
        </div>
      </section>

      <HeroSelectModal
        open={heroModalOpen}
        onClose={() => setHeroModalOpen(false)}
        search={search}
        onSearchChange={setSearch}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        usedHeroNames={usedHeroNames}
        currentActionType={currentStep?.type ?? "pick"}
        roleSuggestions={roleSuggestions}
        banSuggestions={banSuggestions}
        onSelectHero={handleSelectHero}
      />

      <SuggestionsModal
        open={suggestionsModalOpen}
        onClose={() => setSuggestionsModalOpen(false)}
        currentActionType={currentStep?.type ?? "pick"}
        roleSuggestions={roleSuggestions}
        banSuggestions={banSuggestions}
      />
    </main>
  )
}

function MetricRow({
  label,
  blue,
  red,
}: {
  label: string
  blue: number
  red: number
}) {
  return (
    <div className="grid grid-cols-[1fr_40px_40px] items-center border-b border-slate-800/80 pb-2">
      <span className="font-bold uppercase text-slate-400">{label}</span>
      <span className="text-right font-black text-blue-400">{blue}</span>
      <span className="text-right font-black text-red-400">{red}</span>
    </div>
  )
}