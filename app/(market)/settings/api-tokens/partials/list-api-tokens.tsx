"use client"

import React from "react"

import tokens from "@/resources/data/api-tokens.json"
import { dateFormat } from "@/resources/helpers"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { IconArchive2, IconDotsHorizontal, IconTrash } from "justd-icons"
import { Badge, Button, Card, Form, Menu, Modal, Table } from "ui"

export function ListApiTokens() {
  const [modalState, setModalState] = React.useState<"archive" | "delete" | null>(null)
  const { loading, submit } = useFormSubmit(
    modalState === "archive" ? "Token archived successfully." : "Token deleted successfully.",
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
          title="API Tokens"
          description="Manage your API tokens. Create, revoke, and regenerate them."
        />
        <Card.Content>
          <Table aria-label="List of API Tokens">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Description</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Created At</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body items={tokens}>
              {(item) => (
                <Table.Row>
                  <Table.Cell className="w-0">{item.id}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.note}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      intent={
                        item.status === "active"
                          ? "success"
                          : item.status === "archived"
                            ? "warning"
                            : "secondary"
                      }
                    >
                      {item.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{dateFormat(item.created_at)}</Table.Cell>
                  <Table.Cell className="text-right">
                    <Menu>
                      <Button
                        aria-label="Actions"
                        intent="plain"
                        size="small"
                        className="-mr-1 h-6"
                      >
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
