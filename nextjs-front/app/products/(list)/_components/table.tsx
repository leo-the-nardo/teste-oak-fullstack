"use client"

import * as React from "react"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GetProductsResponse, Product, ProductRow } from "@/app/products/models"
import AddProductButton from "@/app/products/_components/form/add-product-button"
import { DataTablePagination } from "@/app/products/(list)/_components/pagination"
import { useSearchParams } from "next/navigation"
import { API_URL } from "@/routes"
import { useQuery } from "@tanstack/react-query"

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: () => <span>Nome</span>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="flex justify-end gap-2 ">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <CaretSortIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))

      // Format the price as a real price
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price)

      return (
        <div className="text-right font-mono font-medium ">{formatted}</div>
      )
    },
    enableSorting: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Example of options</DropdownMenuItem>
            <DropdownMenuItem>Another example</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

async function fetchProducts(pageNum: string, dir: string) {
  const res = await fetch(`${API_URL}/products?page=${pageNum}&dir=${dir}`)
  const data = await res.json()
  return data
}

export function useProductsQuery(pageNum: string, dir: string) {
  return useQuery<GetProductsResponse>({
    queryKey: ["clubs", { dir, pageNum }],
    queryFn: (ctx) => fetchProducts(pageNum, dir),
  })
}
export function DataTableDemo() {
  const searchParams = useSearchParams()
  const pageNum = searchParams.get("page") ?? "0"
  const dir = searchParams.get("dir") ?? "asc"
  const { data, error, isLoading, isPending, isFetching } = useProductsQuery(
    pageNum,
    dir,
  )

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const table = useReactTable({
    data: data?.content ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  })
  //
  return (
    !isLoading && (
      <div className="w-full">
        <div className="flex items-center gap-2 py-4">
          <Input
            placeholder="Filtrar nomes..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm border-slate-300"
          />

          <AddProductButton className="hidden sm:inline-flex" />
        </div>
        <div className="rounded-md ">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="space-x-2 py-4">
          <DataTablePagination
            pageNumber={parseInt(pageNum)}
            totalPages={data!.totalPages}
            dir={dir as "asc" | "desc"}
            canPrevious={!data!.first}
            canNext={!data!.last}
            table={table}
          />
        </div>
        <AddProductButton className="sm:hidden" />
      </div>
    )
  )
}
