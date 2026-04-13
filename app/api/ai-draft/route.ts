import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY não encontrada no .env.local" },
        { status: 500 }
      )
    }

    const { prompt } = await req.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt não enviado corretamente" },
        { status: 400 }
      )
    }

    const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        input: prompt,
      }),
    })

    const data = await openaiResponse.json()

    if (!openaiResponse.ok) {
      console.error("OPENAI STATUS:", openaiResponse.status)
      console.error("OPENAI ERROR:", JSON.stringify(data, null, 2))

      return NextResponse.json(
        {
          error: "Erro ao chamar OpenAI",
          details: data,
        },
        { status: openaiResponse.status }
      )
    }

    const text =
  data?.output_text ||
  data?.output?.[0]?.content?.find(
    (item: { type: string; text?: string }) => item.type === "output_text"
  )?.text ||
  ""

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Erro interno /api/ai-draft:", error)

    return NextResponse.json(
      {
        error: "Erro interno no servidor",
        details: String(error),
      },
      { status: 500 }
    )
  }
}