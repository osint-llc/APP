"use client"

import { Logo } from "@/components/logo"
import sites from "@/resources/data/sites.json"
import { getAllModelBy } from "@/resources/eloquent"
import { siteConfig } from "@/resources/site-config"
import {
  IconBolt,
  IconBoltFill,
  IconBrandPhp,
  IconCalendar2,
  IconCalendar2Fill,
  IconChainLink,
  IconDatabase,
  IconDatabaseFill,
  IconDotsHorizontal,
  IconGear,
  IconGearFill,
  IconGlobe2,
  IconKey,
  IconKeyFill,
  IconNotepad,
  IconNotepadFill,
  IconNotes,
  IconNotesFill,
  IconPieChart,
  IconPieChartFill,
  IconPlus,
  IconRefresh,
  IconServer,
  IconServerFill,
  IconShield,
  IconShieldFill,
} from "justd-icons"
import { useParams, usePathname } from "next/navigation"
import { useEffect } from "react"
import {
  Link,
  Menu,
  Sidebar,
  SidebarContent,
  SidebarDisclosure,
  SidebarDisclosurePanel,
  SidebarDisclosureTrigger,
  SidebarHeader,
  SidebarItem as SidebarItemPrimitive,
  SidebarLabel,
  SidebarLink,
  SidebarSection,
  SidebarSectionGroup,
  useSidebar,
} from "ui"

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { id } = useParams()
  const pathname = usePathname()
  const { setIsOpenOnMobile } = useSidebar()
  const mappedSites = getAllModelBy(sites, "server_id", Number(id)).slice(0, 5)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsOpenOnMobile(false)
  }, [pathname, setIsOpenOnMobile])
  return (
    <Sidebar {...props}>
      <SidebarHeader className="py-4">
        <Link className="flex items-center gap-x-2" href="/">
          <Logo />
          <strong className="group in-data-[sidebar-collapsible=dock]:hidden font-medium font-mono uppercase">
            {siteConfig.name}
          </strong>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSectionGroup>
          <SidebarSection>
            <SidebarItemPrimitive isCurrent={pathname === `/servers/${id}/sites`}>
              {({ isCollapsed, isHovered }) => (
                <>
                  <SidebarLink href={`/servers/${id}/sites`}>
                    <IconGlobe2 />
                    <SidebarLabel>Sites</SidebarLabel>
                  </SidebarLink>
                  {!isCollapsed && isHovered && (
                    <Menu>
                      <Menu.Trigger aria-label="Manage">
                        <IconDotsHorizontal />
                      </Menu.Trigger>
                      <Menu.Content offset={0} placement="right top">
                        <Menu.Item href={`/servers/${id}/sites/create`}>
                          <IconPlus />
                          New
                        </Menu.Item>
                        <Menu.Separator />
                        {mappedSites.map((site) => (
                          <Menu.Item
                            key={site.id}
                            href={`/servers/${site.server_id}/${site.commit}`}
                          >
                            <IconChainLink />
                            {site.domain}
                          </Menu.Item>
                        ))}
                      </Menu.Content>
                    </Menu>
                  )}
                </>
              )}
            </SidebarItemPrimitive>
          </SidebarSection>
          {sections.map((section, index) => (
            <SidebarSection key={index} title={section.title}>
              {section.items.map((item, i) => (
                <SidebarItem
                  key={i}
                  href={`/servers/${id}/${item.href}`}
                  activeIcon={item.activeIcon}
                  icon={item.icon}
                  title={item.title}
                />
              ))}
            </SidebarSection>
          ))}
        </SidebarSectionGroup>
        <SidebarDisclosure defaultExpanded>
          <SidebarDisclosureTrigger>
            <IconRefresh />
            <SidebarLabel>Automations</SidebarLabel>
          </SidebarDisclosureTrigger>
          <SidebarDisclosurePanel>
            {automations.map((nav, i) => (
              <SidebarItem
                key={i}
                href={`/servers/${id}/${nav.href}`}
                activeIcon={nav.activeIcon}
                icon={nav.icon}
                title={nav.title}
              />
            ))}
          </SidebarDisclosurePanel>
        </SidebarDisclosure>
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
    <SidebarItemPrimitive href={href} isCurrent={isActive} tooltip={props.title}>
      {Icon && <Icon />}
      <SidebarLabel>{props.title} </SidebarLabel>
    </SidebarItemPrimitive>
  )
}

const sections = [
  {
    title: "Main",
    items: [
      {
        title: "Databases",
        href: "databases",
        icon: IconDatabase,
        activeIcon: IconDatabaseFill,
      },
      {
        title: "Backups",
        href: "backups",
        icon: IconServer,
        activeIcon: IconServerFill,
      },
      {
        title: "Logs",
        href: "logs",
        icon: IconNotes,
        activeIcon: IconNotesFill,
      },
      {
        title: "Settings",
        href: "settings",
        icon: IconGear,
        activeIcon: IconGearFill,
      },
    ],
  },
  {
    title: "Developer Tools",
    items: [
      {
        title: "PHP",
        href: "php",
        icon: IconBrandPhp,
        activeIcon: IconBrandPhp,
      },
      {
        title: "SSH Keys",
        href: "ssh-keys",
        icon: IconKey,
        activeIcon: IconKeyFill,
      },
      {
        title: "Nginx Templates",
        href: "nginx-templates",
        icon: IconNotepad,
        activeIcon: IconNotepadFill,
      },
    ],
  },
  {
    title: "Rules & Monitoring",
    items: [
      {
        title: "Rules",
        href: "rules",
        icon: IconShield,
        activeIcon: IconShieldFill,
      },
      {
        title: "Monitoring",
        href: "monitoring",
        icon: IconPieChart,
        activeIcon: IconPieChartFill,
      },
    ],
  },
]

const automations = [
  {
    title: "Scheduler",
    href: "scheduler",
    icon: IconCalendar2,
    activeIcon: IconCalendar2Fill,
  },
  {
    title: "Daemons",
    href: "daemons",
    icon: IconBolt,
    activeIcon: IconBoltFill,
  },
]
