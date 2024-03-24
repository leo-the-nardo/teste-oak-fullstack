"use server"
import React from "react"
import { MainNav } from "@/app/products/_components/nav/mainnav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactQueryProvider from "@/app/products/_contexts/react-query-provider"
const config = {
  mainNav: [
    {
      title: "Cadastrar",
      href: "/products/create",
    },
    {
      title: "Listar",
      href: "/products",
    },
  ],
}

const user = {
  name: "Leo Nardo",
  picture: "https://github.com/leo-the-nardo.png",
}
export default async function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid h-full min-h-screen grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[auto_1fr]">
      <ReactQueryProvider>
        <header className=" z-50 col-span-full flex h-[54px] items-center border border-transparent bg-background/20 px-4 shadow md:h-[72px] lg:h-[64px]  lg:px-12">
          <MainNav items={config.mainNav} />
          <nav className="ml-auto flex items-center">
            <Avatar>
              <AvatarImage src={user?.picture || ""} />
              <AvatarFallback className="font-medium text-foreground">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join(".")
                  .toUpperCase()}
                {/*  Edit icon */}
              </AvatarFallback>
            </Avatar>
          </nav>
        </header>
        <div className="hidden flex-col gap-3 border border-transparent border-r-gray-700 transition-all duration-300 ease-in-out lg:flex ">
          {/* --- sidebar here if necessary ----*/}
        </div>
        <div className="h-[calc(100vh-72px)] overflow-auto  lg:h-[calc(100vh-80px)]">
          <div className="mx-auto flex h-full max-w-[1152px] flex-grow flex-col overflow-x-hidden p-2  px-4 ">
            {children}
          </div>
        </div>
      </ReactQueryProvider>
    </div>
  )
}
