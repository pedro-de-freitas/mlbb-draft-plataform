"use client"

import Image from "next/image"
import { Ban, Plus } from "lucide-react"
import { DraftEntry, DraftStep, TeamRoleAssignments } from "@/types/draft"
import { HeroRole } from "@/types/hero"
import { analyzeTeam } from "@/lib/draft-analyzer"
import { getHeroImage } from "@/lib/get-hero-image"
import { roleOrder } from "./draft-constants"

type DraftTeamSectionProps = {
  side: "blue" | "red"
  enemyPicks: DraftEntry[]
  picks: DraftEntry[]
  bans: DraftEntry[]
  assignments: TeamRoleAssignments
  analysis: ReturnType<typeof analyzeTeam>
  currentStep?: DraftStep
  onAssignRole: (side: "blue" | "red", heroName: string, role: HeroRole) => void
  onEmptySlotClick: () => void
}

export function DraftTeamSection({
  side,
  picks,
  bans,
  currentStep,
  onAssignRole,
  onEmptySlotClick,
}: DraftTeamSectionProps) {
  const isBlue = side === "blue"
  const color = isBlue ? "blue" : "red"

  const activePickIndex =
    currentStep?.side === side && currentStep.type === "pick" ? picks.length : -1

  const activeBanIndex =
    currentStep?.side === side && currentStep.type === "ban" ? bans.length : -1

  return (
    <section
      className={`overflow-hidden rounded-2xl border bg-[#07111f]/90 shadow-2xl ${
        isBlue ? "border-blue-500/30" : "border-red-500/30"
      }`}
    >
      <div
        className={`border-b px-5 py-4 text-center text-lg font-black uppercase tracking-[0.12em] ${
          isBlue
            ? "border-blue-500/20 bg-blue-500/5 text-blue-400"
            : "border-red-500/20 bg-red-500/5 text-red-400"
        }`}
      >
        {isBlue ? "Blue Team" : "Red Team"}
      </div>

      <div className="space-y-6 p-5">
        <div>
          <p
            className={`mb-3 text-sm font-black uppercase ${
              isBlue ? "text-blue-400" : "text-red-400"
            }`}
          >
            Bans
          </p>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <BanSlot
                key={`${side}-ban-${index}`}
                entry={bans[index]}
                index={index}
                active={index === activeBanIndex}
                color={color}
                onClick={index === activeBanIndex ? onEmptySlotClick : undefined}
              />
            ))}
          </div>
        </div>

        <div>
          <p
            className={`mb-3 text-sm font-black uppercase ${
              isBlue ? "text-blue-400" : "text-red-400"
            }`}
          >
            Picks
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <PickSlot
                key={`${side}-pick-${index}`}
                entry={picks[index]}
                index={index}
                side={side}
                active={index === activePickIndex}
                color={color}
                onClick={index === activePickIndex ? onEmptySlotClick : undefined}
                onAssignRole={onAssignRole}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function BanSlot({
  entry,
  index,
  active,
  color,
  onClick,
}: {
  entry?: DraftEntry
  index: number
  active: boolean
  color: "blue" | "red"
  onClick?: () => void
}) {
  const isBlue = color === "blue"

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`relative h-[120px] overflow-hidden rounded-xl border transition ${
        active
          ? isBlue
            ? "border-blue-300 bg-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.45)]"
            : "border-red-300 bg-red-500/20 shadow-[0_0_25px_rgba(239,68,68,0.45)]"
          : isBlue
          ? "border-blue-500/30 bg-blue-950/10"
          : "border-red-500/30 bg-red-950/10"
      } ${onClick ? "cursor-pointer hover:scale-[1.03]" : "cursor-default"}`}
    >
      {entry ? (
        <>
          <Image
            src={getHeroImage(entry.hero.name)}
            alt={entry.hero.name}
            fill
            sizes="150px"
            className="object-cover grayscale"
          />

          <div className="absolute inset-0 bg-black/35" />

          <Ban className="absolute right-2 top-2 h-4 w-4 text-red-500" />

          <p className="absolute bottom-2 left-2 right-2 line-clamp-2 text-[11px] font-black uppercase leading-tight text-white">
            {entry.hero.name}
          </p>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          {active ? (
            <Plus className={isBlue ? "text-blue-300" : "text-red-300"} />
          ) : (
            <span
              className={`text-xl font-black ${
                isBlue ? "text-blue-500/35" : "text-red-500/35"
              }`}
            >
              B{index + 1}
            </span>
          )}
        </div>
      )}
    </button>
  )
}

function PickSlot({
  entry,
  index,
  side,
  active,
  color,
  onClick,
  onAssignRole,
}: {
  entry?: DraftEntry
  index: number
  side: "blue" | "red"
  active: boolean
  color: "blue" | "red"
  onClick?: () => void
  onAssignRole: (side: "blue" | "red", heroName: string, role: HeroRole) => void
}) {
  const isBlue = color === "blue"

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={!onClick}
        className={`group relative h-[320px] w-full overflow-hidden rounded-xl border transition ${
          active
            ? isBlue
              ? "border-blue-300 shadow-[0_0_35px_rgba(59,130,246,0.45)]"
              : "border-red-300 shadow-[0_0_35px_rgba(239,68,68,0.45)]"
            : isBlue
            ? "border-blue-500/30"
            : "border-red-500/30"
        } ${onClick ? "cursor-pointer hover:scale-[1.02]" : "cursor-default"}`}
      >
        {entry ? (
          <>
            <Image
              src={getHeroImage(entry.hero.name)}
              alt={entry.hero.name}
              fill
              sizes="260px"
              className="object-cover transition duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="line-clamp-2 text-base font-black uppercase leading-tight text-white">
                {entry.hero.name}
              </p>

              {entry.assignedRole && (
                <span
                  className={`mt-2 inline-flex rounded-lg border px-2 py-1 text-[10px] font-black uppercase ${
                    isBlue
                      ? "border-blue-500/40 bg-blue-500/15 text-blue-200"
                      : "border-red-500/40 bg-red-500/15 text-red-200"
                  }`}
                >
                  {entry.assignedRole}
                </span>
              )}
            </div>
          </>
        ) : (
          <div
            className={`flex h-full flex-col items-center justify-center ${
              isBlue ? "bg-blue-950/10" : "bg-red-950/10"
            }`}
          >
            {active ? (
              <Plus className={isBlue ? "text-blue-300" : "text-red-300"} />
            ) : (
              <span
                className={`text-4xl font-black ${
                  isBlue ? "text-blue-500/25" : "text-red-500/25"
                }`}
              >
                P{index + 1}
              </span>
            )}
          </div>
        )}
      </button>

      <select
        disabled={!entry}
        value={entry?.assignedRole ?? ""}
        onChange={(event) =>
          entry &&
          onAssignRole(side, entry.hero.name, event.target.value as HeroRole)
        }
        className="mt-3 h-11 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-xs font-black uppercase text-slate-300 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <option value="">Role</option>
        {roleOrder.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  )
}