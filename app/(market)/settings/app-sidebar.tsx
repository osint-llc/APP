"use client"

import { IconBrandGit, IconCreditCard, IconKey, IconServer, IconSettings } from "justd-icons"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { ListBox } from "ui"

export function AppSidebar() {
  return (
    <div className="flex w-full shrink-0 flex-col md:w-56">
      <ListBox
        aria-label="Menus"
        className="w-full min-w-0 max-w-none rounded-none border-0 p-0 shadow-none"
      >
        <Item href="/settings" icon={IconSettings} label="Settings" />
        <Item href="/settings/api-tokens" icon={IconKey} label="API Tokens" />
        <Item href="/settings/source-control" icon={IconBrandGit} label="Source Control" />
        <Item href="/settings/billing" icon={IconCreditCard} label="Billing" />
        <Item href="/settings/servers" icon={IconServer} label="Servers" />
      </ListBox>
    </div>
  )
}

interface ItemProps extends React.ComponentProps<typeof ListBox.Item> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
}

function Item({ href, label, icon: Icon }: ItemProps) {
  const pathname = usePathname()
  const isActive = href === pathname
  return (
    <ListBox.Item
      textValue={label}
      className={twMerge(
        isActive &&
          "bg-accent text-accent-fg hover:bg-accent/80 hover:text-accent-fg focus-visible:text-fg",
      )}
      href={href}
    >
      <div className="flex items-center gap-x-2">
        <Icon />
        {label}
      </div>
    </ListBox.Item>
  )
}
