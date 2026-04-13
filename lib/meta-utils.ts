type MetaScoreResult = {
  total: number
  banPriority: number
  tier: string | null
}

export function getMetaScore(heroName: string): MetaScoreResult {
  return {
    total: 0,
    banPriority: 0,
    tier: null,
  }
}