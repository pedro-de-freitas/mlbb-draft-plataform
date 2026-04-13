import { DraftEntry } from "@/types/draft"

type SimulatorSideCardProps = {
  title: string
  side: "blue" | "red"
  picks: DraftEntry[]
  score: number
}

export function SimulatorSideCard({
  title,
  side,
  picks,
  score,
}: SimulatorSideCardProps) {
  return (
    <section
      className={`rounded-3xl border p-5 shadow-xl ${
        side === "blue"
          ? "border-blue-500/20 bg-gradient-to-b from-blue-500/10 via-zinc-900 to-zinc-950"
          : "border-red-500/20 bg-gradient-to-b from-red-500/10 via-zinc-900 to-zinc-950"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className={`text-xl font-bold ${
              side === "blue" ? "text-blue-300" : "text-red-300"
            }`}
          >
            {title}
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            Leitura prática da composição
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-2 text-right">
          <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Score
          </p>
          <p className="mt-1 text-lg font-bold text-white">{score}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {picks.map((pick) => (
          <div
            key={`${side}-${pick.hero.name}`}
            className="rounded-2xl border border-zinc-800 bg-black/20 p-4"
          >
            <p className="text-sm font-semibold text-white">{pick.hero.name}</p>
            <p className="mt-1 text-xs text-zinc-400">{pick.hero.specialty}</p>
            <p className="mt-2 text-xs text-zinc-500">
              {pick.assignedRole || "Sem rota definida"}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}