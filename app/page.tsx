import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { InitButton } from "@/components/InitButton"
import { Icons } from "@/components/icons"

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})
export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6">
        <h1
          className={cn(
            "animate-fade-in-up flex items-center gap-3 text-6xl font-semibold text-white drop-shadow-md",
            font.className,
          )}
        >
          <Icons.logo />
          Leothenardo
        </h1>
        <p className="animate-fade-in text-lg text-white">
          A simple product service
        </p>
        <div className="">
          <InitButton>
            <Button variant="default" size="lg">
              Start
            </Button>
          </InitButton>
        </div>
      </div>
    </main>
  )
}
