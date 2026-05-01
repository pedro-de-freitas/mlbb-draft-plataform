import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "./mobilesidebar"
import Link from "next/link"

const links = [
  { name: "Dashboard", href: "/" },
  { name: "Draft", href: "/draft" },
  { name: "Heróis", href: "/heroes" },
  { name: "Counters", href: "/counters" },
  { name: "Simulador", href: "/simulator" },
  { name: "Meta", href: "/meta" },
]

type TopbarProps = {
  variant?: "default" | "full"
}

export function Topbar({ variant = "default" }: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950/95 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex items-center gap-3">
        <div className="lg:hidden">
          <MobileSidebar>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-zinc-900"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </MobileSidebar>
        </div>

        <h2 className="text-sm font-semibold text-white sm:text-base lg:text-lg">
          MLBB Draft Platform
        </h2>
      </div>

      {variant === "full" && (
        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-xs font-bold uppercase text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}

      <div className="text-xs text-zinc-400 sm:text-sm">Beta</div>
    </header>
  )
}