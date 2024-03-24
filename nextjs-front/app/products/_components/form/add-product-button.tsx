"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import * as React from "react"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { ProductForm } from "@/app/products/_components/form/product-form"
import { toast } from "sonner"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export default function AddProductButton(props: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "ml-auto w-full border-0 bg-transparent backdrop-blur backdrop-brightness-150 transition-all hover:bg-transparent hover:backdrop-brightness-75 sm:w-auto",
            props.className,
          )}
        >
          Adicionar <PlusIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>
        <ProductForm
          onSuccess={() => {
            setIsOpen(false)
            toast.success("Produto adicionado com sucesso")
          }}
          onFail={() => {
            setIsOpen(false)
            toast.error("Erro ao adicionar produto")
          }}
        />
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
