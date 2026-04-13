import { HeroesGrid } from "@/components/heroes/heroes-grid"
import { AppShell } from "@/components/layout/appshell/app-shell"

export default function HeroesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-5 shadow-2xl sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
            Hero Database
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Heróis
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400 sm:text-base">
            Explore a base de heróis, filtre por rota, veja tipo de dano e tags
            principais para draft e análise de composição.
          </p>
        </section>

        <HeroesGrid />
      </div>
    </AppShell>
  )
}