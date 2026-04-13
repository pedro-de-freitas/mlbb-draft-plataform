type SimulatorInsightsProps = {
  title: string
  items: string[]
  variant?: "blue" | "red" | "neutral"
}

export function SimulatorInsights({
  title,
  items,
  variant = "neutral",
}: SimulatorInsightsProps) {
  const tone =
    variant === "blue"
      ? "border-blue-500/20 bg-blue-500/5"
      : variant === "red"
      ? "border-red-500/20 bg-red-500/5"
      : "border-zinc-800 bg-zinc-900/80"

  return (
    <section className={`rounded-3xl border p-5 shadow-xl ${tone}`}>
      <h3 className="text-lg font-bold text-white">{title}</h3>

      <ul className="mt-4 space-y-2 text-sm text-zinc-300">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </section>
  )
}