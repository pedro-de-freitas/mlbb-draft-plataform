import { Hero, HeroRole } from "@/types/hero"
import { DraftEntry } from "@/types/draft"
import { heroes } from "@/lib/data"
import { getHeroMatchup } from "./hero-matchup"
import { getMetaBonusForHero } from "./meta-data"

export type Suggestion = {
  hero: Hero
  score: number
  reasons: string[]
}

export type BanSuggestion = {
  hero: Hero
  score: number
  reasons: string[]
}

function hasTag(team: DraftEntry[], tag: string) {
  return team.some((entry) => entry.hero.tags.includes(tag as Hero["tags"][number]))
}

function countTag(team: DraftEntry[], tag: string) {
  return team.filter((entry) => entry.hero.tags.includes(tag as Hero["tags"][number])).length
}

function getAssignedRoles(team: DraftEntry[]) {
  return new Set(team.map((entry) => entry.assignedRole).filter(Boolean))
}

function scoreHeroForTeam(
  hero: Hero,
  team: DraftEntry[],
  enemy: DraftEntry[]
): Suggestion {
  let score = 0
  const reasons: string[] = []

  const enemyHeroNames = enemy.map((p) => p.hero.name)
  const teamHeroNames = team.map((p) => p.hero.name)
  const assignedRoles = getAssignedRoles(team)

  const teamHasFrontline = hasTag(team, "Frontline")
  const teamHasEngage = hasTag(team, "Engage")
  const teamHasCC = hasTag(team, "CC")
  const teamHasDPS = hasTag(team, "DPS")
  const teamHasUtility = hasTag(team, "Utility")
  const teamHasPeel = hasTag(team, "Peel")
  const teamHasDisengage = hasTag(team, "Disengage")

  const teamMagicCount = team.filter(
    (p) => p.hero.damageType === "Magic" || p.hero.damageType === "Mixed"
  ).length

  const teamPhysicalCount = team.filter(
    (p) => p.hero.damageType === "Physical" || p.hero.damageType === "Mixed"
  ).length

  if (!teamHasFrontline && hero.tags.includes("Frontline")) {
    score += 15
    reasons.push("Adiciona frontline")
  }

  if (!teamHasEngage && hero.tags.includes("Engage")) {
    score += 12
    reasons.push("Adiciona engage")
  }

  if (!teamHasCC && hero.tags.includes("CC")) {
    score += 10
    reasons.push("Adiciona CC")
  }

  if (!teamHasDPS && hero.tags.includes("DPS")) {
    score += 10
    reasons.push("Adiciona DPS")
  }

  if (!teamHasUtility && hero.tags.includes("Utility")) {
    score += 8
    reasons.push("Adiciona utility")
  }

  if (!teamHasPeel && hero.tags.includes("Peel")) {
    score += 9
    reasons.push("Adiciona peel")
  }

  if (!teamHasDisengage && hero.tags.includes("Disengage")) {
    score += 9
    reasons.push("Adiciona disengage")
  }

  if (teamMagicCount === 0 && (hero.damageType === "Magic" || hero.damageType === "Mixed")) {
    score += 8
    reasons.push("Equilibra dano mágico")
  }

  if (teamPhysicalCount === 0 && (hero.damageType === "Physical" || hero.damageType === "Mixed")) {
    score += 8
    reasons.push("Equilibra dano físico")
  }

  const matchup = getHeroMatchup(hero.name)

  const countersApplied = matchup.counters.filter((name) =>
    enemyHeroNames.includes(name)
  )

  const counteredByApplied = matchup.counteredBy.filter((name) =>
    enemyHeroNames.includes(name)
  )

  const synergiesApplied = matchup.synergies.filter((name) =>
    teamHeroNames.includes(name)
  )

  if (countersApplied.length > 0) {
    const gained = countersApplied.length * 7
    score += gained
    reasons.push(`Bom contra: ${countersApplied.join(", ")}`)
  }

  if (synergiesApplied.length > 0) {
    const gained = synergiesApplied.length * 6
    score += gained
    reasons.push(`Sinergia com: ${synergiesApplied.join(", ")}`)
  }

  if (counteredByApplied.length > 0) {
    const lost = counteredByApplied.length * 6
    score -= lost
    reasons.push(`Pode sofrer contra: ${counteredByApplied.join(", ")}`)
  }

  const enemyHasManyFrontliners = countTag(enemy, "Frontline") >= 2
  const enemyHasEngage = hasTag(enemy, "Engage")
  const enemyHasPoke = hasTag(enemy, "Poke")
  const enemyHasPickoff = hasTag(enemy, "Pickoff") || hasTag(enemy, "Burst")

  if (enemyHasManyFrontliners && hero.tags.includes("DPS")) {
    score += 8
    reasons.push("Bom para bater em frontlines")
  }

  if (enemyHasEngage && (hero.tags.includes("Peel") || hero.tags.includes("Disengage"))) {
    score += 8
    reasons.push("Ajuda contra engage inimigo")
  }

  if (enemyHasPoke && hero.tags.includes("Engage")) {
    score += 6
    reasons.push("Ajuda a punir poke inimigo")
  }

  if (enemyHasPickoff && hero.tags.includes("Peel")) {
    score += 6
    reasons.push("Protege melhor a backline")
  }

  const meta = getMetaBonusForHero(hero.name)

  score += meta.tierBonus
  score += meta.priorityBonus
  score += meta.blindPickBonus

  if (meta.reasons.length > 0) {
    reasons.push(`Meta atual: ${meta.reasons[0]}`)
  }

  if (hero.roles.length >= 3) {
    score += 4
    reasons.push("Flex pick")
  }

  const unfilledRoleBonus = hero.roles.some((role) => !assignedRoles.has(role))
  if (unfilledRoleBonus) {
    score += 8
    reasons.push("Ajuda a fechar rota")
  }

  score += hero.tags.length

  return {
    hero,
    score,
    reasons,
  }
}

export function suggestPicksByRole(
  team: DraftEntry[],
  enemy: DraftEntry[],
  usedNames: string[]
) {
  const roleMap: Record<HeroRole, Suggestion[]> = {
    EXP: [],
    Gold: [],
    Mid: [],
    Jungle: [],
    Roam: [],
  }

  for (const hero of heroes) {
    if (usedNames.includes(hero.name)) continue

    const scored = scoreHeroForTeam(hero, team, enemy)

    for (const role of hero.roles) {
      let roleScore = scored.score
      const reasons = [...scored.reasons]

      const alreadyUsedInRole = team.some((p) => p.assignedRole === role)

      if (!alreadyUsedInRole) {
        roleScore += 10
        reasons.push("Preenche rota")
      }

      roleMap[role].push({
        hero,
        score: roleScore,
        reasons,
      })
    }
  }

  for (const role of Object.keys(roleMap) as HeroRole[]) {
    roleMap[role] = roleMap[role]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }

  return roleMap
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

    const meta = getMetaBonusForHero(hero.name)
    score += meta.banPriority

    if (meta.reasons.length > 0) {
      reasons.push(`Meta atual: ${meta.reasons[0]}`)
    }

    suggestions.push({
      hero,
      score,
      reasons,
    })
  }

  return suggestions.sort((a, b) => b.score - a.score).slice(0, 8)
}