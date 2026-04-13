import { heroes } from "@/lib/data"
import { Hero, HeroRole } from "@/types/hero"
import { curatedMatchups } from "@/lib/counters-data"

export type HeroMatchup = {
  heroName: string
  counters: string[]
  counteredBy: string[]
  synergies: string[]
  recommendedRoles: HeroRole[]
  notes: string[]
  source: "curated" | "generated"
}

function hasTag(hero: Hero, tag: string) {
  return hero.tags.includes(tag as never)
}

function roleSimilarity(a: Hero, b: Hero) {
  return a.roles.some((role) => b.roles.includes(role))
}

function matchupScore(a: Hero, b: Hero) {
  let score = 0

  if (hasTag(b, "Frontline") && hasTag(a, "DPS")) score += 6
  if (hasTag(b, "Frontline") && hasTag(a, "Scaling")) score += 2
  if (hasTag(b, "Burst") && hasTag(a, "Peel")) score += 4
  if (hasTag(b, "Burst") && hasTag(a, "Frontline")) score += 2
  if (hasTag(b, "Pickoff") && hasTag(a, "CC")) score += 4
  if (hasTag(b, "Engage") && hasTag(a, "CC")) score += 3
  if (hasTag(b, "Sustain") && hasTag(a, "Burst")) score += 3
  if (hasTag(b, "Sustain") && hasTag(a, "DPS")) score += 3
  if (hasTag(b, "Poke") && hasTag(a, "Engage")) score += 3
  if (hasTag(b, "Poke") && hasTag(a, "Pickoff")) score += 2
  if (hasTag(b, "Scaling") && hasTag(a, "Early")) score += 3
  if (b.damageType === "Physical" && a.damageType === "Magic") score += 1
  if (b.damageType === "Magic" && a.damageType === "Physical") score += 1
  if (a.damageType === "Mixed") score += 1
  if (roleSimilarity(a, b)) score += 1

  return score
}

function synergyScore(a: Hero, b: Hero) {
  let score = 0

  if (hasTag(a, "Engage") && hasTag(b, "Burst")) score += 5
  if (hasTag(a, "Frontline") && hasTag(b, "DPS")) score += 5
  if (hasTag(a, "Peel") && hasTag(b, "Scaling")) score += 4
  if (hasTag(a, "Utility") && hasTag(b, "Pickoff")) score += 4
  if (hasTag(a, "CC") && hasTag(b, "Poke")) score += 3
  if (hasTag(a, "CC") && hasTag(b, "Burst")) score += 4
  if (hasTag(a, "Sustain") && hasTag(b, "Frontline")) score += 3
  if (a.damageType !== b.damageType) score += 1
  if (a.roles.length >= 3 || b.roles.length >= 3) score += 1

  return score
}

function buildNotes(hero: Hero) {
  const notes: string[] = []

  if (hasTag(hero, "Frontline")) notes.push("Boa opção para abrir espaço e absorver pressão.")
  if (hasTag(hero, "Engage")) notes.push("Consegue iniciar lutas e criar janelas de pickoff.")
  if (hasTag(hero, "Peel")) notes.push("Ajuda a proteger carries e negar burst.")
  if (hasTag(hero, "DPS")) notes.push("Oferece dano contínuo importante para objetivos e tanks.")
  if (hasTag(hero, "Burst")) notes.push("Consegue explodir alvos vulneráveis rapidamente.")
  if (hasTag(hero, "Utility")) notes.push("Entrega utilidade além de dano puro.")
  if (hasTag(hero, "Scaling")) notes.push("Escala melhor conforme a partida avança.")
  if (hasTag(hero, "Early")) notes.push("Tem janela forte de pressão no início do jogo.")
  if (hasTag(hero, "CC")) notes.push("Oferece controle de grupo para travar engages ou picks.")

  return notes.slice(0, 4)
}

function buildGeneratedMatchup(hero: Hero): HeroMatchup {
  const versus = heroes
    .filter((other) => other.name !== hero.name)
    .map((other) => ({
      name: other.name,
      score: matchupScore(other, hero),
    }))
    .sort((a, b) => b.score - a.score)

  const heroCounters = heroes
    .filter((other) => other.name !== hero.name)
    .map((other) => ({
      name: other.name,
      score: matchupScore(hero, other),
    }))
    .sort((a, b) => b.score - a.score)

  const synergies = heroes
    .filter((other) => other.name !== hero.name)
    .map((other) => ({
      name: other.name,
      score: synergyScore(hero, other),
    }))
    .sort((a, b) => b.score - a.score)

  return {
    heroName: hero.name,
    counters: heroCounters.slice(0, 5).map((x) => x.name),
    counteredBy: versus.slice(0, 5).map((x) => x.name),
    synergies: synergies.slice(0, 5).map((x) => x.name),
    recommendedRoles: hero.roles,
    notes: buildNotes(hero),
    source: "generated",
  }
}

export function buildAllHeroMatchups(): Record<string, HeroMatchup> {
  const result: Record<string, HeroMatchup> = {}

  for (const hero of heroes) {
    const curated = curatedMatchups[hero.name]

    if (curated) {
      result[hero.name] = {
        heroName: hero.name,
        counters: curated.counters,
        counteredBy: curated.counteredBy,
        synergies: curated.synergies,
        recommendedRoles: hero.roles,
        notes: curated.notes ?? buildNotes(hero),
        source: "curated",
      }
    } else {
      result[hero.name] = buildGeneratedMatchup(hero)
    }
  }

  return result
}

export const heroMatchups = buildAllHeroMatchups()

export function getHeroMatchup(name: string) {
  return heroMatchups[name]
}