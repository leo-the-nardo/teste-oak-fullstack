import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Icons } from "@/components/icons"
import { useSelectedLayoutSegment } from "next/navigation"
import { MainNavItem } from "@/app/products/_components/nav/nav"

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
}

export function MobileNav({ items, children }: MobileNavProps) {
  // useLockBody()
  const segment = useSelectedLayoutSegment()

  return (
    <div className="relative z-20 grid  gap-6 rounded-md  p-8 pb-32 text-popover-foreground ">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo />
        <span className="font-bold">Leothenardo</span>
      </Link>
      <nav className="grid grid-flow-row auto-rows-max text-sm">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.disabled ? "#" : item.href}
            className={cn(
              "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
              item.href.startsWith(`/${segment}`)
                ? "text-foreground"
                : "text-foreground/60",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  )
}
