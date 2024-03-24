"use client"
import { DataTableDemo } from "@/app/products/(list)/_components/table"
import CustomCard from "@/components/custom-card"
import { Suspense } from "react"

export default function ListProductsPage() {
  return (
    <main className="flex flex-grow flex-col gap-2 sm:gap-6 md:gap-8">
      <div className="flex items-center sm:mt-6 sm:gap-4">
        <h1 className="text-lg font-bold sm:text-4xl">Produtos</h1>
        <p className="hidden text-lg md:block">
          This is a page where you can list products.
        </p>
      </div>
      <CustomCard>
        <Suspense>
          <DataTableDemo />
        </Suspense>
      </CustomCard>
    </main>
  )
}
