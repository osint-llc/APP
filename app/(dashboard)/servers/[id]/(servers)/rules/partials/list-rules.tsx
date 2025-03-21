"use client"

import React from "react"

import {
  CreateRule,
  vendors,
} from "@/app/(dashboard)/servers/[id]/(servers)/rules/partials/create-rule"
import _rules from "@/resources/data/rules.json"
import { dateFormat, wait } from "@/resources/helpers"
import { IconDotsHorizontal, IconHighlight, IconTrash } from "justd-icons"
import { toast } from "sonner"
import {
  Badge,
  Button,
  Card,
  Choicebox,
  Form,
  Label,
  Menu,
  Modal,
  Select,
  Table,
  TextField,
  Textarea,
} from "ui"

export function ListRules() {
  const [modalState, setModalState] = React.useState<"edit" | "delete" | null>(null)
  const [currentRule, setCurrentRule] = React.useState(_rules[0])
  const [loadingState, setLoadingState] = React.useState({
    update: false,
    delete: false,
  })
  const [rules, setRules] = React.useState(_rules)

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState({ ...loadingState, update: true })
    wait(1000).then(() => {
      setLoadingState({ ...loadingState, update: false })
      toast.success("Rule updated.")
      setModalState(null)
    })
  }

  function deleteRule() {
    setLoadingState({ ...loadingState, delete: true })
    wait().then(() => {
      setLoadingState({ ...loadingState, delete: false })
      toast.success("Rule has been deleted.")
      setRules((prev) => prev.filter((rule) => rule.id !== currentRule?.id))
      setModalState(null)
    })
  }

  return (
    <>
      <Card>
        <Card.Header className="flex-col justify-between gap-2 md:flex-row lg:items-center">
          <div className="max-w-md flex-1 space-y-1">
            <Card.Title>Rules</Card.Title>
            <Card.Description>
              Rules are used to filter the servers in your dashboard. You can create rules to filter
              servers by their status, name, or tags.
            </Card.Description>
          </div>
          <CreateRule />
        </Card.Header>
        <Card.Content>
          <Table aria-label="Rules">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column isRowHeader>Vendor</Table.Column>
              <Table.Column>From</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column>Ip Address</Table.Column>
              <Table.Column>Port</Table.Column>
              <Table.Column>Created At</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body items={rules}>
              {(rule) => (
                <Table.Row>
                  <Table.Cell className="w-0">{rule.id}</Table.Cell>
                  <Table.Cell>{rule.vendor}</Table.Cell>
                  <Table.Cell>
                    <Badge>{rule.from}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge intent={rule.type === "allow" ? "success" : "danger"}>{rule.type}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="font-mono text-sm tracking-tight">{rule.ip_address}</div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="tabular-nums">{rule.port}</span>
                  </Table.Cell>
                  <Table.Cell>{dateFormat(rule.created_at)}</Table.Cell>
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
                            setCurrentRule(rule)
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
                            setCurrentRule(rule)
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
            {modalState === "edit" && "Supervisor Config"}
            {modalState === "delete" && "Delete Rule"}
          </Card.Title>
          <Card.Description>
            {modalState === "edit" && "Be careful, you may break your server."}
            {modalState === "delete" && "Are you sure you want to delete this daemon?"}
          </Card.Description>
        </Modal.Header>
        {modalState === "edit" ? (
          <Form onSubmit={handleUpdate} className="flex flex-col">
            <Modal.Body className="space-y-4">
              <Select
                defaultSelectedKey={currentRule?.vendor}
                name="vendor"
                label="Vendor"
                isRequired
              >
                <Select.Trigger />
                <Select.List items={vendors}>
                  {(vendor) => (
                    <Select.Option id={vendor.name} textValue={vendor.name}>
                      {vendor.name}
                    </Select.Option>
                  )}
                </Select.List>
              </Select>
              <div className="flex gap-6">
                <TextField
                  defaultValue={currentRule?.ip_address}
                  className="w-full"
                  name="ip_address"
                  label="IP Address"
                  isRequired
                />
                <TextField
                  defaultValue={currentRule?.port.toString()}
                  className="max-w-xs"
                  name="port"
                  label="Port"
                  isRequired
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <Label>Determine Rule Type</Label>
                <Choicebox
                  layout="grid"
                  aria-label="Determine Rule Type"
                  selectionMode="single"
                  defaultSelectedKeys="allow"
                >
                  <Choicebox.Item description="Make any rule for allow request." title="Allow" />
                  <Choicebox.Item description="Make any rule for deny request." title="Deny" />
                </Choicebox>
              </div>
              <Textarea name="note" label="Note (Optional)" />
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
              <Button onPress={deleteRule} intent="danger" isPending={loadingState.delete}>
                {loadingState.delete ? "Deleting..." : "Delete"}
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal.Content>
    </>
  )
}
