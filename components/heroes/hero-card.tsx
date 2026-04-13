"use client"

import Image from "next/image"
import { Hero } from "@/types/hero"
import { getHeroImage } from "@/lib/get-hero-image"
import { getHeroMatchup } from "@/lib/hero-matchup"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type HeroCardProps = {
  hero: Hero
}

function roleBadgeStyles(role: string) {
  switch (role) {
    case "EXP":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
    case "Gold":
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
    case "Mid":
      return "border-violet-500/20 bg-violet-500/10 text-violet-300"
    case "Jungle":
      return "border-red-500/20 bg-red-500/10 text-red-300"
    case "Roam":
      return "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
    default:
      return "border-zinc-700 bg-zinc-800 text-zinc-300"
  }
}

export function HeroCard({ hero }: HeroCardProps) {
  const matchup = getHeroMatchup(hero.name)

  return (
    <Dialog>
      <article className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-xl transition hover:border-red-500/30 hover:bg-zinc-900">
        <div className="relative h-48 w-full">
          <Image
            src={getHeroImage(hero.name)}
            alt={hero.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-xl font-bold text-white">{hero.name}</h3>
              <p className="mt-1 text-sm text-zinc-400">{hero.specialty}</p>
            </div>

            <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs font-semibold text-zinc-300">
              {hero.damageType}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {hero.roles.map((role) => (
              <span
                key={role}
                className={`rounded-full border px-2.5 py-1 text-xs font-bold uppercase ${roleBadgeStyles(role)}`}
              >
                {role}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {hero.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <DialogTrigger>
            <button className="mt-5 w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">
              Ver detalhes
            </button>
          </DialogTrigger>
        </div>
      </article>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-white sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight">
            {hero.name}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Informações do herói para draft, composições, counters e sinergias.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-4">
            <div className="relative h-72 w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
              <Image
                src={getHeroImage(hero.name)}
                alt={hero.name}
                fill
                className="object-cover"
              />
            </div>

            <InfoBox title="Função" value={hero.specialty} />
            <InfoBox title="Tipo de dano" value={hero.damageType} />
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Rotas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {hero.roles.map((role) => (
                  <span
                    key={role}
                    className={`rounded-full border px-3 py-1.5 text-sm font-bold uppercase ${roleBadgeStyles(role)}`}
                  >
                    {role}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                Essas rotas representam as possibilidades de uso do herói no teu sistema,
                incluindo flex picks e adaptações de draft.
              </p>
            </section>

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Tags estratégicas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {hero.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <ListBox title="Esse herói countera" items={matchup?.counters ?? []} />
              <ListBox title="Counterado por" items={matchup?.counteredBy ?? []} />
            </div>

            <ListBox title="Melhores sinergias" items={matchup?.synergies ?? []} />

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Notas</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                {(matchup?.notes ?? []).map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <p className="mt-2 text-base font-semibold text-white">{value}</p>
    </div>
  )
}

function ListBox({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-zinc-300">
        {items.length > 0 ? items.map((item) => <li key={item}>• {item}</li>) : <li>• Sem dados ainda.</li>}
      </ul>
    </section>
  )
}