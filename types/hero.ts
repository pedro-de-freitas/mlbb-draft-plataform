export type HeroRole = "EXP" | "Gold" | "Mid" | "Jungle" | "Roam"

export type DamageType = "Physical" | "Magic" | "Mixed"

export type HeroTag =
  | "Frontline"
  | "Engage"
  | "Peel"
  | "Disengage"
  | "Burst"
  | "DPS"
  | "Poke"
  | "Pickoff"
  | "Sustain"
  | "Utility"
  | "Scaling"
  | "Early"
  | "CC"
  | "Teamfight"

export type Hero = {
  id: number
  name: string
  roles: HeroRole[]
  specialty: string
  damageType: DamageType
  tags: HeroTag[]
}