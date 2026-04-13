import { Hero, HeroRole } from "@/types/hero"

export type DraftSide = "blue" | "red"
export type DraftActionType = "pick" | "ban"

export type DraftStep = {
  id: number
  side: DraftSide
  type: DraftActionType
  label: string
}

export type DraftEntry = {
  stepId: number
  side: DraftSide
  type: DraftActionType
  hero: Hero
  assignedRole?: HeroRole
}

export type TeamRoleAssignments = {
  EXP?: string
  Gold?: string
  Mid?: string
  Jungle?: string
  Roam?: string
}

export type TeamAnalysis = {
  score: number
  positives: string[]
  negatives: string[]
  warnings: string[]
  laneStrength: Partial<Record<HeroRole, string>>
  summary: string
  tagCounts: Record<string, number>
  damageProfile: {
    physical: number
    magic: number
    mixed: number
  }
}