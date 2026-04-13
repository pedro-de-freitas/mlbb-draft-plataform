import { Logo } from "@/components/shared/logo"
import Link from "next/link"

const links = [
  { name: "Dashboard", href: "/" },
  { name: "Draft", href: "/draft" },
  { name: "Heróis", href: "/heroes" },
  { name: "Counters", href: "/counters" },
  { name: "Simulador", href: "/simulator" },
  { name: "Meta", href: "/meta" },
]

export function Sidebar() {
  return (
    <aside className="h-screen w-64 border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 px-6 py-5">
        <Logo />
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}