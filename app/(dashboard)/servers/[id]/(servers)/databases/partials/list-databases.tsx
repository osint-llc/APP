"use client"

import drivers from "@/resources/data/database-drivers.json"
import databases from "@/resources/data/databases.json"
import users from "@/resources/data/users.json"
import { getModel } from "@/resources/eloquent"
import { dateFormat } from "@/resources/helpers"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, Modal, Table, TextField } from "ui"

export function ListDatabases() {
  return (
    <Card>
      <Card.Header className="flex flex-col justify-between gap-2 sm:flex-row lg:items-center">
        <div className="flex flex-1 flex-col gap-y-1">
          <Card.Title>Databases</Card.Title>
          <Card.Description>The databases that you have access to.</Card.Description>
        </div>
        <AddDatabase />
      </Card.Header>
      <Card.Content>
        <Table aria-label="Databases">
          <Table.Header>
            <Table.Column className="w-0">ID</Table.Column>
            <Table.Column isRowHeader={true}>Name</Table.Column>
            <Table.Column>User</Table.Column>
            <Table.Column>Driver</Table.Column>
            <Table.Column>Created At</Table.Column>
            <Table.Column />
          </Table.Header>
          <Table.Body items={databases} renderEmptyState={() => <Table.Empty />}>
            {(database) => (
              <Table.Row>
                <Table.Cell className="w-0">{database.id}</Table.Cell>
                <Table.Cell>{database.name}</Table.Cell>
                <Table.Cell>{getModel(users, "id", Number(database.user_id))?.username}</Table.Cell>
                <Table.Cell>{getModel(drivers, "id", Number(database.driver_id))?.name}</Table.Cell>
                <Table.Cell>{dateFormat(database.created_at)}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  )
}

export function AddDatabase() {
  const { loading, open, setOpen, submit } = useFormSubmit("Database added successfully.")
  return (
    <div>
      <Button onPress={() => setOpen(true)}>Add Database</Button>
      <Modal.Content onOpenChange={setOpen} isOpen={open}>
        <Modal.Header title="Add Database" description="Add a new database to your server." />
        <Form onSubmit={submit} className="flex flex-col">
          <Modal.Body className="space-y-4">
            <TextField label="Name" name="name" type="text" isRequired />
            <TextField label="Username" name="username" type="text" isRequired />
            <TextField label="Password" name="password" type="password" isRequired />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            <Button isPending={loading} type="submit">
              Add Database
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </div>
  )
}
