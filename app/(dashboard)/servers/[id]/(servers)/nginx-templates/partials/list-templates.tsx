"use client"

import React from "react"

import _templates from "@/resources/data/nginx-templates.json"
import { dateFormat, wait } from "@/resources/helpers"
import { IconDotsHorizontal, IconHighlight, IconTrash } from "justd-icons"
import { toast } from "sonner"
import { Button, Card, Menu, Modal, Table } from "ui"

import { CreateNginxTemplate } from "./create-nginx-template"
import { EditNginxTemplate } from "./edit-nginx-template"

type ModalState = "delete" | "edit" | "create" | null

export function ListTemplates() {
  const [templates, setTemplates] = React.useState(_templates)
  const [modalState, setModalState] = React.useState<ModalState>(null)
  const [currentId, setCurrentId] = React.useState(0)
  const [currentTemplate, setCurrentTemplate] = React.useState(_templates[0])
  const [loadingState, setLoadingState] = React.useState({
    update: false,
    delete: false,
    create: false,
  })

  function deleteTemplate() {
    setLoadingState((prev) => ({ ...prev, delete: true }))
    wait(1500).then(() => {
      setLoadingState((prev) => ({ ...prev, delete: false }))
      toast.success("Template deleted successfully.")
      setTemplates((prev) => prev.filter((item) => item.id !== currentId))
      setModalState(null)
    })
  }

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingState((prev) => ({ ...prev, update: true }))
    wait(1000).then(() => {
      setLoadingState((prev) => ({ ...prev, update: false }))
      toast.success("Template updated successfully.")
      setTemplates((prev) =>
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
      toast.success("Template created successfully.")
      setTemplates((prev) => [...prev, currentTemplate])
      setModalState(null)
    })
  }

  return (
    <>
      <Card>
        <Card.Header className="flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-1">
            <Card.Title>Nginx Templates</Card.Title>
            <Card.Description>
              List of Nginx templates. You can edit, delete, or create new templates.
            </Card.Description>
          </div>
          <div>
            <Button onPress={() => setModalState("create")}>Create Template</Button>
          </div>
        </Card.Header>
        <Card.Content>
          <Table aria-label="List of Nginx Templates">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Created At</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body items={templates} renderEmptyState={() => <Table.Empty />}>
              {(item) => (
                <Table.Row>
                  <Table.Cell className="w-0">{item.id}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
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
                        <Menu.Item
                          onAction={() => {
                            setCurrentTemplate(item)
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
      <Modal.Content
        size={modalState === "edit" ? "3xl" : "xl"}
        onOpenChange={() => setModalState(null)}
        isOpen={modalState !== null}
      >
        <Modal.Header>
          <Card.Title>
            {modalState === "create" && "New Template"}
            {modalState === "edit" && "Edit Template"}
            {modalState === "delete" && "Delete Template"}
          </Card.Title>
          <Card.Description>
            {modalState === "create" && "Make a new template for your Nginx configuration."}
            {modalState === "edit" && "Edit default Nginx template."}
            {modalState === "delete" && "Are you sure you want to delete this template?"}
          </Card.Description>
        </Modal.Header>
        {modalState === "edit" ? (
          <EditNginxTemplate
            loading={loadingState.update}
            handleUpdate={handleUpdate}
            current={currentTemplate}
          />
        ) : modalState === "create" ? (
          <CreateNginxTemplate loading={loadingState.create} handleCreate={handleCreate} />
        ) : (
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>

            {modalState === "delete" && (
              <Button onPress={deleteTemplate} intent="danger" isPending={loadingState.delete}>
                {loadingState.delete ? "Deleting..." : "Delete"}
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal.Content>
    </>
  )
}
