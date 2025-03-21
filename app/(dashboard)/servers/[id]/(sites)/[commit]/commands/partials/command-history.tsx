"use client"

import React from "react"

import commandHistory from "@/resources/data/command-history.json"
import { dateFormat, getColor, getColumns, title, wait } from "@/resources/helpers"
import {
  IconCircleCheckFill,
  IconDotsHorizontal,
  IconHighlight,
  IconRefresh,
  IconTrash,
} from "justd-icons"
import { toast } from "sonner"
import { Badge, Button, Card, Loader, Menu, Modal, Table } from "ui"

export function CommandHistory() {
  const [loading, setLoading] = React.useState<{
    isRerunning: Record<number, "idle" | "isRunning" | "done">
    isDeleting: boolean
  }>({
    isRerunning: Object.fromEntries(commandHistory.map((item) => [item.id, "idle"])),
    isDeleting: false,
  })
  const [isOpen, setIsOpen] = React.useState(false)
  const columns = getColumns(commandHistory, "user")

  function deleteCommand() {
    setLoading((prev) => ({ ...prev, isDeleting: true }))
    wait(2000).then(() => {
      setLoading((prev) => ({ ...prev, isDeleting: false }))
      toast.success("Command deleted successfully.")
      setIsOpen(false)
    })
  }

  function reRun(id: number) {
    setLoading((prev) => ({ ...prev, isRerunning: { ...prev.isRerunning, [id]: "isRunning" } }))

    wait(5000).then(() => {
      setLoading((prev) => ({
        ...prev,
        isRerunning: { ...prev.isRerunning, [id]: "done" },
      }))
      toast.success("Command re-run successfully.")

      wait(4000).then(() => {
        setLoading((prev) => ({
          ...prev,
          isRerunning: { ...prev.isRerunning, [id]: "idle" },
        }))
      })
    })
  }

  return (
    <div>
      <Card>
        <Card.Header
          title="Command History"
          description="A list of all commands executed by users."
        />
        <Card.Content>
          <Table aria-label="Command History">
            <Table.Header>
              {columns.map((column) => (
                <Table.Column key={column.name} isRowHeader={column.isRowHeader}>
                  {title(column.name)}
                </Table.Column>
              ))}
              <Table.Column />
            </Table.Header>
            <Table.Body renderEmptyState={() => <Table.Empty />}>
              {commandHistory.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.user}</Table.Cell>
                  <Table.Cell>{item.command}</Table.Cell>
                  <Table.Cell>{dateFormat(item.ran)}</Table.Cell>
                  <Table.Cell>{item.duration}</Table.Cell>
                  <Table.Cell>
                    {loading.isRerunning[item.id] === "isRunning" && (
                      <Badge intent="secondary">
                        <Loader size="extra-small" /> running
                      </Badge>
                    )}
                    {loading.isRerunning[item.id] === "done" && (
                      <Badge intent="success">
                        <IconCircleCheckFill /> Finished
                      </Badge>
                    )}
                    {loading.isRerunning[item.id] === "idle" && (
                      <Badge intent={getColor(item.status)}>{title(item.status)}</Badge>
                    )}
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
                        <Menu.Item onAction={() => reRun(item.id)}>
                          <IconRefresh />
                          Re-run
                        </Menu.Item>
                        <Menu.Item>
                          <IconHighlight />
                          Edit
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item onAction={() => setIsOpen(true)}>
                          <IconTrash />
                          Delete
                        </Menu.Item>
                      </Menu.Content>
                    </Menu>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>

      <Modal.Content isDismissable={false} onOpenChange={setIsOpen} isOpen={isOpen}>
        <Modal.Header
          title="Delete Command"
          description="Are you sure you want to delete this command?"
        />
        <Modal.Footer>
          <Modal.Close onPress={() => setIsOpen(false)}>Cancel</Modal.Close>
          <Button isPending={loading.isDeleting} intent="danger" onPress={deleteCommand}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </div>
  )
}
