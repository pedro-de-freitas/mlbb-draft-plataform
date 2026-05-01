import { gemini } from "./gemini-client"

export async function analyzeDraftWithGemini(draftData: unknown) {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Você é um coach profissional de Mobile Legends.

Analise este draft competitivo:
${JSON.stringify(draftData, null, 2)}

Responda em português, com:
1. Pontos fortes
2. Pontos fracos
3. Melhor win condition
4. Heróis problemáticos
5. Sugestão de próximo pick ou ban
6. Nota do draft de 0 a 100
7. Explicação curta e direta
`,
  })

  return response.text
}