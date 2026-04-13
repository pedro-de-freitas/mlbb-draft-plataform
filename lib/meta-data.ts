import { heroes } from "@/lib/data"
import { HeroRole } from "@/types/hero"

export type HeroTier = "S+" | "S" | "A" | "B" | "C"

export type MetaHeroProfile = {
  heroName: string
  tier: HeroTier
  priorityScore: number
  banPriority: number
  blindPickScore: number
  bestRoles: HeroRole[]
  tags: string[]
  reasons: string[]
}

export type MetaTrend = {
  title: string
  description: string
}

export type MetaCombo = {
  heroes: string[]
  label: string
  description: string
}

export type MetaPageData = {
  updatedAt: string
  patchLabel: string
  overview: string
  trends: MetaTrend[]
  combos: MetaCombo[]
  heroes: MetaHeroProfile[]
}

type MetaSeed = {
  tier: HeroTier
  priorityScore: number
  banPriority: number
  blindPickScore: number
  reasons: string[]
}

function defaultTierByHero(rolesCount: number): HeroTier {
  if (rolesCount >= 3) return "B"
  if (rolesCount === 2) return "B"
  return "C"
}

function defaultPriorityByTier(tier: HeroTier) {
  switch (tier) {
    case "S+":
      return 96
    case "S":
      return 86
    case "A":
      return 74
    case "B":
      return 52
    case "C":
      return 28
  }
}

function defaultBanByTier(tier: HeroTier) {
  switch (tier) {
    case "S+":
      return 92
    case "S":
      return 72
    case "A":
      return 52
    case "B":
      return 28
    case "C":
      return 10
  }
}

function defaultBlindByTier(tier: HeroTier) {
  switch (tier) {
    case "S+":
      return 86
    case "S":
      return 76
    case "A":
      return 66
    case "B":
      return 48
    case "C":
      return 26
  }
}

function buildDefaultMetaSeed(): Record<string, MetaSeed> {
  const entries: [string, MetaSeed][] = heroes.map((hero) => {
    const tier = defaultTierByHero(hero.roles.length)

    return [
      hero.name,
      {
        tier,
        priorityScore: defaultPriorityByTier(tier),
        banPriority: defaultBanByTier(tier),
        blindPickScore: defaultBlindByTier(tier),
        reasons: [
          "Baixa prioridade competitiva no snapshot atual.",
          "Mais situacional do que central no meta.",
          "Pode funcionar em draft específico.",
        ],
      },
    ]
  })

  return Object.fromEntries(entries) as Record<string, MetaSeed>
}

