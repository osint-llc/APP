"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, TextField } from "ui"

export function TransferServer() {
  const { loading, submit } = useFormSubmit()
  return (
    <Card>
      <Card.Header title="Transfer Server" description="Transfer your server to another server." />
      <Form onSubmit={submit}>
        <Card.Content>
          <TextField label="Email" isRequired name="email" type="email" />
        </Card.Content>
        <Card.Footer>
          <Button type="submit" isPending={loading}>
            {loading ? "Sending email..." : "Send email invite to new server."}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
