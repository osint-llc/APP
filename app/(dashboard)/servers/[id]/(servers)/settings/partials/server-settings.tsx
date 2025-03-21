"use client"

import servers from "@/resources/data/servers.json"
import timezone from "@/resources/data/timezone.json"
import { getModel } from "@/resources/eloquent"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { useParams } from "next/navigation"
import { Button, Card, ComboBox, Form, TextField } from "ui"

export function ServerSettings() {
  const { id } = useParams()
  const server = getModel(servers, "id", Number(id))
  const { loading, submit } = useFormSubmit("The server settings have been updated successfully.")
  return (
    <Card>
      <Card.Header title="Server Settings" description="Manage your server settings." />
      <Form onSubmit={submit}>
        <Card.Content className="space-y-6">
          <TextField
            defaultValue={server?.name}
            label="Server Name"
            isRequired
            name="name"
            type="text"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <TextField
              defaultValue={server?.ip_address}
              label="IP Address"
              isRequired
              name="ip_address"
              type="text"
            />
            <TextField
              label="Private IP Address"
              isRequired
              name="private_ip_address"
              type="text"
            />
            <ComboBox
              label="Timezone"
              isRequired
              name="timezone_id"
              items={timezone}
              defaultSelectedKey={server?.timezone_id}
            >
              <ComboBox.Input />
              <ComboBox.List items={timezone}>
                {(item) => <ComboBox.Option>{item.name}</ComboBox.Option>}
              </ComboBox.List>
            </ComboBox>
          </div>
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
