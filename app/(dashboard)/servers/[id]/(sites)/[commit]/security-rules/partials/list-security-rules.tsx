"use client"

import React from "react"

import { FormSecurityRule } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/security-rules/partials/form-security-rule"
import { Revealable } from "@/components/ui/reveable"
import _securityRules from "@/resources/data/security-rules.json"
import { wait } from "@/resources/helpers"
import { IconDotsHorizontal, IconHighlight, IconTrash } from "justd-icons"
import { toast } from "sonner"
import { Button, Card, Menu, Modal, Table } from "ui"

type ModalState = "delete" | "edit" | "create" | null

export function ListSecurityRules() {
  const [securityRules, setSecurityRules] = React.useState(_securityRules)
  const [modalState, setModalState] = React.useState<ModalState>(null)
  const [currentId, setCurrentId] = React.useState(0)
  const [currentSecurityRule, setCurrentRedirect] = React.useState(_securityRules[0])
  const [loadingState, setLoadingState] = React.useState({
    update: false,
    delete: false,
    create: false,
  })

  function deleteRedirect() {
    setLoadingState((prev) => ({ ...prev, delete: true }))
    wait(1500).then(() => {
      setLoadingState((prev) => ({ ...prev, delete: false }))
      toast.success("Redirect deleted successfully.")
      setSecurityRules((prev) => prev.filter((item) => item.id !== currentId))
      setModalState(null)
    })
  }

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState((prev) => ({ ...prev, update: true }))
    wait(1000).then(() => {
      setLoadingState((prev) => ({ ...prev, update: false }))
      toast.success("Redirect updated successfully.")
      setSecurityRules((prev) =>
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
      toast.success("Security rule created successfully.")
      setSecurityRules((prev) => [...prev, currentSecurityRule])
      setModalState(null)
    })
  }
  return (
    <>
      <Card>
        <Card.Header className="flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-1">
            <Card.Title>Redirect Rules</Card.Title>
            <Card.Description>
              List of security rules. You can edit, delete, or create new security rules.
            </Card.Description>
          </div>
          <div>
            <Button onPress={() => setModalState("create")}>New redirect rule</Button>
          </div>
        </Card.Header>
        <Card.Content>
          <Table aria-label="List of Redirect Rules">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Path</Table.Column>
              <Table.Column>Username</Table.Column>
              <Table.Column>Password</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body items={securityRules} renderEmptyState={() => <Table.Empty />}>
              {(item) => (
                <Table.Row>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.path}</Table.Cell>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell>
                    <Revealable>{item.password}</Revealable>
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
                            setCurrentRedirect(item)
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
                            setCurrentId(item.id)
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
      <Modal.Content onOpenChange={() => setModalState(null)} isOpen={modalState !== null}>
        <Modal.Header>
          <Card.Title>
            {modalState === "create" && "New Redirect Rule"}
            {modalState === "edit" && "Edit Redirect Rule"}
            {modalState === "delete" && "Delete Redirect Rule"}
          </Card.Title>
          <Card.Description>
            {modalState === "create" && "Create new redirect rule for the existing path."}
            {modalState === "edit" && "Edit existing redirect rule for an existing path."}
            {modalState === "delete" && "Are you sure you want to delete this redirect rule?"}
          </Card.Description>
        </Modal.Header>
        {modalState === "edit" ? (
          <FormSecurityRule
            loadingState={{ update: loadingState.update }}
            submit={handleUpdate}
            current={currentSecurityRule}
          />
        ) : modalState === "create" ? (
          <FormSecurityRule loadingState={{ create: loadingState.create }} submit={handleCreate} />
        ) : (
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>

            {modalState === "delete" && (
              <Button onPress={deleteRedirect} intent="danger" isPending={loadingState.delete}>
                {loadingState.delete ? "Deleting..." : "Delete"}
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal.Content>
    </>
  )
}
