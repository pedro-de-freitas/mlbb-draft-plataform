"use client"

import { useEffect, useMemo, useState } from "react"
import { Hero, HeroRole } from "@/types/hero"
import { DraftEntry, TeamRoleAssignments } from "@/types/draft"
import { analyzeTeam } from "@/lib/draft-analyzer"
import { suggestBans, suggestPicksByRole } from "@/lib/pick-suggester"
import { HeroList } from "./hero-list"
import { draftSteps } from "./draft-constants"
import { DraftHeader } from "./draft-header"
import { DraftTeamSection } from "./draft-team-section"
import { DraftSuggestions } from "./draft-suggestions"
import { DraftSavePanel } from "./draft-save-panel"
import { trackDraftViewed, trackPageVisit } from "@/lib/user-activity"
import {
  clearCurrentDraft,
  getCurrentDraft,
  saveCurrentDraft,
} from "@/lib/current-drafts"

export function DraftBoard() {
  const [entries, setEntries] = useState<DraftEntry[]>(() => getCurrentDraft())
  const [search, setSearch] = useState("")
  const [selectedRole, setSelectedRole] = useState<HeroRole | "All">("All")

  useEffect(() => {
    trackPageVisit("draft")
    trackDraftViewed()
  }, [])

  useEffect(() => {
    saveCurrentDraft(entries)
  }, [entries])

  const currentStep = draftSteps[entries.length]

  const usedHeroNames = useMemo(() => {
    return entries.map((entry) => entry.hero.name)
  }, [entries])

  const blueEntries = useMemo(
    () => entries.filter((entry) => entry.side === "blue"),
    [entries]
  )

  const redEntries = useMemo(
    () => entries.filter((entry) => entry.side === "red"),
    [entries]
  )

  const bluePicks = useMemo(
    () => blueEntries.filter((entry) => entry.type === "pick"),
    [blueEntries]
  )

  const blueBans = useMemo(
    () => blueEntries.filter((entry) => entry.type === "ban"),
    [blueEntries]
  )

  const redPicks = useMemo(
    () => redEntries.filter((entry) => entry.type === "pick"),
    [redEntries]
  )

  const redBans = useMemo(
    () => redEntries.filter((entry) => entry.type === "ban"),
    [redEntries]
  )

  const blueAssignments: TeamRoleAssignments = useMemo(() => {
    const assignments: TeamRoleAssignments = {}

    bluePicks.forEach((pick) => {
      if (pick.assignedRole) {
        assignments[pick.assignedRole] = pick.hero.name
      }
    })

    return assignments
  }, [bluePicks])

  const redAssignments: TeamRoleAssignments = useMemo(() => {
    const assignments: TeamRoleAssignments = {}

    redPicks.forEach((pick) => {
      if (pick.assignedRole) {
        assignments[pick.assignedRole] = pick.hero.name
      }
    })

    return assignments
  }, [redPicks])

  const blueAnalysis = useMemo(() => {
    return analyzeTeam(bluePicks, redPicks)
  }, [bluePicks, redPicks])

  const redAnalysis = useMemo(() => {
    return analyzeTeam(redPicks, bluePicks)
  }, [redPicks, bluePicks])

  const roleSuggestions = useMemo(() => {
    const team = currentStep?.side === "red" ? redPicks : bluePicks
    const enemy = currentStep?.side === "red" ? bluePicks : redPicks

    return suggestPicksByRole(team, enemy, usedHeroNames)
  }, [bluePicks, redPicks, usedHeroNames, currentStep])

  const banSuggestions = useMemo(() => {
    const team = currentStep?.side === "red" ? redPicks : bluePicks
    const enemy = currentStep?.side === "red" ? bluePicks : redPicks

    return suggestBans(team, enemy, usedHeroNames)
  }, [bluePicks, redPicks, usedHeroNames, currentStep])

  function handleSelectHero(hero: Hero) {
    if (!currentStep) return
    if (usedHeroNames.includes(hero.name)) return

    const entry: DraftEntry = {
      stepId: currentStep.id,
      side: currentStep.side,
      type: currentStep.type,
      hero,
      assignedRole: undefined,
    }

    setEntries((prev) => [...prev, entry])
  }

  function handleAssignRole(
    side: "blue" | "red",
    heroName: string,
    role: HeroRole
  ) {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.side !== side) return entry
        if (entry.type !== "pick") return entry
        if (entry.hero.name !== heroName) return entry

        return {
          ...entry,
          assignedRole: role,
        }
      })
    )
  }

  function resetDraft() {
    setEntries([])
    setSearch("")
    setSelectedRole("All")
    clearCurrentDraft()
  }

  const winnerText =
    blueAnalysis.score === redAnalysis.score
      ? "As duas composições estão equilibradas."
      : blueAnalysis.score > redAnalysis.score
      ? "Blue Side está com draft mais forte."
      : "Red Side está com draft mais forte."

  return (
    <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.35fr_0.95fr]">
      <div className="order-2 space-y-6 2xl:order-1">
        <DraftHeader
          currentStepLabel={currentStep ? currentStep.label : "Draft finalizado"}
          blueScore={blueAnalysis.score}
          redScore={redAnalysis.score}
          winnerText={winnerText}
          onReset={resetDraft}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <DraftTeamSection
            side="blue"
            enemyPicks={redPicks}
            picks={bluePicks}
            bans={blueBans}
            assignments={blueAssignments}
            analysis={blueAnalysis}
            onAssignRole={handleAssignRole}
          />

          <DraftTeamSection
            side="red"
            enemyPicks={bluePicks}
            picks={redPicks}
            bans={redBans}
            assignments={redAssignments}
            analysis={redAnalysis}
            onAssignRole={handleAssignRole}
          />
        </div>

        <DraftSavePanel entries={entries} />

        <DraftSuggestions
          roleSuggestions={roleSuggestions}
          banSuggestions={banSuggestions}
          currentActionType={currentStep?.type ?? "pick"}
        />
      </div>

      <div className="order-1 2xl:order-2">
        <HeroList
          search={search}
          onSearchChange={setSearch}
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          usedHeroNames={usedHeroNames}
          currentActionLabel={currentStep ? currentStep.label : "Draft finalizado"}
          onSelectHero={handleSelectHero}
        />
      </div>
    </div>
  )
}