"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, Select, TextField } from "ui"

export function GitlabSelfHosted() {
  const { loading, submit } = useFormSubmit("Gitlab self-hosted connected successfully.")
  return (
    <Card>
      <Card.Header
        title="Gitlab Self-Hosted"
        description="Connect to your Gitlab self-hosted server."
      />
      <Form onSubmit={submit}>
        <Card.Content className="grid gap-6 sm:grid-cols-2">
          <TextField isRequired label="Base URL" name="url" />
          <TextField isRequired label="Access Token" name="token" />
          <Select isRequired defaultSelectedKey={"v3"} label="Select Version">
            <Select.Trigger />
            <Select.List>
              <Select.Option textValue="Version 2">Version 2</Select.Option>
              <Select.Option textValue="Version 3">Version 3</Select.Option>
              <Select.Option textValue="Version 4">Version 4</Select.Option>
              <Select.Option textValue="Version 5">Version 5</Select.Option>
            </Select.List>
          </Select>
        </Card.Content>
        <Card.Footer>
          <Button type="submit" isPending={loading}>
            {loading ? "Connecting..." : "Connect"}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
