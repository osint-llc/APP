"use client"

import drivers from "@/resources/data/database-drivers.json"
import databases from "@/resources/data/databases.json"
import users from "@/resources/data/users.json"
import { countBy, getAllModelBy, getModel } from "@/resources/eloquent"
import { dateFormat, pluralize } from "@/resources/helpers"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, DetailLine, Form, Modal, Table, TextField, Tooltip } from "ui"

export function ListDatabaseUsers() {
  return (
    <Card>
      <Card.Header className="flex flex-col justify-between gap-2 sm:flex-row lg:items-center">
        <div className="flex flex-1 flex-col gap-y-1">
          <Card.Title>Users</Card.Title>
          <Card.Description>The users that have access to your database.</Card.Description>
        </div>
        <AddDatabaseUser />
      </Card.Header>
      <Card.Content>
        <Table aria-label="Database Users">
          <Table.Header>
            <Table.Column className="w-0">ID</Table.Column>
            <Table.Column isRowHeader={true}>Username</Table.Column>
            <Table.Column>Databases</Table.Column>
            <Table.Column>Created At</Table.Column>
            <Table.Column />
          </Table.Header>
          <Table.Body items={users} renderEmptyState={() => <Table.Empty />}>
            {(user) => (
              <Table.Row>
                <Table.Cell className="w-0">{user.id}</Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>
                  <Tooltip>
                    <Tooltip.Trigger>
                      {countBy(databases, "user_id", user.id)}{" "}
                      {pluralize("Database", countBy(databases, "user_id", user.id))}
                    </Tooltip.Trigger>
                    <Tooltip.Content showArrow placement="right" className="min-w-56">
                      <DetailLine gap={2}>
                        {getAllModelBy(databases, "user_id", Number(user.id)).map((u) => (
                          <DetailLine.Item
                            key={u.id}
                            label={u.name}
                            description={getModel(
                              drivers,
                              "id",
                              u.driver_id,
                            )?.name.toLocaleLowerCase()}
                          />
                        ))}
                      </DetailLine>
                    </Tooltip.Content>
                  </Tooltip>
                </Table.Cell>
                <Table.Cell>{dateFormat(user.created_at)}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  )
}

export function AddDatabaseUser() {
  const { loading, open, setOpen, submit } = useFormSubmit("Database user added successfully.")

  return (
    <div>
      <Button onPress={() => setOpen(true)}>Add User</Button>
      <Modal.Content isOpen={open} onOpenChange={setOpen}>
        <Modal.Header title="Add Database User" description="Add a new user to your database." />
        <Form onSubmit={submit}>
          <Modal.Body className="space-y-4">
            <TextField label="Username" name="username" type="text" isRequired />
            <TextField label="Password" name="password" type="password" isRequired />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            <Button isPending={loading} type="submit">
              Add User
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </div>
  )
}
