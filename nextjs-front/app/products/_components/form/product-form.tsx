"use client"

import { useTransition } from "react"
import { cn } from "@/lib/utils"
import { API_URL } from "@/routes"
import { useForm } from "react-hook-form"
import { ProductSchema } from "@/app/products/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PostProductResponse } from "@/app/products/models"
import MoneyInput from "@/app/products/_components/form/money-input"
import { LoadableButton } from "@/components/loadable-button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useQueryClient } from "@tanstack/react-query"
type OrderFormProps = {
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onSuccess: () => void
  onFail: () => void
}
export function ProductForm(props: OrderFormProps) {
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      price: 0,
      name: "",
      available: "yes",
      description: "",
    },
  })
  const [isPending, startTransition] = useTransition()
  async function onSubmit(data: z.infer<typeof ProductSchema>) {
    const validatedFields = ProductSchema.safeParse(data)
    if (!validatedFields.success) {
      return
    }
    startTransition(async () => {
      const body = JSON.stringify({
        price: data.price,
        name: data.name,
      })
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: body,
        cache: "no-store",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
      if (res.status !== 200) {
        props.onFail()
        return
      }
      await queryClient.invalidateQueries()
      props.onSuccess()
    })
  }

  return (
    <div className={props.className}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(" space-y-7", props.className)}
        >
          {/*<input name="asset_id" type="hidden" defaultValue={props.assetId} />*/}
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Moletom da Hello Kitty"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <MoneyInput
            name="price"
            form={form}
            label="Price"
            placeholder="0,00"
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do produto</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    placeholder="Quentinho,aconchegante, fofinho , como estar coberto de nuvens."
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Disponível para venda</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormDescription
              id="helper-text-explanation"
              className="mb-2.5 pt-1.5 text-xs text-gray-500 dark:text-gray-400"
            >
              This action can not be undone.
            </FormDescription>

            <LoadableButton
              onClick={props.onClick}
              loading={isPending}
              type="submit"
              className="group relative mb-2 inline-flex h-auto w-full items-center  justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-400 to-cyan-600 p-0.5 text-white shadow transition-all  hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-green-800 group-hover:from-green-400 group-hover:to-blue-600 sm:w-full"
            >
              <span className="relative  w-full rounded-md bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-[#1D2C3A] ">
                CONFIRMAR
              </span>
            </LoadableButton>
          </div>
        </form>
      </Form>
    </div>
  )
}
