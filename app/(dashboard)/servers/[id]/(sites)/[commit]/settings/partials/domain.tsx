"use client"

import sites from "@/resources/data/sites.json"
import { getModel } from "@/resources/eloquent"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { useParams } from "next/navigation"
import { Button, Card, Form, TextField } from "ui"

export function Domain() {
  const { submit, loading } = useFormSubmit("Domain is updated successfully.")
  const params = useParams()
  return (
    <Card>
      <Card.Header title="Domain" description="You can set the domain for your site." />
      <Form onSubmit={submit}>
        <Card.Content>
          <TextField
            defaultValue={getModel(sites, "commit", params.commit)?.domain}
            label="Domain"
            name="domain"
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
