"use client"

import React from "react"

import { Revealable } from "@/components/ui/reveable"
import _ev from "@/resources/data/ev.json"
import { wait } from "@/resources/helpers"
import { IconDotsHorizontal, IconHighlight, IconTrash } from "justd-icons"
import { toast } from "sonner"
import { Button, Card, Form, Menu, Modal, Table, TextField } from "ui"

type ModalState = "delete" | "edit" | null
export function ListEv() {
  const [ev, setEv] = React.useState(_ev)
  const [modalState, setModalState] = React.useState<ModalState>(null)
  const [currentEv, setCurrentEv] = React.useState(_ev[0])
  const [loadingState, setLoadingState] = React.useState({
    update: false,
    delete: false,
  })

  function deleteEv() {
    setLoadingState((prev) => ({ ...prev, delete: true }))
    wait(1500).then(() => {
      setLoadingState((prev) => ({ ...prev, delete: false }))
      toast.success("Ev deleted successfully.")
      setEv((prev) => prev.filter((item) => item.id !== currentEv.id))
      setModalState(null)
    })
  }

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState((prev) => ({ ...prev, update: true }))
    wait(1000).then(() => {
      setLoadingState((prev) => ({ ...prev, update: false }))
      toast.success("Ev updated successfully.")
      setEv((prev) =>
        prev.map((item) => {
          if (item.id === currentEv.id) {
            return currentEv
          }
          return item
        }),
      )
      setModalState(null)
    })
  }
  return (
    <>
      <Card>
        <Card.Header
          title="Environment Variables"
          description="List of all Environment Variables on the server."
        />
        <Card.Content>
          <Table aria-label="List of Environment Variables">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column isRowHeader>Key</Table.Column>
              <Table.Column>Value</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body items={ev} renderEmptyState={() => <Table.Empty />}>
              {(item) => (
                <Table.Row>
                  <Table.Cell className="w-0">{item.id}</Table.Cell>
                  <Table.Cell>{item.key}</Table.Cell>
                  <Table.Cell>
                    <Revealable>{item.value}</Revealable>
                  </Table.Cell>
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
                        <Menu.Item
                          onAction={() => {
                            setCurrentEv(item)
                            setModalState("edit")
                          }}
                        >
                          <IconHighlight />
                          Edit template
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item
                          isDanger
                          onAction={() => {
                            setCurrentEv(item)
                            setModalState("delete")
                          }}
                        >
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
      <Modal.Content
        size={modalState === "edit" ? "2xl" : "xl"}
        onOpenChange={() => setModalState(null)}
        isOpen={modalState !== null}
      >
        <Modal.Header>
          <Card.Title>
            {modalState === "edit" && "Edit Environment Variable"}
            {modalState === "delete" && "Delete Environment Variable"}
          </Card.Title>
          <Card.Description>
            {modalState === "edit" && "Be careful, you may break your server."}
            {modalState === "delete" &&
              "Are you sure you want to delete this environment variable?"}
          </Card.Description>
        </Modal.Header>
        {modalState === "edit" ? (
          <Form onSubmit={handleUpdate}>
            <Modal.Body className="space-y-4">
              <TextField label="Key" isRequired placeholder="key" defaultValue={currentEv.key} />
              <TextField
                label="Value"
                isRequired
                placeholder="value"
                defaultValue={currentEv.value}
              />
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>Cancel</Modal.Close>
              <Button type="submit" isPending={loadingState.update}>
                {loadingState.update ? "Updating..." : "Update"}
              </Button>
            </Modal.Footer>
          </Form>
        ) : (
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            {modalState === "delete" && (
              <Button onPress={deleteEv} intent="danger" isPending={loadingState.delete}>
                {loadingState.delete ? "Deleting..." : "Delete"}
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal.Content>
    </>
  )
}
