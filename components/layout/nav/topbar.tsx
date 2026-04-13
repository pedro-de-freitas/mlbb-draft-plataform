import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "./mobilesidebar"

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="lg:hidden">
          <MobileSidebar>
            <Button variant="ghost" size="icon" className="text-white hover:bg-zinc-900">
              <Menu className="h-5 w-5" />
            </Button>
          </MobileSidebar>
        </div>

        <h2 className="text-sm font-semibold text-white sm:text-base lg:text-lg">
          MLBB Draft Platform
        </h2>
      </div>

      <div className="text-xs text-zinc-400 sm:text-sm">
        Beta
      </div>
    </header>
  )
}