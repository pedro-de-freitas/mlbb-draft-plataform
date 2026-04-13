import { DraftEntry } from "@/types/draft"
import { Hero } from "@/types/hero"
import { getHeroMatchup } from "./hero-matchup"

export type TeamAnalysis = {
  score: number
  strengths: string[]
  weaknesses: string[]
  summary: string
  metrics: {
    earlyGame: number
    lateGame: number
    teamFight: number
    pickOff: number
    engage: number
    peel: number
    disengage: number
    frontline: number
    magicDamage: number
    physicalDamage: number
    crowdControl: number
    counterAdvantage: number
    synergyAdvantage: number
    counterRisk: number
  }
  damageProfile: {
    physical: number
    magic: number
    mixed: number
  }
}

function normalizeTextList(values: unknown): string[] {
  if (!Array.isArray(values)) return []

  return values
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.toLowerCase())
}

function getHeroRoles(entry: DraftEntry): string[] {
  const assignedRole = entry.assignedRole ? [entry.assignedRole.toLowerCase()] : []
  const heroRoles = normalizeTextList((entry.hero as Hero & { roles?: string[] }).roles)

  const singleRole =
    typeof (entry.hero as Hero & { role?: string }).role === "string"
      ? [String((entry.hero as Hero & { role?: string }).role).toLowerCase()]
      : []

  return [...new Set([...assignedRole, ...heroRoles, ...singleRole])]
}

function getHeroTags(hero: Hero): string[] {
  const tags = normalizeTextList((hero as Hero & { tags?: string[] }).tags)
  const specialties = normalizeTextList(
    (hero as Hero & { specialties?: string[] }).specialties
  )

  const role =
    typeof (hero as Hero & { role?: string }).role === "string"
      ? [String((hero as Hero & { role?: string }).role).toLowerCase()]
      : []

  const roles = normalizeTextList((hero as Hero & { roles?: string[] }).roles)

  return [...new Set([...tags, ...specialties, ...role, ...roles])]
}

function hasAnyTag(hero: Hero, expected: string[]) {
  const tags = getHeroTags(hero)
  return expected.some((tag) => tags.includes(tag.toLowerCase()))
}

function getDamageType(hero: Hero): "physical" | "magic" | "mixed" | "unknown" {
  const raw = (hero as Hero & { damageType?: string }).damageType?.toLowerCase()

  if (raw === "physical" || raw === "magic" || raw === "mixed") {
    return raw
  }

  const tags = getHeroTags(hero)

  if (tags.includes("mage") || tags.includes("magic")) return "magic"

  if (
    tags.includes("marksman") ||
    tags.includes("assassin") ||
    tags.includes("fighter")
  ) {
    return "physical"
  }

  return "unknown"
}

function countByRole(picks: DraftEntry[]) {
  const roleCount: Record<string, number> = {}

  picks.forEach((pick) => {
    const roles = getHeroRoles(pick)
    const mainRole = roles[0] || "unknown"
    roleCount[mainRole] = (roleCount[mainRole] ?? 0) + 1
  })

  return roleCount
}

function countTag(picks: DraftEntry[], tags: string[]) {
  return picks.reduce((count, pick) => {
    return count + (hasAnyTag(pick.hero, tags) ? 1 : 0)
  }, 0)
}

function teamHasRole(picks: DraftEntry[], roles: string[]) {
  return picks.some((pick) => {
    const heroRoles = getHeroRoles(pick)
    return roles.some((role) => heroRoles.includes(role))
  })
}

function clampMinZero(value: number) {
  return value < 0 ? 0 : Math.round(value)
}

