"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { useListData } from "@react-stately/data"
import { Button, Card, Form, TagField } from "ui"

export function Tags() {
  const { submit, loading } = useFormSubmit("Tags are updated successfully.")
  const selectedItems = useListData({
    initialItems: [
      {
        id: 1,
        name: "Laravel",
      },
    ],
  })
  return (
    <Card>
      <Card.Header
        title="Tags"
        description="This tag is used to group your site with other sites."
      />
      <Form onSubmit={submit}>
        <Card.Content>
          <TagField description="Separate tags with a comma." name="tags" list={selectedItems} />
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
