"use client"

import { Paginate } from "@/components/paginate"
import _sites from "@/resources/data/sites.json"
import { IconPlus } from "justd-icons"
import { useParams } from "next/navigation"
import { Badge, Card, Link, SearchField, Table, buttonStyles } from "ui"

export function ListSites() {
  const { id } = useParams()
  const sites = _sites.filter((site) => site.server_id === Number(id))
  return (
    <>
      <Card className="rounded-t-none border-0">
        <Card.Header className="flex flex-col gap-2 bg-secondary/50 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-y-1">
            <Card.Title>Sites</Card.Title>
            <Card.Description>List of all sites deployed on the server.</Card.Description>
          </div>
          <div className="flex flex-1 justify-end gap-2">
            <SearchField placeholder="Search sites..." />

            <Link
              className={buttonStyles({ className: "whitespace-nowrap" })}
              href={`/servers/${id}/sites/create`}
            >
              <IconPlus />
              New Site
            </Link>
          </div>
        </Card.Header>
        <Card.Content>
          <Table aria-label="Sites">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column>Domain</Table.Column>
              <Table.Column isRowHeader>Repository</Table.Column>
              <Table.Column>Last Deployed</Table.Column>
              <Table.Column>Commit</Table.Column>
            </Table.Header>
            <Table.Body items={sites} renderEmptyState={() => <Table.Empty />}>
              {(site) => (
                <Table.Row href={`/servers/${site.server_id}/${site.commit}`}>
                  <Table.Cell className="w-0">
                    <span className="tabular-nums">{site.id}</span>
                  </Table.Cell>
                  <Table.Cell>{site.domain}</Table.Cell>
                  <Table.Cell>{site.repo}</Table.Cell>
                  <Table.Cell>{site.last_deployed}</Table.Cell>
                  <Table.Cell>
                    <Badge className="font-mono text-xs">{site.commit}</Badge>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Card.Content>
        <Card.Footer>
          <Paginate />
        </Card.Footer>
      </Card>
    </>
  )
}
