"use client"
import { ProductForm } from "@/app/products/_components/form/product-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import CustomCard from "@/components/custom-card"

export default function CreateProductsPage() {
  const router = useRouter()
  return (
    <div className="mt-2 flex h-full w-full flex-col items-center gap-2 sm:mt-8 sm:gap-4">
      <h1 className="text-lg font-bold md:text-4xl">Cadastrar</h1>
      <CustomCard className="w-full max-w-lg lg:py-8">
        <ProductForm
          className="w-full max-w-lg"
          onSuccess={() => {
            router.push("/products")
          }}
          onFail={() =>
            toast.error(
              "Erro:Não foi possivel criar. Ocorreu um erro inesperado.",
            )
          }
        />
      </CustomCard>
    </div>
  )
}
