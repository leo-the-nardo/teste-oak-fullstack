"use client"
import { createContext, useContext, useState } from "react"

import useSWR from "swr"
import { API_URL } from "@/routes"
import {
  Product,
  PostProductResponse,
  GetProductsResponse,
} from "@/app/products/models"
import { fetcher } from "@/lib/fetcher"

type ProductContextProps = {
  products: Product[]
  addProduct: (product: PostProductResponse | Product) => void
  isLoading: boolean
}
const ProductContext = createContext<ProductContextProps>({
  products: [
    {
      id: "",
      name: "",
      price: 0,
      description: "",
      availableToSell: false,
    },
  ],
  addProduct: () => {},
  isLoading: true,
})

export const ProductContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const {
    data: products,
    mutate: mutateProducts,
    error,
    isLoading,
  } = useSWR<GetProductsResponse>(`${API_URL}/products`, fetcher, {
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
    fallbackData: [] as any,
  })
  if (error) {
    console.error(error)
  }
  const updateProducts = async (product: Product) => {
    //this is to not fetch again when adding a product.Other way is cache response and revalidate the key on update
    await mutateProducts((prev) => {
      if (!prev) return
      const products = prev.content || []
      //insert on top
      products!.unshift(product)
      const newProducts = [...products!]
      return {
        ...prev,
        content: newProducts,
      }
    }, false)
  }
  return (
    <ProductContext.Provider
      value={{
        products: products!.content!,
        addProduct: updateProducts,
        isLoading: isLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => useContext(ProductContext)
