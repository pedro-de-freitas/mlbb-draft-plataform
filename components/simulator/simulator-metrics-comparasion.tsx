type MetricRowProps = {
  label: string
  blue: number
  red: number
}

function MetricRow({ label, blue, red }: MetricRowProps) {
  const total = Math.max(blue + red, 1)
  const bluePercent = (blue / total) * 100
  const redPercent = (red / total) * 100

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-blue-300">{blue}</span>
          <span className="text-zinc-500">vs</span>
          <span className="font-semibold text-red-300">{red}</span>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-blue-400"
            style={{ width: `${bluePercent}%` }}
          />
        </div>

        <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          comparação
        </span>

        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="ml-auto h-full rounded-full bg-red-400"
            style={{ width: `${redPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}

type SimulatorMetricsComparisonProps = {
  blue: {
    earlyGame: number
    lateGame: number
    teamFight: number
    pickOff: number
    engage: number
    peel: number
    disengage: number
    frontline: number
    crowdControl: number
    counterAdvantage: number
    synergyAdvantage: number
    counterRisk: number
  }
  red: {
    earlyGame: number
    lateGame: number
    teamFight: number
    pickOff: number
    engage: number
    peel: number
    disengage: number
    frontline: number
    crowdControl: number
    counterAdvantage: number
    synergyAdvantage: number
    counterRisk: number
  }
}

export function SimulatorMetricsComparison({
  blue,
  red,
}: SimulatorMetricsComparisonProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white">Comparação de métricas</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Compare as forças reais de cada composição em diferentes áreas do jogo.
        </p>
      </div>

      <div className="grid gap-3">
        <MetricRow label="Early game" blue={blue.earlyGame} red={red.earlyGame} />
        <MetricRow label="Late game" blue={blue.lateGame} red={red.lateGame} />
        <MetricRow label="Team fight" blue={blue.teamFight} red={red.teamFight} />
        <MetricRow label="Pick off" blue={blue.pickOff} red={red.pickOff} />
        <MetricRow label="Engage" blue={blue.engage} red={red.engage} />
        <MetricRow label="Peel" blue={blue.peel} red={red.peel} />
        <MetricRow label="Disengage" blue={blue.disengage} red={red.disengage} />
        <MetricRow label="Frontline" blue={blue.frontline} red={red.frontline} />
        <MetricRow label="CC" blue={blue.crowdControl} red={red.crowdControl} />
        <MetricRow
          label="Counter advantage"
          blue={blue.counterAdvantage}
          red={red.counterAdvantage}
        />
        <MetricRow
          label="Synergy advantage"
          blue={blue.synergyAdvantage}
          red={red.synergyAdvantage}
        />
        <MetricRow
          label="Counter risk"
          blue={blue.counterRisk}
          red={red.counterRisk}
        />
      </div>
    </section>
  )
}