export function analyzeTeam(
  picks: DraftEntry[],
  enemyPicks: DraftEntry[] = []
): TeamAnalysis {
  let score = 0

  const strengths: string[] = []
  const weaknesses: string[] = []

  const roleCount = countByRole(picks)

  const tanks = countTag(picks, ["tank", "frontline"])
  const engageHeroes = countTag(picks, ["engage", "initiator", "setup", "dive"])
  const peelHeroes = countTag(picks, ["peel", "protect"])
  const disengageHeroes = countTag(picks, ["disengage", "anti-engage", "reset"])
  const ccHeroes = countTag(picks, ["cc", "crowd control", "stun", "knockup", "suppress"])
  const burstHeroes = countTag(picks, ["burst", "assassin"])
  const pokeHeroes = countTag(picks, ["poke"])
  const scalingHeroes = countTag(picks, ["late", "scaling"])
  const earlyHeroes = countTag(picks, ["early", "lane bully"])
  const teamFightHeroes = countTag(picks, ["teamfight", "aoe"])
  const splitPushHeroes = countTag(picks, ["split push", "splitpush"])
  const utilityHeroes = countTag(picks, ["utility", "support"])

  let magicDamage = 0
  let physicalDamage = 0
  let mixedDamage = 0

  picks.forEach((pick) => {
    const damageType = getDamageType(pick.hero)

    if (damageType === "magic") magicDamage += 1
    if (damageType === "physical") physicalDamage += 1
    if (damageType === "mixed") {
      mixedDamage += 1
      magicDamage += 1
      physicalDamage += 1
    }
  })

  score += picks.length * 8

  if (tanks >= 1) {
    score += 10
    strengths.push("Tem frontline para iniciar e absorver dano.")
  } else if (picks.length >= 3) {
    score -= 12
    weaknesses.push("Falta frontline para segurar lutas.")
  }

  if (engageHeroes >= 1) {
    score += 8
    strengths.push("Possui ferramenta de engage.")
  } else if (picks.length >= 3) {
    score -= 8
    weaknesses.push("Comp tem dificuldade para começar lutas.")
  }

  if (ccHeroes >= 2) {
    score += 10
    strengths.push("Boa quantidade de controle de grupo.")
  } else if (picks.length >= 4) {
    score -= 6
    weaknesses.push("Pouco controle de grupo no draft.")
  }

  if (peelHeroes >= 1) {
    score += 6
    strengths.push("Tem proteção para backline.")
  }

  if (disengageHeroes >= 1) {
    score += 6
    strengths.push("Tem boas ferramentas de disengage.")
  }

  if (disengageHeroes >= 2) {
    score += 4
    strengths.push("Consegue resetar lutas e punir engages precipitados.")
  }

  if (magicDamage > 0 && physicalDamage > 0) {
    score += 12
    strengths.push("Dano bem distribuído entre físico e mágico.")
  } else if (picks.length >= 4) {
    score -= 10
    weaknesses.push("Dano previsível e fácil de itemizar contra.")
  }

  if (teamFightHeroes >= 2) {
    score += 10
    strengths.push("Composição forte para team fight.")
  }

  if (burstHeroes >= 2) {
    score += 6
    strengths.push("Boa capacidade de eliminar alvo rápido.")
  }

  if (pokeHeroes >= 2) {
    score += 5
    strengths.push("Boa pressão antes das lutas.")
  }

  if (scalingHeroes >= 2) {
    score += 7
    strengths.push("Escala bem para o late game.")
  }

  if (earlyHeroes >= 2) {
    score += 7
    strengths.push("Draft forte para pressionar cedo.")
  }

  if (utilityHeroes >= 1) {
    score += 4
    strengths.push("Possui utilidade extra para o time.")
  }

  if (tanks >= 1 && teamFightHeroes >= 1) score += 8
  if (engageHeroes >= 1 && burstHeroes >= 1) score += 8
  if (peelHeroes >= 1 && scalingHeroes >= 1) score += 6
  if (pokeHeroes >= 1 && engageHeroes >= 1) score += 4
  if (disengageHeroes >= 1 && scalingHeroes >= 1) score += 5
  if (disengageHeroes >= 1 && peelHeroes >= 1) score += 4

  const duplicatedMainRoles = Object.values(roleCount).filter((count) => count >= 2).length

  if (duplicatedMainRoles > 0) {
    score -= duplicatedMainRoles * 7
    weaknesses.push("Há sobreposição de função entre alguns heróis.")
  }

  if (splitPushHeroes >= 2 && teamFightHeroes === 0) {
    score -= 8
    weaknesses.push("O time fica dividido entre split push e luta agrupada.")
  }

  if (burstHeroes >= 2 && engageHeroes === 0) {
    score -= 7
    weaknesses.push("Tem dano explosivo, mas falta quem crie a luta.")
  }

  if (scalingHeroes >= 3 && earlyHeroes === 0) {
    score -= 8
    weaknesses.push("Draft muito lento para o início do jogo.")
  }

  if (picks.length >= 4 && tanks === 0 && peelHeroes === 0 && disengageHeroes === 0) {
    score -= 10
    weaknesses.push("Backline fica muito exposta nas lutas.")
  }

  if (picks.length >= 4 && physicalDamage >= 4) {
    score -= 12
    weaknesses.push("Excesso de dano físico.")
  }

  if (picks.length >= 4 && magicDamage >= 4) {
    score -= 12
    weaknesses.push("Excesso de dano mágico.")
  }

  const hasJungleLike = teamHasRole(picks, ["jungle", "jungler", "assassin"])
  const hasRoamLike = teamHasRole(picks, ["roam", "support", "tank"])
  const hasGoldLike = teamHasRole(picks, ["gold", "marksman"])
  const hasMidLike = teamHasRole(picks, ["mid", "mage"])
  const hasExpLike = teamHasRole(picks, ["exp", "fighter"])

  const roleCoverage = [
    hasJungleLike,
    hasRoamLike,
    hasGoldLike,
    hasMidLike,
    hasExpLike,
  ].filter(Boolean).length

  score += roleCoverage * 3

  if (picks.length >= 4 && roleCoverage <= 3) {
    score -= 10
    weaknesses.push("Funções do draft estão mal distribuídas.")
  }

  const enemyTanks = countTag(enemyPicks, ["tank", "frontline"])
  const enemyDive = countTag(enemyPicks, ["engage", "initiator", "assassin", "dive"])
  const enemyPoke = countTag(enemyPicks, ["poke"])
  const ownAntiTank = countTag(picks, ["dps", "sustain damage", "tank shred", "marksman"])
  const ownPeel = peelHeroes
  const ownDisengage = disengageHeroes
  const ownHardEngage = engageHeroes

  if (enemyTanks >= 2 && ownAntiTank >= 1) {
    score += 6
    strengths.push("Tem resposta razoável contra frontline inimiga.")
  } else if (enemyTanks >= 2 && picks.length >= 4) {
    score -= 7
    weaknesses.push("Pode sofrer para derrubar a frontline inimiga.")
  }

  if (enemyDive >= 2 && (ownPeel >= 1 || ownDisengage >= 1)) {
    score += 8
    strengths.push("Tem ferramentas para segurar ou resetar o dive inimigo.")
  } else if (enemyDive >= 2 && picks.length >= 4) {
    score -= 8
    weaknesses.push("Pode sofrer contra engage/dive inimigo.")
  }

  if (enemyPoke >= 2 && ownHardEngage >= 1) {
    score += 5
    strengths.push("Consegue punir comp inimiga de poke.")
  }

  if (enemyPoke >= 2 && ownDisengage >= 1) {
    score += 4
    strengths.push("Tem ferramentas para reduzir o impacto do poke inimigo.")
  }

  let counterAdvantage = 0
  let synergyAdvantage = 0
  let counterRisk = 0

  const enemyNames = enemyPicks.map((p) => p.hero.name)
  const allyNames = picks.map((p) => p.hero.name)

  picks.forEach((pick) => {
    const matchup = getHeroMatchup(pick.hero.name)

    const countersApplied = matchup.counters.filter((name) =>
      enemyNames.includes(name)
    )

    const counteredByApplied = matchup.counteredBy.filter((name) =>
      enemyNames.includes(name)
    )

    const synergiesApplied = matchup.synergies.filter((name) =>
      allyNames.includes(name) && name !== pick.hero.name
    )

    if (countersApplied.length > 0) {
      const gain = countersApplied.length * 7
      counterAdvantage += gain
      score += gain
      strengths.push(
        `${pick.hero.name} é forte contra ${countersApplied.join(", ")}.`
      )
    }

    if (synergiesApplied.length > 0) {
      const gain = synergiesApplied.length * 6
      synergyAdvantage += gain
      score += gain
      strengths.push(
        `${pick.hero.name} sinergiza com ${synergiesApplied.join(", ")}.`
      )
    }

    if (counteredByApplied.length > 0) {
      const loss = counteredByApplied.length * 6
      counterRisk += loss
      score -= loss
      weaknesses.push(
        `${pick.hero.name} pode sofrer contra ${counteredByApplied.join(", ")}.`
      )
    }
  })

  const uniqueStrengths = [...new Set(strengths)]
  const uniqueWeaknesses = [...new Set(weaknesses)]

  const summary =
    uniqueStrengths.length === 0 && uniqueWeaknesses.length === 0
      ? "Draft ainda muito incompleto para uma leitura mais profunda."
      : uniqueStrengths.length >= uniqueWeaknesses.length
      ? "Composição com boa estrutura geral e mais pontos fortes do que fracos."
      : "Composição tem problemas estruturais e precisa de picks mais coerentes."

  return {
    score: clampMinZero(score),
    strengths: uniqueStrengths,
    weaknesses: uniqueWeaknesses,
    summary,
    metrics: {
      earlyGame: earlyHeroes,
      lateGame: scalingHeroes,
      teamFight: teamFightHeroes,
      pickOff: burstHeroes,
      engage: engageHeroes,
      peel: peelHeroes,
      disengage: disengageHeroes,
      frontline: tanks,
      magicDamage,
      physicalDamage,
      crowdControl: ccHeroes,
      counterAdvantage,
      synergyAdvantage,
      counterRisk,
    },
    damageProfile: {
      physical: physicalDamage,
      magic: magicDamage,
      mixed: mixedDamage,
    },
  }
}