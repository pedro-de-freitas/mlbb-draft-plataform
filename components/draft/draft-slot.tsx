import Image from "next/image"
import { getHeroImage } from "@/lib/get-hero-image"

type DraftSlotProps = {
  label: string
  value?: string
  variant?: "blue" | "red" | "neutral"
  compact?: boolean
}

export function DraftSlot({
  label,
  value,
  variant = "neutral",
  compact = false,
}: DraftSlotProps) {
  const styles =
    variant === "blue"
      ? "border-blue-500/20 bg-gradient-to-br from-blue-500/15 via-zinc-900 to-zinc-950"
      : variant === "red"
      ? "border-red-500/20 bg-gradient-to-br from-red-500/15 via-zinc-900 to-zinc-950"
      : "border-zinc-800 bg-zinc-900"

  return (
    <div
      className={`rounded-xl border shadow-md ${styles} ${
        compact ? "min-h-[84px] p-3" : "min-h-[88px] p-4"
      }`}
    >
      <p
        className={`text-center uppercase text-zinc-500 ${
          compact ? "text-[10px]" : "text-[11px] tracking-[0.2em]"
        }`}
      >
        {label}
      </p>

      <div className="mt-2 flex min-h-[42px] items-center gap-3">
        {value ? (
          <>
            <div
              className={`relative overflow-hidden rounded-lg border border-zinc-800 ${
                compact ? "h-10 w-10" : "h-14 w-14"
              }`}
            >
              <Image
                src={getHeroImage(value)}
                alt={value}
                fill
                className="object-cover"
              />
            </div>

            <span
              className={`max-w-full break-words leading-tight font-semibold text-white ${
                compact ? "text-sm" : "text-base"
              }`}
            >
              {value}
            </span>
          </>
        ) : (
          <div className="flex w-full items-center justify-center text-center">
            <span className={`${compact ? "text-sm" : "text-base"} text-zinc-500`}>
              Aguardando
            </span>
          </div>
        )}
      </div>
    </div>
  )
}