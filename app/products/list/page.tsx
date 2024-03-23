import { DataTableDemo } from "@/app/products/list/_components/table"
import { Card } from "@/components/ui/card"
import { CSSProperties } from "react"

export default function ListProductsPage() {
  return (
    <main className="flex flex-grow flex-col gap-6 md:gap-8">
      <div className="flex items-center gap-4 sm:mt-6">
        <h1 className="text-4xl font-bold">Produtos</h1>
        <p className="hidden text-lg md:block">
          This is a page where you can list products.
        </p>
      </div>
      <div
        style={
          {
            "--highlight": "255 255 255",
            "--bg-color":
              "linear-gradient(145deg, rgba(12, 117, 125, 1) 0%, rgba(59, 30, 61, 0.4) 100%)",
            "--border-color": `linear-gradient(145deg,rgb(var(--highlight)) 0%, rgb(var(--highlight) / 0.3) 33.33%,rgb(var(--highlight) / 0.14) 66.67%, rgb(var(--highlight) / 0.1) 100%)`,
          } as CSSProperties
        }
        className="rounded-xl border border-transparent p-4  [background:padding-box_var(--bg-color),border-box_var(--border-color)]  lg:p-2 lg:px-6"
      >
        <DataTableDemo />
      </div>
    </main>
  )
}
