import { CSSProperties } from "react"
import { cn } from "@/lib/utils"

export default function CustomCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      style={
        {
          "--highlight": "255 255 255",
          "--bg-color":
            "linear-gradient(145deg, rgba(12, 117, 125, 1) 0%, rgba(59, 30, 61, 0.4) 100%)",
          "--border-color": `linear-gradient(145deg,rgb(var(--highlight)) 0%, rgb(var(--highlight) / 0.3) 33.33%,rgb(var(--highlight) / 0.14) 66.67%, rgb(var(--highlight) / 0.1) 100%)`,
        } as CSSProperties
      }
      className={cn(
        "rounded rounded-xl border border-transparent p-4  [background:padding-box_var(--bg-color),border-box_var(--border-color)]  lg:p-2 lg:px-6",
        className,
      )}
    >
      {children}
    </div>
  )
}
