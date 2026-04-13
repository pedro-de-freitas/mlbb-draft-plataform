import { DraftEntry } from "@/types/draft"
import { Hero } from "@/types/hero"
import { heroes } from "@/lib/data"
import { getHeroMatchup } from "./hero-matchup"
import { getMetaScore } from "./meta-utils"

export type BanSuggestion = {
  hero: Hero
  score: number
  reasons: string[]
}

function countTag(team: DraftEntry[], tag: string) {
  return team.filter((entry) =>
    entry.hero.tags.includes(tag as Hero["tags"][number])
  ).length
}

export function suggestBans(
  team: DraftEntry[],
  enemy: DraftEntry[],
  usedNames: string[]
): BanSuggestion[] {
  const suggestions: BanSuggestion[] = []

  const teamHeroNames = team.map((p) => p.hero.name)

  for (const hero of heroes) {
    if (usedNames.includes(hero.name)) continue

    let score = 0
    const reasons: string[] = []

    const matchup = getHeroMatchup(hero.name)

    const threatensTeam = matchup.counters.filter((name) =>
      teamHeroNames.includes(name)
    )

    const punishesTeam = matchup.counteredBy.filter((name) =>
      teamHeroNames.includes(name)
    )

    if (threatensTeam.length > 0) {
      score += threatensTeam.length * 8
      reasons.push(`Ameaça: ${threatensTeam.join(", ")}`)
    }

    if (punishesTeam.length > 0) {
      score += punishesTeam.length * 4
      reasons.push("Pode punir nossa comp")
    }

    if (hero.tags.includes("Engage")) {
      score += 2
      reasons.push("Engage forte")
    }

    if (hero.tags.includes("Disengage")) {
      score += 2
      reasons.push("Pode negar nossa entrada")
    }

    if (hero.tags.includes("Pickoff")) {
      score += 2
      reasons.push("Pickoff perigoso")
    }

    if (hero.tags.includes("Frontline") && countTag(enemy, "Frontline") >= 1) {
      score += 2
      reasons.push("Pode reforçar frontline inimiga")
    }

    const meta = getMetaScore(hero.name)
    if (meta.total > 0) {
      score += Math.round(meta.banPriority / 10)
      if (meta.tier) {
        reasons.push(`Meta ${meta.tier}: ban relevante no patch`)
      }
    }

    suggestions.push({
      hero,
      score,
      reasons,
    })
  }

  return suggestions.sort((a, b) => b.score - a.score).slice(0, 8)
}