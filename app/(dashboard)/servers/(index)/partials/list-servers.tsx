"use client"

import React, { Suspense } from "react"

import { CreateServerForm } from "@/app/(dashboard)/servers/(index)/partials/create-server-form"
import { Search } from "@/app/(dashboard)/servers/(index)/partials/search"
import _servers from "@/resources/data/servers.json"
import { dateFormat } from "@/resources/helpers"
import { IconPlus } from "justd-icons"
import { useSearchParams } from "next/navigation"
import { ListBox, ListBoxItem } from "react-aria-components"
import { Badge, Button, Card, DetailLine, Heading } from "ui"

export function ListServers() {
  const [servers, setServers] = React.useState(_servers)
  const [open, setOpen] = React.useState(false)
  const searchParams = useSearchParams()
  React.useEffect(() => {
    const query = searchParams.get("query")
    if (query) {
      setServers(
        _servers.filter((server) => server.name.toLowerCase().includes(query.toLowerCase())),
      )
    }

    return () => {
      setServers(_servers)
    }
  }, [searchParams])

  return (
    <>
      <CreateServerForm isOpen={open} setIsOpen={setOpen} />
      <div className="mb-6 flex items-center justify-between gap-1.5">
        <Search {...{ servers, setServers }} placeholder="Search servers..." />

        <div className="flex items-center gap-2">
          <Button intent="outline" className="whitespace-nowrap" onPress={() => setOpen(!open)}>
            <IconPlus />
            Create Server
          </Button>
        </div>
      </div>
      <Suspense>
        <ListBox
          aria-label="Server list in grid"
          layout="grid"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          items={servers}
        >
          {(server) => (
            <ListBoxItem
              className="group cursor-pointer focus:outline-hidden"
              href={`/servers/${server.id}/sites`}
              textValue={server.name}
            >
              <Card className="group relative flex flex-col gap-y-4 p-6 transition-colors duration-300 group-focus-visible:border-secondary-fg/20 group-focus-visible:bg-secondary group-data-hovered:border-secondary-fg/10 group-data-hovered:bg-secondary/50">
                <div className="flex items-center justify-between">
                  <Heading level={2}>{server.name}</Heading>
                  <Badge intent={server.status === "active" ? "success" : "warning"}>
                    {server.status}
                  </Badge>
                </div>
                <DetailLine>
                  <DetailLine.Item label="Name" description={server.name} />
                  <DetailLine.Item>
                    <DetailLine.Label className="tabular-nums">IP Address</DetailLine.Label>
                    <DetailLine.Description className="tabular-nums">
                      {server.ip_address}
                    </DetailLine.Description>
                  </DetailLine.Item>
                  <DetailLine.Item label="Location" description={server.location} />
                  <DetailLine.Item label="OS" description={server.os} />
                  <DetailLine.Item label="CPU" description={server.cpu} />
                  <DetailLine.Item label="Memory" description={server.memory} />
                  <DetailLine.Item label="Disk" description={server.disk} />
                  <DetailLine.Item label="Created At" description={dateFormat(server.created_at)} />
                </DetailLine>
              </Card>
            </ListBoxItem>
          )}
        </ListBox>
      </Suspense>
    </>
  )
}