const competitiveOverrides = {
  Freya: {
    tier: "S+",
    priorityScore: 97,
    banPriority: 100,
    blindPickScore: 74,
    reasons: [
      "Altíssima prioridade de ban no competitivo PH.",
      "Muito impacto quando passa no draft.",
      "Exige resposta clara do inimigo.",
    ],
  },
  Baxia: {
    tier: "S+",
    priorityScore: 95,
    banPriority: 93,
    blindPickScore: 82,
    reasons: [
      "Ban altíssimo no competitivo PH.",
      "Muito útil contra sustain.",
      "Boa estabilidade competitiva.",
    ],
  },
  Zhuxin: {
    tier: "S+",
    priorityScore: 94,
    banPriority: 93,
    blindPickScore: 84,
    reasons: [
      "Presença alta em drafts competitivos.",
      "Controle e utilidade muito fortes.",
      "Mid muito consistente.",
    ],
  },
  Kalea: {
    tier: "S+",
    priorityScore: 92,
    banPriority: 86,
    blindPickScore: 78,
    reasons: [
      "Muito respeitada em bans no competitivo PH.",
      "Oferece engage e proteção.",
      "Grande utilidade em comp coordenada.",
    ],
  },

  Claude: {
    tier: "S",
    priorityScore: 94,
    banPriority: 65,
    blindPickScore: 86,
    reasons: [
      "Top pick no competitivo PH.",
      "Excelente carry para teamfight.",
      "Muito forte com proteção.",
    ],
  },
  Khaleed: {
    tier: "S",
    priorityScore: 91,
    banPriority: 61,
    blindPickScore: 81,
    reasons: [
      "Top pick no competitivo PH.",
      "Early forte e muita pressão.",
      "Boa presença em drafts agressivos.",
    ],
  },
  Yve: {
    tier: "S",
    priorityScore: 90,
    banPriority: 64,
    blindPickScore: 84,
    reasons: [
      "Top pick no competitivo PH.",
      "Excelente controle de teamfight.",
      "Muito valiosa em jogo coordenado.",
    ],
  },
  Valentina: {
    tier: "S",
    priorityScore: 89,
    banPriority: 62,
    blindPickScore: 88,
    reasons: [
      "Top pick no competitivo PH.",
      "Blind pick muito seguro.",
      "Versátil contra várias comps.",
    ],
  },
  Leomord: {
    tier: "S",
    priorityScore: 87,
    banPriority: 58,
    blindPickScore: 78,
    reasons: [
      "Top pick no competitivo PH.",
      "Bom impacto em lutas médias.",
      "Escala bem em draft certo.",
    ],
  },
  Karrie: {
    tier: "S",
    priorityScore: 88,
    banPriority: 71,
    blindPickScore: 83,
    reasons: [
      "Muito boa contra frontline.",
      "Meta favorece tank shred.",
      "Carry confiável no competitivo.",
    ],
  },
  Harith: {
    tier: "S",
    priorityScore: 86,
    banPriority: 66,
    blindPickScore: 79,
    reasons: [
      "Presença competitiva relevante.",
      "Boa pressão e mobilidade.",
      "Valor alto quando não é travado.",
    ],
  },
  Kimmy: {
    tier: "S",
    priorityScore: 85,
    banPriority: 54,
    blindPickScore: 76,
    reasons: [
      "Pressão de rota útil no meta.",
      "Boa em drafts de tempo.",
      "Valor competitivo consistente.",
    ],
  },
  Gatotkaca: {
    tier: "S",
    priorityScore: 88,
    banPriority: 60,
    blindPickScore: 72,
    reasons: [
      "Aparece forte em seed competitiva PH/ID.",
      "Boa presença em teamfight.",
      "Frontline competitiva consistente.",
    ],
  },
  Lancelot: {
    tier: "S",
    priorityScore: 87,
    banPriority: 68,
    blindPickScore: 66,
    reasons: [
      "Prioridade alta em estatísticas competitivas ID.",
      "Backline access relevante.",
      "Muito valor em execução alta.",
    ],
  },
  Granger: {
    tier: "S",
    priorityScore: 85,
    banPriority: 55,
    blindPickScore: 73,
    reasons: [
      "Prioridade competitiva boa na Indonésia.",
      "Bom dano e pressão de pickoff.",
      "Funciona bem com setup.",
    ],
  },

  Hylos: {
    tier: "A",
    priorityScore: 80,
    banPriority: 50,
    blindPickScore: 79,
    reasons: [
      "Frontline sólida.",
      "Bom blind pick.",
      "Útil em comps estáveis.",
    ],
  },
  Harley: {
    tier: "A",
    priorityScore: 81,
    banPriority: 54,
    blindPickScore: 66,
    reasons: [
      "Boa presença competitiva no PH.",
      "Pickoff forte.",
      "Pune draft frágil.",
    ],
  },
  "Yi Sun-shin": {
    tier: "A",
    priorityScore: 80,
    banPriority: 48,
    blindPickScore: 74,
    reasons: [
      "Boa taxa de picks competitivos.",
      "Valor macro e objetivo.",
      "Escala com comp coordenada.",
    ],
  },
  "Lapu-Lapu": {
    tier: "A",
    priorityScore: 79,
    banPriority: 44,
    blindPickScore: 75,
    reasons: [
      "EXP estável no competitivo.",
      "Boa luta média.",
      "Blind razoável.",
    ],
  },
  Guinevere: {
    tier: "A",
    priorityScore: 78,
    banPriority: 79,
    blindPickScore: 54,
    reasons: [
      "Muito respeitada em bans no PH.",
      "Combo explosivo.",
      "Mais situacional como blind.",
    ],
  },
  Fanny: {
    tier: "A",
    priorityScore: 77,
    banPriority: 80,
    blindPickScore: 40,
    reasons: [
      "Muito banida no PH.",
      "Teto altíssimo.",
      "Blind ruim, mas respeito alto.",
    ],
  },
  Hilda: {
    tier: "A",
    priorityScore: 76,
    banPriority: 63,
    blindPickScore: 67,
    reasons: [
      "Boa pressão inicial.",
      "Valor em drafts agressivos.",
      "Roam/EXP útil.",
    ],
  },
  Moskov: {
    tier: "A",
    priorityScore: 75,
    banPriority: 42,
    blindPickScore: 68,
    reasons: [
      "Gold com presença útil.",
      "Boa teamfight em draft certo.",
      "Pede proteção.",
    ],
  },
  Grock: {
    tier: "A",
    priorityScore: 74,
    banPriority: 48,
    blindPickScore: 66,
    reasons: [
      "Utilidade competitiva boa.",
      "Ajuda macro e engage.",
      "Bom flex de pressão.",
    ],
  },
  Alice: {
    tier: "A",
    priorityScore: 73,
    banPriority: 39,
    blindPickScore: 64,
    reasons: [
      "Escala útil em comp certa.",
      "Melhor com sustain e tempo.",
      "Mais situacional que top meta.",
    ],
  },

  Diggie: {
    tier: "B",
    priorityScore: 38,
    banPriority: 24,
    blindPickScore: 42,
    reasons: [
      "No snapshot competitivo usado, não sustenta tier alto.",
      "Hoje é bem mais situacional do que central.",
      "Ainda pode entrar contra engage pesado.",
    ],
  },
  Sun: {
    tier: "C",
    priorityScore: 20,
    banPriority: 8,
    blindPickScore: 18,
    reasons: [
      "Não sustenta prioridade competitiva alta no snapshot atual.",
      "Muito mais situacional do que meta.",
      "Hoje não deve aparecer alto na tier list.",
    ],
  },
} satisfies Partial<Record<string, MetaSeed>>

