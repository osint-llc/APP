"use client"

import React from "react"

import { Snippet } from "@/components/ui/snippet"
import _schedulers from "@/resources/data/schedulers.json"
import { title, wait } from "@/resources/helpers"
import dayjs from "dayjs"
import {
  IconBulletFill,
  IconDotsHorizontal,
  IconHighlight,
  IconRefresh,
  IconTrash,
} from "justd-icons"
import { toast } from "sonner"
import { Badge, Button, Card, Form, Menu, Modal, Select, Table, TextField, Tooltip } from "ui"

import { CreateScheduler } from "./create-scheduler"

type ModalState = "delete" | "edit" | "run" | null

export function ListSchedulers() {
  const [schedulers, setSchedulers] = React.useState(_schedulers)
  const [modalState, setModalState] = React.useState<ModalState>(null)
  const [currentId, setCurrentId] = React.useState(0)
  const [currentScheduler, setCurrentScheduler] = React.useState(_schedulers[0])
  const [selectedKey, setSelectedKey] = React.useState("")
  const [loadingState, setLoadingState] = React.useState({
    running: false,
    run: false,
    update: false,
    delete: false,
  })
  function deleteScheduler() {
    setLoadingState((prev) => ({ ...prev, delete: true }))
    wait(1000).then(() => {
      setLoadingState((prev) => ({ ...prev, delete: false }))
      toast.success("Scheduler deleted successfully.")
      setSchedulers((prev) => prev.filter((item) => item.id !== currentId))
      setModalState(null)
    })
  }

  function handleRun(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState((prev) => ({ ...prev, running: true }))
    wait(1000).then(() => {
      setLoadingState((prev) => ({ ...prev, running: false, run: true }))
      setModalState(null)
    })
    wait(10000).then(() => {
      setLoadingState((prev) => ({ ...prev, run: false }))
      toast.success("Scheduler run successfully.")
    })
  }

  function handleUpdate() {
    setLoadingState((prev) => ({ ...prev, update: true }))
    wait(1000).then(() => {
      setLoadingState((prev) => ({ ...prev, update: false }))
      toast.success("Scheduler updated successfully.")
      setSchedulers((prev) =>
        prev.map((item) => (item.id === currentId ? { ...item, command: item.command } : item)),
      )
      setModalState(null)
    })
  }

  return (
    <>
      <Card>
        <Card.Header className="justify-between gap-2 sm:flex-row">
          <div className="max-w-xl">
            <Card.Title>Schedulers</Card.Title>
            <Card.Description>Manage your schedulers for your server.</Card.Description>
          </div>
          <CreateScheduler />
        </Card.Header>
        <Card.Content>
          <Table aria-label="Schedulers">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Command</Table.Column>
              <Table.Column>Frequency</Table.Column>
              <Table.Column>Cron</Table.Column>
              <Table.Column>User</Table.Column>
              <Table.Column>Next run</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body renderEmptyState={() => <Table.Empty />}>
              {schedulers.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell className="w-0">{item.id}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>
                    <Snippet
                      indicator={
                        loadingState.run &&
                        currentId === item.id && (
                          <Tooltip delay={0}>
                            <Tooltip.Trigger>
                              <Badge
                                shape="square"
                                intent="success"
                                className="-ml-0.5 inline-flex items-center rounded-lg *:data-[slot=icon]:size-3"
                              >
                                <IconBulletFill className="inline animate-pulse text-emerald-500" />{" "}
                                running
                              </Badge>
                            </Tooltip.Trigger>
                            <Tooltip.Content showArrow className="px-3 py-2">
                              <div className="flex items-center gap-x-1.5">
                                <IconBulletFill className="inline size-3 animate-pulse text-emerald-500" />
                                The command is running...
                              </div>
                            </Tooltip.Content>
                          </Tooltip>
                        )
                      }
                      className="**:data-[slot=copy]:-mr-0.5 w-full py-1 pl-2 **:data-[slot=copy]:size-7"
                      text={item.command}
                    />
                  </Table.Cell>
                  <Table.Cell>{item.frequency}</Table.Cell>
                  <Table.Cell>{item.cron}</Table.Cell>
                  <Table.Cell>{item.user}</Table.Cell>
                  <Table.Cell>{dayjs(item.next_run).toNow()}</Table.Cell>
                  <Table.Column className="text-right">
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
                            setCurrentScheduler(item)
                            setModalState("edit")
                            setSelectedKey(item.frequency)
                          }}
                        >
                          <IconHighlight />
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          onAction={() => {
                            setModalState("run")
                            setCurrentId(item.id)
                          }}
                        >
                          <IconRefresh />
                          Run now
                        </Menu.Item>
                        <Menu.Separator />
                        <Menu.Item
                          isDanger
                          onAction={() => {
                            setCurrentId(item.id)
                            setModalState("delete")
                          }}
                        >
                          <IconTrash />
                          Delete
                        </Menu.Item>
                      </Menu.Content>
                    </Menu>
                  </Table.Column>
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
            {modalState === "run" && "Run Scheduler"}
            {modalState === "edit" && "Edit Scheduler"}
            {modalState === "delete" && "Delete Scheduler"}
          </Card.Title>
          <Card.Description>
            {modalState === "run" && "Are you sure you want to run this scheduler?"}
            {modalState === "edit" && "Sometimes you may want to edit this scheduler."}
            {modalState === "delete" && "Are you sure you want to delete this scheduler?"}
          </Card.Description>
        </Modal.Header>
        {modalState === "edit" ? (
          <Form onSubmit={handleUpdate}>
            <Modal.Body>
              <div className="space-y-6">
                <TextField
                  defaultValue={currentScheduler?.command}
                  label="Command"
                  isRequired
                  name="command"
                />
                <TextField
                  defaultValue={currentScheduler?.user}
                  label="User"
                  isRequired
                  name="user"
                />
                <Select
                  label="Frequency"
                  defaultSelectedKey={currentScheduler?.frequency}
                  selectedKey={selectedKey}
                  onSelectionChange={(value) => setSelectedKey(value as string)}
                  isRequired
                  name="frequency"
                >
                  <Select.Trigger />
                  <Select.List
                    items={[
                      { id: "daily", name: "Daily" },
                      { id: "weekly", name: "Weekly" },
                      { id: "monthly", name: "Monthly" },
                      { id: "yearly", name: "Yearly" },
                      { id: "custom", name: "Custom" },
                    ]}
                  >
                    {(item) => <Select.Option>{item.name}</Select.Option>}
                  </Select.List>
                </Select>
                {selectedKey === "custom" && (
                  <div className="grid grid-cols-5 gap-6">
                    <TextField
                      label={title("minute")}
                      isRequired
                      name="minute"
                      defaultValue={currentScheduler.cron.split(" ")[0]}
                    />
                    <TextField
                      label={title("hour")}
                      isRequired
                      name="hour"
                      defaultValue={currentScheduler.cron.split(" ")[1]}
                    />
                    <TextField
                      label={title("day_of_month")}
                      isRequired
                      name="day_of_month"
                      defaultValue={currentScheduler.cron.split(" ")[2] || "*"}
                    />
                    <TextField
                      label={title("month")}
                      isRequired
                      name="month"
                      defaultValue={currentScheduler.cron.split(" ")[3] || "*"}
                    />
                    <TextField
                      label={title("day_of_week")}
                      isRequired
                      name="day_of_week"
                      defaultValue={currentScheduler.cron.split(" ")[4] || "*"}
                    />
                  </div>
                )}
              </div>
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

            {modalState === "run" && (
              <Form onSubmit={handleRun}>
                <Button isPending={loadingState.running} type="submit">
                  Run
                </Button>
              </Form>
            )}
            {modalState === "delete" && (
              <Button onPress={deleteScheduler} intent="danger" isPending={loadingState.delete}>
                {loadingState.delete ? "Deleting..." : "Delete"}
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal.Content>
    </>
  )
}
