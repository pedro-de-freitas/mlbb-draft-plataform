export type AICoachData = {
  winCondition?: string
  earlyGame?: string
  lateGame?: string
  strengths?: string[]
  weaknesses?: string[]
  threats?: { hero: string; reason: string }[]
  bestNextPicks?: { hero: string; role: string; reason: string }[]
  laneAnalysis?: Record<string, string>
}