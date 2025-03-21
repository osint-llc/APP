"use client"

import sites from "@/resources/data/sites.json"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Form, Heading, Select } from "ui"

export function CloneForm() {
  const { submit, loading } = useFormSubmit("Installing certificate successfully.")
  return (
    <Form onSubmit={submit} className="space-y-6">
      <Heading level={3}>Clone from other</Heading>
      <Select label="Select a site" isRequired>
        <Select.Trigger />
        <Select.List items={sites}>
          {(site) => <Select.Option>{site.domain}</Select.Option>}
        </Select.List>
      </Select>
      <Button type="submit" isPending={loading}>
        {loading ? "Installing..." : "Install"}
      </Button>
    </Form>
  )
}
