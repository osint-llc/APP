"use client"

import type * as React from "react"

import { UserMenu } from "@/app/(market)/app-navbar"
import { ThemeSwitcher } from "@/components/theme-switcher"
import servers from "@/resources/data/servers.json"
import sites from "@/resources/data/sites.json"
import { getModel, getSitesByServerId } from "@/resources/eloquent"
import { IconChevronLgRight } from "justd-icons"
import { useParams } from "next/navigation"
import { Button, Link, Menu, Separator, SidebarNav, SidebarTrigger } from "ui"

export const mappedServers = servers.map((server) => ({
  ...server,
  sites: sites.filter((site) => site.server_id === server.id),
}))
export function AppNavbar() {
  const { id, commit } = useParams()
  return (
    <SidebarNav isSticky>
      <div className="flex items-center gap-x-4">
        <SidebarTrigger className="-ml-2" />
        <Separator orientation="vertical" className="-mx-1 h-6" />
        <Menu>
          <Button intent="plain" size="small" className="group *:data-[slot=icon]:size-3.5">
            Quick Jump...
            <IconChevronLgRight className="transition duration-200 group-data-pressed:rotate-90" />
          </Button>
          <Menu.Content placement="bottom" className="sm:min-w-[16rem]">
            <Menu.Item href="/servers">
              <Menu.ItemDetails label="All Servers" description="List of all servers" />
            </Menu.Item>
            <Menu.Separator />
            {mappedServers.map((item) => (
              <Menu.Submenu key={item.id}>
                <Menu.Item>
                  <Menu.ItemDetails label={item.name} description={item.ip_address} />
                </Menu.Item>
                <Menu.Content className="sm:min-w-[14rem]">
                  <Menu.Item href={`/servers/${item.id}`} textValue="Server">
                    <Menu.ItemDetails label="Go to Server" description={item.ip_address} />
                  </Menu.Item>
                  <Menu.Separator />
                  {item.sites.map((item) => (
                    <Menu.Item
                      key={item.domain}
                      href={`/servers/${item.server_id}/${item.commit}`}
                      textValue={item.domain}
                    >
                      <Menu.ItemDetails label={item.domain} description={item.repo} />
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu.Submenu>
            ))}
          </Menu.Content>
        </Menu>

        <div className="hidden sm:flex sm:items-center sm:gap-x-4">
          {getModel(servers, "id", Number(id)) && (
            <>
              <NavbarItem className="-mx-2 cursor-default px-0 hover:text-muted-fg">/</NavbarItem>
              <Menu>
                <Button intent="plain" size="small" className="group *:data-[slot=icon]:size-3.5">
                  {getModel(servers, "id", Number(id))?.name}...
                  <IconChevronLgRight className="transition duration-200 group-data-pressed:rotate-90" />
                </Button>
                <Menu.Content placement="bottom" items={mappedServers} className="sm:min-w-[16rem]">
                  <Menu.Item href={`/servers/${id}/sites`} textValue="Server">
                    <Menu.ItemDetails
                      label="Go to Server"
                      description={getModel(servers, "id", Number(id))?.name}
                    />
                    <Menu.Separator />
                  </Menu.Item>
                  {getSitesByServerId(Number(id)).map((item) => (
                    <Menu.Item
                      key={item.domain}
                      href={`/servers/${item.server_id}/${item.commit}`}
                      textValue={item.domain}
                    >
                      <Menu.ItemDetails label={item.domain} description={item.repo} />
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu>
            </>
          )}
        </div>
        {commit && (
          <>
            <NavbarItem className="-mx-2 cursor-default px-0 hover:text-muted-fg">/</NavbarItem>
            <NavbarItem href={`/servers/${id}/${commit}`}>
              {getModel(sites, "commit", commit)?.domain}
            </NavbarItem>
          </>
        )}
      </div>
      <div className="hidden lg:ml-auto lg:flex lg:items-center lg:gap-x-2 ">
        <ThemeSwitcher />
        <UserMenu />
      </div>
    </SidebarNav>
  )
}

function NavbarItem({ className, ...props }: React.ComponentProps<typeof Link>) {
  return <Link className={className} {...props} />
}
