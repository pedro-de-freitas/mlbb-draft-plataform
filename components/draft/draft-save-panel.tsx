"use client"

import { useState } from "react"
import { DraftEntry } from "@/types/draft"
import { saveDraft } from "@/lib/saved-draft"

type DraftSavePanelProps = {
  entries: DraftEntry[]
}

export function DraftSavePanel({ entries }: DraftSavePanelProps) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  function handleSave() {
    if (entries.length === 0) {
      setMessage("Monte um draft antes de salvar.")
      return
    }

    const fallbackName = `Draft ${new Date().toLocaleDateString("pt-BR")}`
    const saved = saveDraft(name || fallbackName, entries)

    if (!saved) {
      setMessage("Não foi possível salvar o draft.")
      return
    }

    setMessage(`Draft "${saved.name}" salvo com sucesso.`)
    setName("")
  }

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h3 className="text-lg font-bold text-white">Salvar draft</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Salve o draft atual para abrir depois no Simulador e comparar cenários,
            win conditions e pontos fortes de cada lado.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex.: Draft anti engage"
            className="h-11 flex-1 rounded-2xl border border-zinc-700 bg-zinc-950 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-zinc-500"
          />

          <button
            type="button"
            onClick={handleSave}
            className="h-11 rounded-2xl border border-blue-500/30 bg-blue-500/15 px-5 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/25"
          >
            Salvar draft
          </button>
        </div>
      </div>

      {message ? (
        <p className="mt-3 text-sm text-zinc-300">{message}</p>
      ) : null}
    </section>
  )
}