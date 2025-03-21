"use client"

import React from "react"

import servers from "@/resources/data/servers.json"
import { dateFormat } from "@/resources/helpers"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { IconArchive2, IconDotsHorizontal, IconTrash } from "justd-icons"
import { Badge, Button, Card, Form, Menu, Modal, Table } from "ui"

export function ListServers() {
  const [modalState, setModalState] = React.useState<"archive" | "delete" | null>(null)
  const { loading, submit } = useFormSubmit(
    modalState === "archive" ? "Server archived successfully." : "Server deleted successfully.",
  )

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    submit(e).then(() => {
      setModalState(null)
    })
  }

  return (
    <>
      <Card>
        <Card.Header
          title="Current Servers"
          description="Here you can manage your servers. Archive, delete, and more."
        />
        <Card.Content>
          <Table aria-label="Servers">
            <Table.Header>
              <Table.Column isRowHeader>ID</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>IP Address</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Created At</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body items={servers.filter((server) => server.status === "active")}>
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
                  <Table.Cell className="text-right">
                    <Menu>
                      <Button intent="plain" size="small" className="-mr-1 h-6">
                        <IconDotsHorizontal />
                      </Button>
                      <Menu.Content placement="right top">
                        <Menu.Item onAction={() => setModalState("archive")}>
                          <IconArchive2 />
                          Archive
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item isDanger onAction={() => setModalState("delete")}>
                          <IconTrash />
                          Delete
                        </Menu.Item>
                      </Menu.Content>
                    </Menu>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
      <Modal.Content onOpenChange={() => setModalState(null)} isOpen={modalState !== null}>
        <Modal.Header
          title={modalState === "archive" ? "Archive API Token" : "Delete API Token"}
          description={
            modalState === "archive"
              ? "Are you sure you want to archive this API token?"
              : "Are you sure you want to delete this API token?"
          }
        />
        <Modal.Footer>
          <Modal.Close onPress={() => setModalState(null)}>Cancel</Modal.Close>
          <Form onSubmit={handleSubmit}>
            <Button
              isPending={loading}
              type="submit"
              intent={modalState === "archive" ? "warning" : "danger"}
            >
              {modalState === "archive" ? "Archive" : "Delete"}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
