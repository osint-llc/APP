"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, TextField } from "ui"

export function InvitePeople() {
  const { submit, loading } = useFormSubmit("The invitation has been sent successfully.")
  return (
    <Card>
      <Card.Header
        title="Invite People"
        description="Invite people to your team. Learn more about invitations."
      />
      <Form onSubmit={submit}>
        <Card.Content>
          <TextField type="email" label="Email" name="email" isRequired />
        </Card.Content>
        <Card.Footer>
          <Button type="submit" isPending={loading}>
            {loading ? "Sending..." : "Send Invitation"}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
