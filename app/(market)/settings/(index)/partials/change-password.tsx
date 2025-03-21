"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, TextField } from "ui"

export function ChangePassword() {
  const { loading, submit } = useFormSubmit("Password is updated successfully.")
  return (
    <Card>
      <Card.Header
        title="Change Password"
        description="Update your password to access your account."
      />
      <Form onSubmit={submit}>
        <Card.Content className="space-y-6">
          <TextField isRequired label="Password" name="password" type="password" isRevealable />
          <TextField
            isRequired
            label="New Password"
            name="new_password"
            type="password"
            isRevealable
          />
          <TextField
            isRequired
            label="Confirm New Password"
            name="new_password_confirmation"
            type="password"
            isRevealable
          />
        </Card.Content>
        <Card.Footer>
          <Button type="submit" isPending={loading}>
            Update
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
