"use client"

import servers from "@/resources/data/servers.json"
import { getModel } from "@/resources/eloquent"
import { title } from "@/resources/helpers"
import { usePathname } from "next/navigation"
import { Breadcrumbs } from "ui"

function isNumeric(value: string): boolean {
  return !Number.isNaN(Number(value))
}

export function InternalBreadcrumb(props: React.ComponentProps<"nav">) {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter((segment) => segment)

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`
    let label: string | number | undefined = segment.charAt(0).toUpperCase() + segment.slice(1)
    if (isNumeric(label)) {
      label = getModel(servers, "id", +label!)?.name
    }
    return { href, label }
  })

  return (
    <nav aria-label="breadcrumb" {...props}>
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
        {breadcrumbs.map((breadcrumb, index) => (
          <Breadcrumbs.Item href={breadcrumb.href} key={index}>
            {title(breadcrumb.label || "")}
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
    </nav>
  )
}
