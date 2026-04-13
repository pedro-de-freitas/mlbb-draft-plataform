import { SimulatorScenarioResult } from "@/lib/simulator-analyzer" 

type SimulatorScenariosProps = {
  scenarios: SimulatorScenarioResult[]
}

export function SimulatorScenarios({
  scenarios,
}: SimulatorScenariosProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white">Cenários simulados</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Veja em que situações cada draft tende a performar melhor.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {scenarios.map((scenario) => {
          const tone =
            scenario.winner === "blue"
              ? "border-blue-500/20 bg-blue-500/5"
              : scenario.winner === "red"
              ? "border-red-500/20 bg-red-500/5"
              : "border-zinc-800 bg-zinc-950"

          return (
            <div
              key={scenario.label}
              className={`rounded-2xl border p-4 ${tone}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-white">{scenario.label}</p>
                <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[10px] font-bold uppercase text-zinc-300">
                  {scenario.winner === "even"
                    ? "Equilibrado"
                    : scenario.winner === "blue"
                    ? "Blue"
                    : "Red"}
                </span>
              </div>

              <p className="mt-3 text-sm text-zinc-300">
                {scenario.explanation}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}