import type * as React from "react"

import { InternalBreadcrumb } from "@/components/internal-breadcrumbs"
import servers from "@/resources/data/servers.json"
import { getModel } from "@/resources/eloquent"
import { siteConfig } from "@/resources/site-config"
import { SidebarInset, SidebarProvider } from "ui"

import { AppNavbar } from "../../app-navbar"
import { AppSidebar } from "./(app-sidebar)/app-sidebar"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const server = getModel(servers, "id", Number(id))
  return {
    title: {
      default: `${server?.name}`,
      template: `%s - ${server?.name} | ${siteConfig.name}`,
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="dock" />
      <SidebarInset>
        <AppNavbar />
        <div className="flex w-full flex-col gap-y-6 p-4 lg:p-6">
          <InternalBreadcrumb />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
