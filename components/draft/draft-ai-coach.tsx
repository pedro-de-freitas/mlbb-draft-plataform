import { Brain } from "lucide-react"
import { AICoachData } from "./draft-types"

type DraftAICoachProps = {
  aiCoach: AICoachData | null
  aiLoading: boolean
  aiError: string | null
  onAnalyze: () => void
}

export function DraftAICoach({
  aiCoach,
  aiLoading,
  aiError,
  onAnalyze,
}: DraftAICoachProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-3 text-purple-300">
          <Brain className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white">AI Coach</h3>
          <p className="text-sm text-zinc-400">
            Leitura de draft em nível coach profissional.
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <button
          onClick={onAnalyze}
          disabled={aiLoading}
          className="inline-flex items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {aiLoading ? "Analisando..." : "Analisar com IA"}
        </button>
      </div>

      {aiError && (
        <div className="mb-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-300">
          {aiError}
        </div>
      )}

      {aiLoading ? (
        <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4 text-sm text-zinc-400">
          Gerando análise da IA...
        </div>
      ) : aiCoach ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard title="Win Condition" value={aiCoach.winCondition} />
            <InfoCard title="Early Game" value={aiCoach.earlyGame} />
            <InfoCard title="Late Game" value={aiCoach.lateGame} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ListCard title="Strengths" items={aiCoach.strengths} />
            <ListCard title="Weaknesses" items={aiCoach.weaknesses} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ThreatCard threats={aiCoach.threats} />
            <BestPicksCard bestNextPicks={aiCoach.bestNextPicks} />
          </div>

          <LaneAnalysisCard laneAnalysis={aiCoach.laneAnalysis} />
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4 text-sm text-zinc-400">
          Clique em “Analisar com IA” quando o draft estiver mais montado.
        </div>
      )}
    </section>
  )
}

function InfoCard({ title, value }: { title: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <p className="mt-3 text-sm font-semibold text-white">
        {value || "Sem leitura suficiente ainda."}
      </p>
    </div>
  )
}

function ListCard({ title, items }: { title: string; items?: string[] }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-zinc-300">
        {items && items.length > 0 ? (
          items.map((item) => <li key={item}>• {item}</li>)
        ) : (
          <li>• Sem dados suficientes ainda.</li>
        )}
      </ul>
    </div>
  )
}

function ThreatCard({
  threats,
}: {
  threats?: { hero: string; reason: string }[]
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Threats</p>
      <div className="mt-3 space-y-3">
        {threats && threats.length > 0 ? (
          threats.map((threat) => (
            <div
              key={`${threat.hero}-${threat.reason}`}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-3"
            >
              <p className="font-semibold text-white">{threat.hero}</p>
              <p className="mt-1 text-sm text-zinc-300">{threat.reason}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-400">Sem ameaças destacadas ainda.</p>
        )}
      </div>
    </div>
  )
}

function BestPicksCard({
  bestNextPicks,
}: {
  bestNextPicks?: { hero: string; role: string; reason: string }[]
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
        Best Next Picks
      </p>
      <div className="mt-3 space-y-3">
        {bestNextPicks && bestNextPicks.length > 0 ? (
          bestNextPicks.map((pick) => (
            <div
              key={`${pick.hero}-${pick.role}`}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-3"
            >
              <p className="font-semibold text-white">
                {pick.hero} <span className="text-zinc-400">({pick.role})</span>
              </p>
              <p className="mt-1 text-sm text-zinc-300">{pick.reason}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-400">Sem picks destacados ainda.</p>
        )}
      </div>
    </div>
  )
}

function LaneAnalysisCard({
  laneAnalysis,
}: {
  laneAnalysis?: Record<string, string>
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
        Lane Analysis
      </p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {laneAnalysis && Object.keys(laneAnalysis).length > 0 ? (
          Object.entries(laneAnalysis).map(([lane, text]) => (
            <div
              key={lane}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-3"
            >
              <p className="font-semibold text-white">{lane}</p>
              <p className="mt-1 text-sm text-zinc-300">{text}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-400">Sem análise de rotas ainda.</p>
        )}
      </div>
    </div>
  )
}