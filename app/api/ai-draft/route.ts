import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Você é um coach profissional de Mobile Legends.

Analise este draft competitivo:

${JSON.stringify(body, null, 2)}

Responda em português brasileiro, direto e estratégico.

Formato:
1. Resumo geral
2. Pontos fortes do Blue
3. Pontos fracos do Blue
4. Pontos fortes do Red
5. Pontos fracos do Red
6. Melhor win condition de cada time
7. Quem está com draft melhor e por quê
8. Sugestão de próximo pick/ban, se o draft ainda não terminou
`,
    })

    return NextResponse.json({
      analysis: response.text,
    })
  } catch (error) {
    console.error("Erro Gemini draft:", error)

    return NextResponse.json(
      { error: "Erro ao analisar draft com Gemini." },
      { status: 500 }
    )
  }
}