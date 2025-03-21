"use client"

import React from "react"

import { Editable } from "@/components/ui/editable"
import { Snippet } from "@/components/ui/snippet"
import _daemons from "@/resources/data/daemons.json"
import { wait } from "@/resources/helpers"
import { IconDotsHorizontal, IconFolder, IconHighlight, IconPower, IconTrash } from "justd-icons"
import { toast } from "sonner"
import { Badge, Button, Card, Form, Loader, Menu, Modal, Table } from "ui"

import { CreateDaemon } from "./create-daemon"

type ModalState = "delete" | "edit" | "restart" | null

export function ListDaemons() {
  const [daemons, setDaemons] = React.useState(_daemons)
  const [modalState, setModalState] = React.useState<ModalState>(null)
  const [currentId, setCurrentId] = React.useState(0)
  const [currentDaemon, setCurrentDaemon] = React.useState(_daemons[0])
  const [loadingState, setLoadingState] = React.useState({
    restarting: false,
    restart: false,
    update: false,
    delete: false,
  })

  function deleteDaemon() {
    setLoadingState((prev) => ({ ...prev, delete: true }))
    wait(1500).then(() => {
      setLoadingState((prev) => ({ ...prev, delete: false }))
      toast.success("Daemon deleted successfully.")
      setDaemons((prev) => prev.filter((item) => item.id !== currentId))
      setModalState(null)
    })
  }

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState((prev) => ({ ...prev, update: true }))
    wait(1000).then(() => {
      setLoadingState((prev) => ({ ...prev, update: false }))
      toast.success("Daemon updated successfully.")
      setDaemons((prev) =>
        prev.map((item) => (item.id === currentId ? { ...item, command: item.command } : item)),
      )
      setModalState(null)
    })
  }

  function handleRestart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState((prev) => ({ ...prev, restarting: true }))
    wait(1000).then(() => {
      setLoadingState((prev) => ({ ...prev, restarting: false, restart: true }))
      setModalState(null)
      wait(5000).then(() => {
        setLoadingState((prev) => ({ ...prev, restart: false }))

        if (_daemons.find((item) => item.id === currentId)?.status === "stopped") {
          toast.error("There was an error while restarting the daemon.")
        } else {
          setDaemons((prev) =>
            prev.map((item) => (item.id === currentId ? { ...item, status: "running" } : item)),
          )
          toast.success("Daemon restarted successfully.")
        }
      })
    })
  }

  return (
    <>
      <Card>
        <Card.Header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <Card.Title>Daemons</Card.Title>
            <Card.Description>List of all daemons on the server.</Card.Description>
          </div>
          <CreateDaemon />
        </Card.Header>
        <Card.Content>
          <Table aria-label="Daemons">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column isRowHeader>Command</Table.Column>
              <Table.Column>Directory</Table.Column>
              <Table.Column>User</Table.Column>
              <Table.Column>P</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body renderEmptyState={() => <Table.Empty />}>
              {daemons.map((daemon) => (
                <Table.Row key={daemon.id}>
                  <Table.Cell className="w-0">{daemon.id}</Table.Cell>
                  <Table.Cell>
                    <Snippet
                      className="**:data-[slot=copy]:-mr-0.5 w-full py-1 pl-2 **:data-[slot=copy]:size-7"
                      text={daemon.command}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-x-1 font-mono tracking-tight">
                      <IconFolder /> {daemon.directory}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{daemon.user}</Table.Cell>
                  <Table.Cell>{daemon.processes.length}</Table.Cell>
                  <Table.Cell>
                    {loadingState.restart && currentId === daemon.id ? (
                      <Badge>
                        <Loader />
                        Restarting
                      </Badge>
                    ) : (
                      <Badge intent={daemon.status === "running" ? "success" : "danger"}>
                        {daemon.status}
                      </Badge>
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
                        <Menu.Item
                          onAction={() => {
                            setCurrentDaemon(daemon)
                            setModalState("edit")
                          }}
                        >
                          <IconHighlight />
                          Supervisor Config
                        </Menu.Item>
                        <Menu.Item
                          onAction={() => {
                            setCurrentId(daemon.id)
                            setModalState("restart")
                          }}
                        >
                          <IconPower />
                          Restart
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item
                          isDanger
                          onAction={() => {
                            setCurrentId(daemon.id)
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
              ))}
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
            {modalState === "restart" && "Restart Daemon"}
            {modalState === "edit" && "Supervisor Config"}
            {modalState === "delete" && "Delete Daemon"}
          </Card.Title>
          <Card.Description>
            {modalState === "restart" && "Are you sure you want to restart this daemon?"}
            {modalState === "edit" && "Be careful, you may break your server."}
            {modalState === "delete" && "Are you sure you want to delete this daemon?"}
          </Card.Description>
        </Modal.Header>
        {modalState === "edit" ? (
          <Form onSubmit={handleUpdate}>
            <Modal.Body>
              <Editable>{currentDaemon.content}</Editable>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Close>Cancel</Modal.Close>
              <Button className="w-full sm:w-auto" type="submit" isPending={loadingState.update}>
                {loadingState.update ? "Updating..." : "Update"}
              </Button>
            </Modal.Footer>
          </Form>
        ) : (
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>

            {modalState === "restart" && (
              <Form onSubmit={handleRestart}>
                <Button
                  className="w-full sm:w-auto"
                  isPending={loadingState.restarting}
                  type="submit"
                >
                  {loadingState.restarting ? "Restarting..." : "Restart"}
                </Button>
              </Form>
            )}
            {modalState === "delete" && (
              <Button onPress={deleteDaemon} intent="danger" isPending={loadingState.delete}>
                {loadingState.delete ? "Deleting..." : "Delete"}
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal.Content>
    </>
  )
}
