import { DraftBoard } from "@/components/draft/draftboard"
import { AppShell } from "@/components/layout/appshell/app-shell"

export default function DraftPage() {
  return (
    <AppShell layout="topbar">
      <DraftBoard />
    </AppShell>
  )
}