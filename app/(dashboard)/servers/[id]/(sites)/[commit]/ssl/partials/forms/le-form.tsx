"use client"

import sites from "@/resources/data/sites.json"
import { getModel } from "@/resources/eloquent"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { useParams } from "next/navigation"
import { Button, Form, Heading, TextField } from "ui"

export function LeForm() {
  const params = useParams()
  const site = getModel(sites, "commit", params.commit)
  const { submit, loading } = useFormSubmit("Installing certificate successfully.")
  return (
    <Form onSubmit={submit} className="space-y-6">
      <Heading level={3}>Let's Encrypt</Heading>
      <TextField label="Domain" defaultValue={`${site?.domain},www.${site?.domain}`} isRequired />
      <Button type="submit" isPending={loading}>
        {loading ? "Installing..." : "Install"}
      </Button>
    </Form>
  )
}
