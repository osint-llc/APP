"use client"

import { Logo } from "@/components/logo"
import { siteConfig } from "@/resources/site-config"
import {
  IconControl,
  IconControlFill,
  IconFolderUpload,
  IconFolderUploadFill,
  IconGear,
  IconGearFill,
  IconLock,
  IconLockFill,
  IconNotes,
  IconNotesFill,
  IconSend,
  IconSendFill,
  IconShield,
  IconShieldFill,
  IconTerminal,
  IconTerminalFill,
  IconWindow,
  IconWindowFill,
} from "justd-icons"
import { useParams, usePathname } from "next/navigation"
import { useEffect } from "react"
import {
  Link,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem as SidebarItemPrimitive,
  SidebarLabel,
  SidebarSection,
  SidebarSectionGroup,
  useSidebar,
} from "ui"

export const sections = [
  {
    title: "Application",
    items: [
      {
        title: "Site",
        href: "",
        icon: IconWindow,
        activeIcon: IconWindowFill,
      },
      {
        title: "Deployments",
        href: "deployments",
        icon: IconFolderUpload,
        activeIcon: IconFolderUploadFill,
      },
      {
        title: "Commands",
        href: "commands",
        icon: IconTerminal,
        activeIcon: IconTerminalFill,
      },
      {
        title: "Environment Variables",
        href: "environment-variables",
        icon: IconControl,
        activeIcon: IconControlFill,
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Queue",
        href: "queue",
        icon: IconGear,
        activeIcon: IconGearFill,
      },
      {
        title: "SSL",
        href: "ssl",
        icon: IconLock,
        activeIcon: IconLockFill,
      },
      {
        title: "Settings",
        href: "settings",
      },
    ],
  },
  {
    title: "Rules & Logs",
    items: [
      {
        title: "Security Rules",
        href: "security-rules",
        icon: IconShield,
        activeIcon: IconShieldFill,
      },
      {
        title: "Redirect Rules",
        href: "redirect-rules",
        icon: IconSend,
        activeIcon: IconSendFill,
      },
      {
        title: "Logs",
        href: "logs",
        icon: IconNotes,
        activeIcon: IconNotesFill,
      },
    ],
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { id, commit } = useParams()
  const pathname = usePathname()
  const baseHref = `/servers/${id}/${commit}`
  const { state, setIsOpenOnMobile } = useSidebar()
  const collapsed = state === "collapsed"

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsOpenOnMobile(false)
  }, [pathname, setIsOpenOnMobile])
  return (
    <Sidebar {...props}>
      <SidebarHeader className={collapsed ? "mb-0" : ""}>
        <Link className={!collapsed ? "flex items-center gap-x-2" : ""} href="/servers">
          <Logo />
          <strong className="in-data-[sidebar-collapsible=dock]:hidden font-medium font-mono uppercase">
            {siteConfig.name}
          </strong>
        </Link>
      </SidebarHeader>
      {collapsed && <Separator className="my-1.5" />}
      <SidebarContent>
        <SidebarSectionGroup>
          {sections.map((section, index) => (
            <SidebarSection key={index} title={section.title}>
              {section.items.map((nav, i) => (
                <SidebarItem
                  key={i}
                  href={`${nav.href === "" ? baseHref : `${baseHref}/${nav.href}`}`}
                  activeIcon={nav.activeIcon}
                  icon={nav.icon}
                  title={nav.title}
                />
              ))}
            </SidebarSection>
          ))}
        </SidebarSectionGroup>
      </SidebarContent>
    </Sidebar>
  )
}

interface SidebarItemProps extends React.ComponentProps<typeof SidebarItemPrimitive> {
  title: string
  activeIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function SidebarItem({ href, activeIcon, icon, ...props }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  const Icon = activeIcon && isActive ? activeIcon : icon

  return (
    <SidebarItemPrimitive href={href} isCurrent={isActive}>
      {Icon && <Icon />}
      <SidebarLabel>{props.title}</SidebarLabel>
    </SidebarItemPrimitive>
  )
}
