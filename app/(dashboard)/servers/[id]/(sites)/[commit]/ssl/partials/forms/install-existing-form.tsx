"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Form, Heading, Textarea } from "ui"

export function InstallExistingForm() {
  const { submit, loading } = useFormSubmit("Installing certificate successfully.")
  return (
    <Form onSubmit={submit} className="space-y-6">
      <Heading level={3}>Install Existing Certificate</Heading>
      <Textarea label="Certificate" placeholder="Paste your certificate here." isRequired />
      <Textarea label="Private Key" placeholder="Paste your private key here." isRequired />
      <Button type="submit" isPending={loading}>
        {loading ? "Installing..." : "Install"}
      </Button>
    </Form>
  )
}
