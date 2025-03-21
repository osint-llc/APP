"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form } from "ui"

export function CurrentConnectedAccount() {
  const { loading, submit } = useFormSubmit("Account unlinked successfully.")
  return (
    <Card>
      <Card.Header>
        <Card.Title level={2}>Current Connected Account</Card.Title>
        <Card.Description>
          You are currently connected to <strong className="text-fg">Azure</strong>. You can switch
          to another provider by clicking the
        </Card.Description>
      </Card.Header>
      <Card.Footer>
        <Form onSubmit={submit}>
          <Button type="submit" intent="danger" isPending={loading}>
            Unlink Account
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  )
}
