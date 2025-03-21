"use client"

import React from "react"

import { Snippet } from "@/components/ui/snippet"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Checkbox, Form, Modal, TextField, Textarea } from "ui"

export function CreateApiToken() {
  const { loading, submit } = useFormSubmit()
  const [open, setOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    submit(e).then(() => {
      setOpen(true)
    })
  }
  return (
    <>
      <Card>
        <Card.Header
          title="Create API Token"
          description="Create a new API token to access your account."
        />
        <Form onSubmit={handleSubmit}>
          <Card.Content className="space-y-6">
            <TextField isRequired label="Name" name="name" />
            <Textarea label="Note" name="note" />
          </Card.Content>
          <Card.Footer>
            <Button type="submit" isPending={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </Card.Footer>
        </Form>
      </Card>
      <Modal.Content size="2xl" onOpenChange={setOpen} isOpen={open}>
        <Modal.Header
          title="Create API Token"
          description="Create a new API token to access your account."
        />
        <Modal.Body>
          <Snippet text="z00114f73152bd7ccb986632cc70efa1e471b1bfcec6b58c105cc3c3993bb04b" />
          <Checkbox
            isSelected={copied}
            onChange={() => setCopied(!copied)}
            className="mt-2"
            label="I have copied the token"
            description="Make sure to copy the token now. You won’t be able to see it again."
          />
        </Modal.Body>
        <Modal.Footer className="sm:justify-end">
          <Form onSubmit={() => setOpen(false)}>
            <Button isDisabled={!copied} onPress={() => setOpen(false)}>
              Close
            </Button>
          </Form>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
