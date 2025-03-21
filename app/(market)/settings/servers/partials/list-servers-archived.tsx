"use client"

import servers from "@/resources/data/servers.json"
import { dateFormat } from "@/resources/helpers"
import { Badge, Card, Table } from "ui"

export function ListServersArchived() {
  return (
    <Card>
      <Card.Header
        title="Archive Servers"
        description="These servers have been archived. Unfortunately, you can't delete them."
      />
      <Card.Content>
        <Table aria-label="Servers">
          <Table.Header>
            <Table.Column isRowHeader>ID</Table.Column>
            <Table.Column>Name</Table.Column>
            <Table.Column>IP Address</Table.Column>
            <Table.Column>Location</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Archived At</Table.Column>
          </Table.Header>
          <Table.Body items={servers.filter((server) => server.status === "archived")}>
            {(item) => (
              <Table.Row>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell className="tabular-nums">{item.ip_address}</Table.Cell>
                <Table.Cell>{item.location}</Table.Cell>
                <Table.Cell>
                  <Badge intent={item.status === "active" ? "success" : "warning"}>
                    {item.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{dateFormat(item.created_at)}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  )
}
