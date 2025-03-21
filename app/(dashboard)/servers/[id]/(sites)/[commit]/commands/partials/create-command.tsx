"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, TextField } from "ui"

export function CreateCommand() {
  const { loading, submit } = useFormSubmit("Command is created successfully.")
  return (
    <Card>
      <Card.Header
        title="Create Command"
        description="Create a new command to run on your server."
      />
      <Card.Content>
        <Form className="max-w-xl space-y-4" onSubmit={submit}>
          <TextField
            isRequired
            name="command"
            label="Command"
            placeholder="artisan migrate"
            description="The command to run on your server."
          />
          <Button type="submit" isPending={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </Form>
      </Card.Content>
    </Card>
  )
}
