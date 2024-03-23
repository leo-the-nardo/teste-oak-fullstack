"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileNav } from "@/app/products/_components/mobile-nav"
import { MainNavItem } from "@/app/products/_components/nav"

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  return (
    <div className="mr-auto flex gap-6 md:gap-10">
      <Link
        href="/"
        className="hidden items-center space-x-2 md:flex md:text-lg"
      >
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">Leothenardo</span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <DropdownMenu open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <DropdownMenuTrigger className="flex items-center space-x-2 md:hidden">
          {showMobileMenu ? <Icons.close /> : <Icons.logo />}
          <span className="font-bold">Menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-6 mt-4 grid w-[calc(80vw)] grid-flow-row auto-rows-max  p-0 shadow-md md:hidden">
          {items && <MobileNav items={items}>{children}</MobileNav>}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
