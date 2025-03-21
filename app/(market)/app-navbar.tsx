"use client"

import { mappedServers } from "@/app/(dashboard)/servers/app-navbar"
import { Logo } from "@/components/logo"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useMediaQuery } from "@/utils/use-media-query"
import {
  IconChevronLgDown,
  IconCreditCard,
  IconKey,
  IconLogout,
  IconServer,
  IconSettings,
} from "justd-icons"
import { usePathname } from "next/navigation"
import { Collection } from "react-aria-components"
import { Avatar, Menu, Navbar } from "ui"

export function AppNavbar({ children, ...props }: React.ComponentProps<typeof Navbar>) {
  const isMobile = useMediaQuery("(max-width: 600px)")
  return (
    <Navbar isSticky {...props}>
      <Navbar.Nav>
        <Navbar.Logo aria-label="Home" href="/">
          <Logo />
        </Navbar.Logo>
        <Navbar.Section>
          <NavItem href="/">Home</NavItem>
          <NavItem href="/servers">Servers</NavItem>
          <NavItem href="/pricing">Pricing</NavItem>
          {isMobile ? (
            <Collection items={mappedServers}>
              {(item) => (
                <Navbar.Item className="flex justify-between" href={`/servers/${item.id}`}>
                  {item.name}
                </Navbar.Item>
              )}
            </Collection>
          ) : (
            <Menu>
              <Navbar.Item className="group text-muted-fg hover:text-fg focus:text-fg">
                Quick Jump...
                <IconChevronLgDown className="group-data-pressed:-rotate-180 transition duration-200" />
              </Navbar.Item>
              <Menu.Content placement="bottom" items={mappedServers} className="sm:min-w-[16rem]">
                {(item) => (
                  <Menu.Submenu>
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
                )}
              </Menu.Content>
            </Menu>
          )}
        </Navbar.Section>
        <Navbar.Section className="hidden lg:ml-auto lg:block">
          <Navbar.Flex>
            <ThemeSwitcher />
            <UserMenu />
          </Navbar.Flex>
        </Navbar.Section>
      </Navbar.Nav>
      <Navbar.Compact>
        <Navbar.Flex>
          <Navbar.Trigger className="-ml-2" />
        </Navbar.Flex>
        <Navbar.Flex>
          <ThemeSwitcher />
          <UserMenu />
        </Navbar.Flex>
      </Navbar.Compact>
      {children}
    </Navbar>
  )
}

function NavItem(props: React.ComponentProps<typeof Navbar.Item>) {
  const pathname = usePathname()
  const isActive = pathname === props.href
  return <Navbar.Item isCurrent={isActive} {...props} />
}

export function UserMenu() {
  return (
    <Menu>
      <Menu.Trigger className="group flex items-center gap-x-2" aria-label="Open user menu">
        <Avatar size="small" src="/profile.jpg" />
        <span className="hidden text-muted-fg text-sm group-data-pressed:text-fg sm:block">
          Kurt Cobain
        </span>
        <IconChevronLgDown className="size-4 transition-transform duration-200 group-data-pressed:rotate-180" />
      </Menu.Trigger>
      <Menu.Content placement="bottom end" className="sm:min-w-60">
        <Menu.Header separator className="flex flex-col gap-y-0.5">
          <strong className="font-semibold">Kurt Cobain</strong>
          <span className="font-normal text-muted-fg text-sm">kurt@example.com</span>
        </Menu.Header>
        <Menu.Section>
          <Menu.Item href="/servers">
            <IconServer /> <Menu.Label>Servers</Menu.Label>
          </Menu.Item>
          <Menu.Item href="/settings">
            <IconSettings /> <Menu.Label>Settings</Menu.Label>
          </Menu.Item>
          <Menu.Item href="/settings/api-tokens">
            <IconKey /> <Menu.Label>API Tokens</Menu.Label>
          </Menu.Item>
          <Menu.Item href="/settings/billing">
            <IconCreditCard /> <Menu.Label>Billing</Menu.Label>
          </Menu.Item>
          <Menu.Item href="/settings/servers">
            <Menu.Label>Servers</Menu.Label>
          </Menu.Item>
          <Menu.Separator />
        </Menu.Section>
        <Menu.Item href="/login">
          <IconLogout /> <Menu.Label>Logout</Menu.Label>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
