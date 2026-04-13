"use client"

import { useEffect, useMemo, useState } from "react"
import { SavedDraftSelect } from "./saved-draft-saved"
import { SimulatorSideCard } from "./simulator-side-card"
import { SimulatorMetricsComparison } from "./simulator-metrics-comparasion"
import { SimulatorInsights } from "./simulator-insights"
import { SimulatorScenarios } from "./simulator-scenarios"
import { analyzeSimulation } from "@/lib/simulator-analyzer"
import { SavedDraft, getSavedDrafts } from "@/lib/saved-draft"
import { trackPageVisit, trackSimulationUsed } from "@/lib/user-activity"

export function SimulatorPage() {
  const [savedDrafts] = useState<SavedDraft[]>(() => getSavedDrafts())
  const [selectedDraftId, setSelectedDraftId] = useState(() => {
    const drafts = getSavedDrafts()
    return drafts[0]?.id ?? ""
  })

  useEffect(() => {
    trackPageVisit("simulator")
  }, [])

  const selectedDraft = useMemo(() => {
    return savedDrafts.find((draft) => draft.id === selectedDraftId) ?? null
  }, [savedDrafts, selectedDraftId])

  useEffect(() => {
    if (selectedDraft?.name) {
      trackSimulationUsed(selectedDraft.name)
    }
  }, [selectedDraft?.id, selectedDraft?.name])

  const bluePicks = useMemo(() => {
    return (
      selectedDraft?.entries.filter(
        (entry) => entry.side === "blue" && entry.type === "pick"
      ) ?? []
    )
  }, [selectedDraft])

  const redPicks = useMemo(() => {
    return (
      selectedDraft?.entries.filter(
        (entry) => entry.side === "red" && entry.type === "pick"
      ) ?? []
    )
  }, [selectedDraft])

  const insight = useMemo(() => {
    if (!selectedDraft) return null
    return analyzeSimulation(bluePicks, redPicks)
  }, [selectedDraft, bluePicks, redPicks])

  if (!savedDrafts.length) {
    return (
      <div className="space-y-6">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">
          <h1 className="text-2xl font-bold text-white">Simulador</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Aqui você vai comparar drafts salvos, entender win conditions,
            riscos, fases do jogo e cenários como team fight no Lord, pickoff e late game.
          </p>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">
          <p className="text-lg font-semibold text-white">
            Nenhum draft salvo ainda.
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Vá na página de Draft, monte uma composição e use a opção
            <span className="font-semibold text-zinc-200"> salvar draft </span>
            para depois abrir aqui no simulador.
          </p>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-white">Simulador</h1>
        <p className="mt-2 max-w-3xl text-sm text-zinc-400">
          Compare drafts salvos, veja a vantagem teórica entre os lados,
          descubra as win conditions de cada composição e entenda como cada
          draft deve jogar na prática.
        </p>
      </section>

      <SavedDraftSelect
        drafts={savedDrafts}
        selectedId={selectedDraftId}
        onChange={setSelectedDraftId}
        label="Escolha um draft salvo para simular"
      />

      {selectedDraft && insight ? (
        <>
          <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{selectedDraft.name}</h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Simulação baseada nas picks salvas do Blue e Red Side.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  Veredito
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-200">
                  {insight.verdict}
                </p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <SimulatorSideCard
              title="Blue Side"
              side="blue"
              picks={bluePicks}
              score={insight.blueAnalysis.score}
            />

            <SimulatorSideCard
              title="Red Side"
              side="red"
              picks={redPicks}
              score={insight.redAnalysis.score}
            />
          </div>

          <SimulatorMetricsComparison
            blue={insight.blueAnalysis.metrics}
            red={insight.redAnalysis.metrics}
          />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <SimulatorInsights
              title="Win conditions do Blue"
              items={insight.blueWinConditions}
              variant="blue"
            />

            <SimulatorInsights
              title="Win conditions do Red"
              items={insight.redWinConditions}
              variant="red"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <SimulatorInsights
              title="Riscos do Blue"
              items={insight.blueRisks}
              variant="blue"
            />

            <SimulatorInsights
              title="Riscos do Red"
              items={insight.redRisks}
              variant="red"
            />
          </div>

          <SimulatorScenarios scenarios={insight.scenarios} />
        </>
      ) : null}
    </div>
  )
}