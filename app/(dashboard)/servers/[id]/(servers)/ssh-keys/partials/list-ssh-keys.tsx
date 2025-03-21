"use client"

import { CreateSsh } from "@/app/(dashboard)/servers/[id]/(servers)/ssh-keys/partials/create-ssh"
import sshKeys from "@/resources/data/ssh-keys.json"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, Modal, Table } from "ui"

export function ListSshKeys() {
  const { loading, submit, open, setOpen } = useFormSubmit("Delete SSH Key successfully.")
  return (
    <>
      <Card>
        <Card.Header className="flex gap-2 sm:flex-row sm:justify-between">
          <div className="sm:space-y-1">
            <Card.Title>SSH Keys</Card.Title>
            <Card.Description>Manage your SSH keys for your servers.</Card.Description>
          </div>
          <CreateSsh />
        </Card.Header>
        <Card.Content>
          <Table aria-label="SSH Keys">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Type</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body items={sshKeys} renderEmptyState={() => <Table.Empty />}>
              {(ssh) => (
                <Table.Row>
                  <Table.Cell>{ssh.id}</Table.Cell>
                  <Table.Cell>{ssh.name}</Table.Cell>
                  <Table.Cell>{ssh.type}</Table.Cell>
                  <Table.Cell className="text-right">
                    <Button intent="danger" size="small" onPress={() => setOpen(true)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
      <Modal.Content onOpenChange={setOpen} isOpen={open}>
        <Modal.Header
          title="Delete SSH Key"
          description="Are you sure you want to delete this SSH Key?"
        />
        <Modal.Footer>
          <Modal.Close>Cancel</Modal.Close>
          <Form onSubmit={submit}>
            <Button className="w-full sm:w-auto" intent="danger" type="submit" isPending={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
