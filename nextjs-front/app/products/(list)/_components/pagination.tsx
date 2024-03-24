import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  canPrevious?: boolean
  canNext?: boolean
  pageNumber: number
  totalPages: number
  dir: "asc" | "desc"
}

export function DataTablePagination<TData>({
  table,
  canPrevious,
  canNext,
  pageNumber,
  totalPages,
  dir,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end px-2 ">
      <div className="flex  items-center space-x-6  lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageNumber + 1} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="px-0"
            disabled={!canPrevious}
          >
            <Link
              className="flex h-full w-full items-center px-4"
              href={`/products?page=${pageNumber > 0 ? pageNumber - 1 : 0}&dir=${dir}`}
            >
              Previous
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={!canNext}
            className="px-0"
          >
            <Link
              className="flex h-full w-full items-center px-4"
              href={`/products?page=${pageNumber + 1}&dir=${dir}`}
            >
              Next
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
