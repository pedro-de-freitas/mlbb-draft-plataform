import { DraftEntry } from "@/types/draft"

export type AIDraftAnalysis = {
  winCondition?: string
  earlyGame?: string
  lateGame?: string
  strengths?: string[]
  weaknesses?: string[]
  threats?: { hero: string; reason: string }[]
  bestNextPicks?: { hero: string; role: string; reason: string }[]
  laneAnalysis?: Record<string, string>
}

export async function getAIDraftAnalysis(
  team: DraftEntry[],
  enemy: DraftEntry[]
): Promise<AIDraftAnalysis | null> {
  const teamData = team.map((p) => ({
    name: p.hero.name,
    role: p.assignedRole || "undefined",
  }))

  const enemyData = enemy.map((p) => ({
    name: p.hero.name,
    role: p.assignedRole || "unknown",
  }))

  const prompt = `
Você é um coach profissional de Mobile Legends.

Analise o draft abaixo.

TIME ALIADO:
${JSON.stringify(teamData, null, 2)}

TIME INIMIGO:
${JSON.stringify(enemyData, null, 2)}

Responda SOMENTE em JSON válido, sem markdown e sem texto extra.

{
  "winCondition": "condição de vitória do time aliado",
  "earlyGame": "quem ganha early",
  "lateGame": "quem escala melhor",
  "strengths": ["ponto forte 1", "ponto forte 2"],
  "weaknesses": ["fraqueza 1", "fraqueza 2"],
  "threats": [
    { "hero": "nome", "reason": "por que é problema" }
  ],
  "bestNextPicks": [
    {
      "hero": "nome",
      "role": "rota",
      "reason": "explicação completa"
    }
  ],
  "laneAnalysis": {
    "EXP": "quem ganha e por quê",
    "Gold": "quem ganha e por quê",
    "Mid": "quem ganha e por quê",
    "Jungle": "quem ganha e por quê",
    "Roam": "quem ganha e por quê"
  }
}
`

  const res = await fetch("/api/ai-draft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  })

  const data = await res.json()

  if (!res.ok) {
    console.error("Erro da API ai-draft:", data)
    throw new Error(
      `${data?.error || "Erro na API"} (${res.status}) ${JSON.stringify(data?.details || {})}`
    )
  }

  const text = data?.text

  if (!text || typeof text !== "string") {
    return null
  }

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Resposta da IA não veio como JSON válido:", text)
    return null
  }
}