import Image from "next/image"
import { HeroRole } from "@/types/hero"
import { getHeroImage } from "@/lib/get-hero-image"
import type { BanSuggestion, Suggestion } from "@/lib/pick-suggester"

type DraftSuggestionsProps = {
  roleSuggestions: Record<HeroRole, Suggestion[]>
  banSuggestions: BanSuggestion[]
  currentActionType: "pick" | "ban"
}

export function DraftSuggestions({
  roleSuggestions,
  banSuggestions,
  currentActionType,
}: DraftSuggestionsProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white">
          {currentActionType === "ban" ? "Sugestões de ban" : "Sugestões por rota"}
        </h3>
        <p className="mt-1 text-sm text-zinc-400">
          Sugestões automáticas com base na composição atual, counters, sinergias e time inimigo.
        </p>
      </div>

      {currentActionType === "ban" ? (
        <div className="grid gap-3 md:grid-cols-2">
          {banSuggestions.map((sug) => (
            <div
              key={`ban-${sug.hero.name}`}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-zinc-800">
                  <Image
                    src={getHeroImage(sug.hero.name)}
                    alt={sug.hero.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {sug.hero.name}
                      </p>
                      <p className="mt-1 text-xs text-zinc-400">
                        {sug.hero.specialty}
                      </p>
                    </div>

                    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-300">
                      {sug.score}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {sug.hero.roles.map((heroRole) => (
                      <span
                        key={heroRole}
                        className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] font-bold uppercase text-zinc-300"
                      >
                        {heroRole}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="mt-4 space-y-1.5 text-sm text-zinc-300">
                {sug.reasons.length > 0 ? (
                  sug.reasons.map((reason) => <li key={reason}>• {reason}</li>)
                ) : (
                  <li>• Ban sólido de forma geral.</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-5">
          {Object.entries(roleSuggestions).map(([role, list]) => (
            <div key={role}>
              <p className="mb-3 text-sm font-semibold text-zinc-400">{role}</p>

              <div className="grid gap-3 md:grid-cols-2">
                {list.map((sug) => (
                  <div
                    key={`${role}-${sug.hero.name}`}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-zinc-800">
                        <Image
                          src={getHeroImage(sug.hero.name)}
                          alt={sug.hero.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-white">
                              {sug.hero.name}
                            </p>
                            <p className="mt-1 text-xs text-zinc-400">
                              {sug.hero.specialty}
                            </p>
                          </div>

                          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-zinc-300">
                            {sug.score}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {sug.hero.roles.map((heroRole) => (
                            <span
                              key={heroRole}
                              className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] font-bold uppercase text-zinc-300"
                            >
                              {heroRole}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <ul className="mt-4 space-y-1.5 text-sm text-zinc-300">
                      {sug.reasons.length > 0 ? (
                        sug.reasons.map((reason) => <li key={reason}>• {reason}</li>)
                      ) : (
                        <li>• Pick sólido de forma geral.</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}