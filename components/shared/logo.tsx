import Image from "next/image"

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/Logo-tmt.svg"
        alt="Logo da equipe"
        width={40}
        height={40}
        className="rounded-lg object-contain"
      />

      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-white">TIAMAT GG</p>
        <p className="truncate text-xs text-zinc-400">MLBB Draft</p>
      </div>
    </div>
  )
}