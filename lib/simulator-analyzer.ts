import { DraftEntry } from "@/types/draft"
import { analyzeTeam } from "@/lib/draft-analyzer"

type SideLabel = "blue" | "red"

export type SimulatorScenarioResult = {
  label: string
  winner: SideLabel | "even"
  explanation: string
}

export type SimulatorInsight = {
  blueAnalysis: ReturnType<typeof analyzeTeam>
  redAnalysis: ReturnType<typeof analyzeTeam>
  blueWinConditions: string[]
  redWinConditions: string[]
  blueRisks: string[]
  redRisks: string[]
  scenarios: SimulatorScenarioResult[]
  verdict: string
}

function winnerFromMetric(
  blueValue: number,
  redValue: number
): SideLabel | "even" {
  if (blueValue === redValue) return "even"
  return blueValue > redValue ? "blue" : "red"
}

function buildWinConditions(
  side: "Blue" | "Red",
  analysis: ReturnType<typeof analyzeTeam>
) {
  const conditions: string[] = []

  if (analysis.metrics.earlyGame >= 2) {
    conditions.push(`${side} deve acelerar o early game e contestar objetivos cedo.`)
  }

  if (analysis.metrics.lateGame >= 2) {
    conditions.push(`${side} escala bem e pode jogar por tempo e spacing.`)
  }

  if (analysis.metrics.teamFight >= 2) {
    conditions.push(`${side} quer lutas agrupadas e bom follow-up de engage.`)
  }

  if (analysis.metrics.pickOff >= 2) {
    conditions.push(`${side} pode vencer encontrando pickoffs antes da fight principal.`)
  }

  if (analysis.metrics.engage >= 1) {
    conditions.push(`${side} tem ferramentas para iniciar luta no timing certo.`)
  }

  if (analysis.metrics.peel >= 1 || analysis.metrics.disengage >= 1) {
    conditions.push(`${side} consegue proteger melhor a backline e controlar o ritmo da luta.`)
  }

  if (analysis.metrics.counterAdvantage > analysis.metrics.counterRisk) {
    conditions.push(`${side} tem boas respostas de matchup contra o draft inimigo.`)
  }

  if (conditions.length === 0) {
    conditions.push(`${side} precisa jogar de forma disciplinada e aproveitar erros do inimigo.`)
  }

  return conditions
}

function buildRisks(
  side: "Blue" | "Red",
  analysis: ReturnType<typeof analyzeTeam>
) {
  const risks: string[] = []

  if (analysis.metrics.frontline === 0) {
    risks.push(`${side} pode sofrer por falta de frontline consistente.`)
  }

  if (analysis.metrics.engage === 0) {
    risks.push(`${side} pode ter dificuldade para começar lutas.`)
  }

  if (analysis.metrics.peel === 0 && analysis.metrics.disengage === 0) {
    risks.push(`${side} pode sofrer quando o inimigo alcançar a backline.`)
  }

  if (
    analysis.damageProfile.physical > 0 &&
    analysis.damageProfile.magic === 0
  ) {
    risks.push(`${side} tem dano muito concentrado em físico.`)
  }

  if (
    analysis.damageProfile.magic > 0 &&
    analysis.damageProfile.physical === 0
  ) {
    risks.push(`${side} tem dano muito concentrado em mágico.`)
  }

  if (analysis.metrics.counterRisk > analysis.metrics.counterAdvantage) {
    risks.push(`${side} está mais exposto a counters diretos do draft inimigo.`)
  }

  if (analysis.weaknesses.length === 0) {
    risks.push(`${side} não tem uma fraqueza gritante, mas ainda depende de execução.`)
  }

  return risks
}

export function analyzeSimulation(
  bluePicks: DraftEntry[],
  redPicks: DraftEntry[]
): SimulatorInsight {
  const blueAnalysis = analyzeTeam(bluePicks, redPicks)
  const redAnalysis = analyzeTeam(redPicks, bluePicks)

  const earlyWinner = winnerFromMetric(
    blueAnalysis.metrics.earlyGame,
    redAnalysis.metrics.earlyGame
  )

  const lateWinner = winnerFromMetric(
    blueAnalysis.metrics.lateGame,
    redAnalysis.metrics.lateGame
  )

  const teamFightWinner = winnerFromMetric(
    blueAnalysis.metrics.teamFight + blueAnalysis.metrics.frontline + blueAnalysis.metrics.engage,
    redAnalysis.metrics.teamFight + redAnalysis.metrics.frontline + redAnalysis.metrics.engage
  )

  const pickOffWinner = winnerFromMetric(
    blueAnalysis.metrics.pickOff + blueAnalysis.metrics.counterAdvantage,
    redAnalysis.metrics.pickOff + redAnalysis.metrics.counterAdvantage
  )

  const protectWinner = winnerFromMetric(
    blueAnalysis.metrics.peel + blueAnalysis.metrics.disengage,
    redAnalysis.metrics.peel + redAnalysis.metrics.disengage
  )

  const scenarios: SimulatorScenarioResult[] = [
    {
      label: "Early game",
      winner: earlyWinner,
      explanation:
        earlyWinner === "even"
          ? "Os dois lados têm pressão parecida no começo."
          : `${earlyWinner === "blue" ? "Blue" : "Red"} tende a ditar o ritmo inicial.`,
    },
    {
      label: "Late game",
      winner: lateWinner,
      explanation:
        lateWinner === "even"
          ? "Os dois lados escalam de forma parecida."
          : `${lateWinner === "blue" ? "Blue" : "Red"} tem melhor escalada para lutas longas e jogo tardio.`,
    },
    {
      label: "Team fight no Lord",
      winner: teamFightWinner,
      explanation:
        teamFightWinner === "even"
          ? "A luta 5v5 está bem equilibrada."
          : `${teamFightWinner === "blue" ? "Blue" : "Red"} tende a performar melhor em luta agrupada por engage/frontline/follow-up.`,
    },
    {
      label: "Pickoff no mapa",
      winner: pickOffWinner,
      explanation:
        pickOffWinner === "even"
          ? "Nenhum lado domina claramente o pickoff."
          : `${pickOffWinner === "blue" ? "Blue" : "Red"} tende a achar mais picks antes das fights.`,
    },
    {
      label: "Proteção de carry",
      winner: protectWinner,
      explanation:
        protectWinner === "even"
          ? "Os dois lados têm proteção parecida."
          : `${protectWinner === "blue" ? "Blue" : "Red"} tende a proteger melhor a backline.`,
    },
  ]

  const scoreGap = blueAnalysis.score - redAnalysis.score

  const verdict =
    scoreGap === 0
      ? "Os drafts estão bem equilibrados. A execução e o macro devem decidir mais do que o papel."
      : scoreGap > 0
      ? "Blue Side tem vantagem teórica. O draft parece mais estável e com mais condições de vitória."
      : "Red Side tem vantagem teórica. O draft parece mais redondo e mais difícil de punir."

  return {
    blueAnalysis,
    redAnalysis,
    blueWinConditions: buildWinConditions("Blue", blueAnalysis),
    redWinConditions: buildWinConditions("Red", redAnalysis),
    blueRisks: buildRisks("Blue", blueAnalysis),
    redRisks: buildRisks("Red", redAnalysis),
    scenarios,
    verdict,
  }
}