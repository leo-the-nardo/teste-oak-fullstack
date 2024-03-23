"use client"

import { useRouter } from "next/navigation"

interface LoginButtonProps {
  children: React.ReactNode
  asChild?: boolean
}

export function InitButton({ children }: LoginButtonProps) {
  const router = useRouter()
  const onClick = () => {
    router.push("/products/list")
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
