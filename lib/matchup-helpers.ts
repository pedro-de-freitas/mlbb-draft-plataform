import { DraftEntry } from "@/types/draft"
import { curatedMatchups } from "./counters-data"

export function getMatchupStats(
  heroName: string,
  allyPicks: DraftEntry[],
  enemyPicks: DraftEntry[]
) {
  const matchup = curatedMatchups[heroName] ?? {
    counters: [],
    counteredBy: [],
    synergies: [],
    notes: [],
  }

  const allyNames = allyPicks.map((pick) => pick.hero.name)
  const enemyNames = enemyPicks.map((pick) => pick.hero.name)

  const matchedSynergies = matchup.synergies.filter((name) =>
    allyNames.includes(name)
  )

  const matchedCounters = matchup.counters.filter((name) =>
    enemyNames.includes(name)
  )

  const matchedCounteredBy = matchup.counteredBy.filter((name) =>
    enemyNames.includes(name)
  )

  return {
    matchedSynergies,
    matchedCounters,
    matchedCounteredBy,
    synergyScore: matchedSynergies.length * 6,
    counterScore: matchedCounters.length * 7,
    dangerScore: matchedCounteredBy.length * 7,
  }
}