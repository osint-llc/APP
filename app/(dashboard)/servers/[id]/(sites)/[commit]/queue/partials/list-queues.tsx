"use client"

import React from "react"

import _queues from "@/resources/data/queues.json"
import { wait } from "@/resources/helpers"
import { IconDotsHorizontal, IconHighlight, IconTrash } from "justd-icons"
import { toast } from "sonner"
import { Button, Card, Menu, Modal, Table } from "ui"

import { EditQueue } from "./edit-queue"
import { NewWorker } from "./new-worker"

type ModalState = "delete" | "edit" | "create" | null

export function ListQueues() {
  const [queues, setQueues] = React.useState(_queues)
  const [modalState, setModalState] = React.useState<ModalState>(null)
  const [currentId, setCurrentId] = React.useState(0)
  const [currentQueue, setCurrentQueue] = React.useState(_queues[0])
  const [loadingState, setLoadingState] = React.useState({
    update: false,
    delete: false,
    create: false,
  })

  function deleteQueue() {
    setLoadingState((prev) => ({ ...prev, delete: true }))
    wait(1500).then(() => {
      setLoadingState((prev) => ({ ...prev, delete: false }))
      toast.success("Queue deleted successfully.")
      setQueues((prev) => prev.filter((item) => item.id !== currentId))
      setModalState(null)
    })
  }

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState((prev) => ({ ...prev, update: true }))
    wait(1000).then(() => {
      setLoadingState((prev) => ({ ...prev, update: false }))
      toast.success("Queue updated successfully.")
      setQueues((prev) =>
        prev.map((item) => (item.id === currentId ? { ...item, id: item.id } : item)),
      )
      setModalState(null)
    })
  }

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState((prev) => ({ ...prev, create: true }))
    wait(1000).then(() => {
      setLoadingState((prev) => ({ ...prev, create: false }))
      toast.success("Queue created successfully.")
      setQueues((prev) => [...prev, currentQueue])
      setModalState(null)
    })
  }

  return (
    <>
      <Card>
        <Card.Header className="flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-1">
            <Card.Title>Queues</Card.Title>
            <Card.Description>
              The list of queues of the current application. Note that the queues are not created
              automatically, you need to create them manually.
            </Card.Description>
          </div>
          <div>
            <Button onPress={() => setModalState("create")}>New worker</Button>
          </div>
        </Card.Header>
        <Card.Content>
          <Table aria-label="Queues">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Priority</Table.Column>
              <Table.Column>Max Retries</Table.Column>
              <Table.Column>Timeout</Table.Column>
              <Table.Column>Concurrency</Table.Column>
              <Table.Column>Max Per Job</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body items={queues} renderEmptyState={() => <Table.Empty />}>
              {(queue) => (
                <Table.Row key={queue.id}>
                  <Table.Cell>{queue.id}</Table.Cell>
                  <Table.Cell>{queue.name}</Table.Cell>
                  <Table.Cell>{queue.priority}</Table.Cell>
                  <Table.Cell>{queue.maxRetries}</Table.Cell>
                  <Table.Cell>{queue.timeout}</Table.Cell>
                  <Table.Cell>{queue.concurrency}</Table.Cell>
                  <Table.Cell>{queue.maxPerJob}</Table.Cell>
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
                            setCurrentQueue(queue)
                            setModalState("edit")
                          }}
                        >
                          <IconHighlight />
                          Edit
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item
                          isDanger
                          onAction={() => {
                            setCurrentId(queue.id)
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
        size={modalState === "edit" || modalState === "create" ? "2xl" : "lg"}
        onOpenChange={() => setModalState(null)}
        isOpen={modalState !== null}
      >
        <Modal.Header>
          <Card.Title>
            {modalState === "create" && "New Worker"}
            {modalState === "edit" && "Edit Queue"}
            {modalState === "delete" && "Delete Queue"}
          </Card.Title>
          <Card.Description>
            {modalState === "create" && "Create new worker queue."}
            {modalState === "edit" && "Be careful, you may break your server."}
            {modalState === "delete" && "Are you sure you want to delete this running queue?"}
          </Card.Description>
        </Modal.Header>
        {modalState === "edit" ? (
          <EditQueue
            loading={loadingState.update}
            handleUpdate={handleUpdate}
            current={currentQueue}
          />
        ) : modalState === "create" ? (
          <NewWorker loading={loadingState.create} newWorker={handleCreate} />
        ) : (
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>

            {modalState === "delete" && (
              <Button onPress={deleteQueue} intent="danger" isPending={loadingState.delete}>
                {loadingState.delete ? "Deleting..." : "Delete"}
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal.Content>
    </>
  )
}
