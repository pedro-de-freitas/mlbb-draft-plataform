import { ReactNode } from "react"
import { Sidebar } from "../nav/sidebar"
import { Topbar } from "../nav/topbar"

type AppShellProps = {
  children: ReactNode
  layout?: "sidebar" | "topbar"
}

export function AppShell({ children, layout = "sidebar" }: AppShellProps) {
  if (layout === "topbar") {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Topbar variant="full" />
        <main className="flex-1 px-3 py-4 sm:px-4">{children}</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}