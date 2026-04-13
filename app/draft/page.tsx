import { DraftBoard } from "@/components/draft/draftboard";
import { AppShell } from "@/components/layout/appshell/app-shell";


export default function DraftPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 p-5 shadow-2xl sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
            MLBB Competitive Draft
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Draft Simulator Pro
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400 sm:text-base">
            Draft com múltiplas rotas por herói, ordem competitiva por fases,
            picks e bans reais e composição ajustável por lane.
          </p>
        </section>

        <DraftBoard />
      </div>
    </AppShell>
  )
}