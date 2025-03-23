"use client"

import * as React from "react"
import { ArrowLeft, Book, Code, FileText, Info, Layers, Link as LinkIcon, Lock, Settings, Users } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface HackingGuideLayoutProps {
  children: React.ReactNode
  active: "introduction" | "why" | "getting-started" | "participating" | "farstack" | "next" | "documentation" | "open-ideas" | "appendix"
  title: string
}

const getSectionLabel = (active: HackingGuideLayoutProps["active"]): string => {
  switch (active) {
    case "introduction":
      return "Introduction"
    case "why":
      return "Why Hack?"
    case "getting-started":
      return "Getting Started"
    case "participating":
      return "Participating in FarHack"
    case "farstack":
      return "The FarStack"
    case "next":
      return "Next Steps"
    case "documentation":
      return "Documentation"
    case "open-ideas":
      return "Open Ideas"
    case "appendix":
      return "Appendix"
    default:
      return ""
  }
}

export default function HackingGuideLayout({ children, active, title }: HackingGuideLayoutProps) {
  const currentLabel = getSectionLabel(active)
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Hacking Guide</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "introduction"}>
                    <Link href="/hacking-guide" className="flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      <span>Introduction</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "why"}>
                    <Link href="/hacking-guide/why-hack" className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      <span>Why Hack?</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "getting-started"}>
                    <Link href="/hacking-guide/getting-started" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Getting Started</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "participating"}>
                    <Link href="/hacking-guide/participating-in-farhack" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Participating in FarHack</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "farstack"}>
                    <Link href="/hacking-guide/the-farstack" className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      <span>The FarStack</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "next"}>
                    <Link href="/hacking-guide/next-steps" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                      <span>Next Steps</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Resources</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "documentation"}>
                    <Link href="/hacking-guide/resources/documentation" className="flex items-center gap-2">
                      <Book className="h-4 w-4" />
                      <span>Documentation</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "open-ideas"}>
                    <Link href="/hacking-guide/resources/open-ideas" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Open Ideas</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={active === "appendix"}>
                    <Link href="/hacking-guide/resources/appendix" className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      <span>Appendix</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/hacking-guide">Hacking Guide</BreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title || currentLabel}</BreadcrumbPage>
              </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}