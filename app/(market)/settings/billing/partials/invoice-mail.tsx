"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, TextField, Textarea } from "ui"

export function InvoiceMail() {
  const { submit, loading } = useFormSubmit("Invoice mail saved successfully.")
  return (
    <Card>
      <Card.Header
        title="Invoice Mail"
        description="Get an email notification when your invoice is due."
      />
      <Form onSubmit={submit}>
        <Card.Content className="space-y-6">
          <TextField isRequired label="Email" name="email" />
          <TextField isRequired label="Name" name="name" />
          <Textarea label="Extra Notes" name="notes" />
        </Card.Content>
        <Card.Footer>
          <Button type="submit" isPending={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