function buildCompetitiveMetaSeed(): Record<string, MetaSeed> {
  return {
    ...buildDefaultMetaSeed(),
    ...competitiveOverrides,
  }
}

const competitiveMetaSeed: Record<string, MetaSeed> = buildCompetitiveMetaSeed()

function buildAllMetaHeroes(): MetaHeroProfile[] {
  return heroes
    .map((hero) => {
      const seed = competitiveMetaSeed[hero.name]

      return {
        heroName: hero.name,
        tier: seed.tier,
        priorityScore: seed.priorityScore,
        banPriority: seed.banPriority,
        blindPickScore: seed.blindPickScore,
        bestRoles: hero.roles,
        tags: hero.tags,
        reasons: seed.reasons,
      }
    })
    .sort((a, b) => {
      const tierOrder: Record<HeroTier, number> = {
        "S+": 5,
        S: 4,
        A: 3,
        B: 2,
        C: 1,
      }

      if (tierOrder[b.tier] !== tierOrder[a.tier]) {
        return tierOrder[b.tier] - tierOrder[a.tier]
      }

      return b.priorityScore - a.priorityScore
    })
}

export const metaData: MetaPageData = {
  updatedAt: "2026-04-12",
  patchLabel: "PH + ID Competitive Meta Snapshot",
  overview:
    "Meta focado no competitivo das Filipinas e Indonésia, com prioridade em picks consistentes, bans respeitados, blind picks sólidos e impacto real em draft coordenado.",
  trends: [
    {
      title: "Gold laners e mids estáveis seguem muito valiosos",
      description:
        "Claude, Yve, Valentina e Karrie mantêm muito valor por estabilidade e impacto em comp organizada.",
    },
    {
      title: "Bans respeitam picks de alto impacto imediato",
      description:
        "Freya, Baxia, Zhuxin, Kalea e Guinevere exigem respeito maior na fase de ban.",
    },
    {
      title: "Frontline funcional e utilidade ainda sustentam drafts bons",
      description:
        "Gatotkaca, Hylos, Grock e outros frontliners/engagers seguem importantes para draft competitivo.",
    },
    {
      title: "Nem todo pick popular no ranked é top meta competitivo",
      description:
        "Diggie e Sun, por exemplo, ficam bem abaixo quando o recorte é competitivo PH + ID.",
    },
  ],
  combos: [
    {
      heroes: ["Atlas", "Kadita"],
      label: "Combo de engage explosivo",
      description: "Excelente para transformar engage em eliminação rápida.",
    },
    {
      heroes: ["Mathilda", "Arlott"],
      label: "Entrada + follow-up",
      description: "Boa dupla para pickoff, colapso e pressão de mid game.",
    },
    {
      heroes: ["Karrie", "Frontline"],
      label: "Resposta anti-tanque",
      description: "Com frontline protegendo, Karrie ganha muito valor no meta atual.",
    },
  ],
  heroes: buildAllMetaHeroes(),
}

export function getMetaHeroProfile(heroName: string) {
  return metaData.heroes.find((hero) => hero.heroName === heroName) ?? null
}

export function getMetaBonusForHero(heroName: string) {
  const profile = getMetaHeroProfile(heroName)

  if (!profile) {
    return {
      tierBonus: 0,
      priorityBonus: 0,
      banPriority: 0,
      blindPickBonus: 0,
      reasons: [] as string[],
    }
  }

  const tierBonusMap: Record<HeroTier, number> = {
    "S+": 16,
    S: 12,
    A: 8,
    B: 4,
    C: 0,
  }

  return {
    tierBonus: tierBonusMap[profile.tier],
    priorityBonus: Math.round(profile.priorityScore / 10),
    banPriority: Math.round(profile.banPriority / 10),
    blindPickBonus: Math.round(profile.blindPickScore / 10),
    reasons: profile.reasons,
  }
}