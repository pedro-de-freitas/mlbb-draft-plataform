"use client"

import Link from "next/link"
import { ReactNode } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/shared/logo"

const links = [
  { name: "Dashboard", href: "/" },
  { name: "Draft", href: "/draft" },
  { name: "Heróis", href: "/heroes" },
  { name: "Counters", href: "/counters" },
  { name: "Simulador", href: "/simulator" },
  { name: "Meta", href: "/meta" },
]

type MobileSidebarProps = {
  children: ReactNode
}

export function MobileSidebar({ children }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side="left" className="w-72 border-zinc-800 bg-zinc-950 p-0 text-white">
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
      </SheetContent>
    </Sheet>
  )
}