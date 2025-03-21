import type * as React from "react"

import { AppNavbar } from "@/app/(dashboard)/servers/app-navbar"
import { InternalBreadcrumb } from "@/components/internal-breadcrumbs"
import sites from "@/resources/data/sites.json"
import { getModel } from "@/resources/eloquent"
import { siteConfig } from "@/resources/site-config"
import { SidebarInset, SidebarProvider } from "ui"

import { AppSidebar } from "./(app-sidebar)/app-sidebar"

export async function generateMetadata({ params }: { params: Promise<{ commit: string }> }) {
  const { commit } = await params
  const site = getModel(sites, "commit", commit)
  return {
    title: {
      default: `${site?.domain} - ${site?.branch} / ${site?.provider}`,
      template: `%s - ${site?.domain} / ${siteConfig.name}`,
    },
    description: site?.domain,
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="dock" />
      <SidebarInset>
        <AppNavbar />
        <div className="flex flex-col gap-y-6 p-4 lg:p-6">
          <InternalBreadcrumb />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
