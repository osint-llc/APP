"use client"

import versions from "@/resources/data/php-versions.json"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, Select } from "ui"

export function PhpVersion() {
  const { loading, submit } = useFormSubmit("Default PHP Version is updated successfully.")
  return (
    <Card>
      <Card.Header
        title="Select PHP Version"
        description="You can select the PHP version for your site."
      />
      <Form onSubmit={submit}>
        <Card.Content>
          <Select defaultSelectedKey={1} label="PHP Version">
            <Select.Trigger />
            <Select.List items={versions.filter((item) => item.status === "installed")}>
              {(item) => (
                <Select.Option id={item.id} textValue={item.name}>
                  {item.name}
                </Select.Option>
              )}
            </Select.List>
          </Select>
        </Card.Content>
        <Card.Footer>
          <Button type="submit" isPending={loading}>
            {loading ? "Updating..." : "Update Default PHP Version"}
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
