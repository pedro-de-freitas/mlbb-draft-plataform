import { RotateCcw } from "lucide-react"

type DraftHeaderProps = {
  currentStepLabel: string
  blueScore: number
  redScore: number
  winnerText: string
  onReset: () => void
}

export function DraftHeader({
  currentStepLabel,
  blueScore,
  redScore,
  winnerText,
  onReset,
}: DraftHeaderProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 shadow-2xl">
      <div className="border-b border-zinc-800 p-5 sm:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
              MLBB Draft Analyzer
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Draft Board
            </h2>
            <p className="mt-2 text-sm text-zinc-400">{currentStepLabel}</p>
          </div>

          <button
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-900"
          >
            <RotateCcw className="h-4 w-4" />
            Resetar
          </button>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Blue score
          </p>
          <p className="mt-3 text-3xl font-black text-blue-300">{blueScore}</p>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Red score
          </p>
          <p className="mt-3 text-3xl font-black text-red-300">{redScore}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Resultado
          </p>
          <p className="mt-3 text-sm font-semibold text-white">{winnerText}</p>
        </div>
      </div>
    </section>
  )
}