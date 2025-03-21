"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, TextField } from "ui"

export function WebDirectory() {
  const { submit, loading } = useFormSubmit("Web Directory is updated successfully.")
  return (
    <Card>
      <Card.Header
        title="Web Directory"
        description="You can set the web directory for your site."
      />
      <Form onSubmit={submit}>
        <Card.Content>
          <TextField
            defaultValue="/public"
            label="Web Directory"
            name="web_directory"
            type="text"
            isRequired
          />
        </Card.Content>
        <Card.Footer>
          <Button type="submit" isPending={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
