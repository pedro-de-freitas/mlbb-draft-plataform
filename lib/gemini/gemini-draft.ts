import { DraftEntry } from "@/types/draft"

type GeminiDraftPayload = {
  entries: DraftEntry[]
  blueAnalysis: unknown
  redAnalysis: unknown
  currentStep?: unknown
}

export async function analyzeDraftWithGemini(payload: GeminiDraftPayload) {
  const response = await fetch("/api/ai-draft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error("Erro ao chamar Gemini.")
  }

  const data = await response.json()

  return data.analysis as string
}