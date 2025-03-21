"use client"

import type React from "react"

import { Button, Form, Modal, TextField, Textarea } from "ui"

export function CreateNginxTemplate({
  handleCreate,
  loading,
}: {
  handleCreate: (e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
}) {
  return (
    <Form onSubmit={handleCreate}>
      <Modal.Body>
        <div className="space-y-6">
          <TextField label="Name" name="name" type="text" isRequired />
          <Textarea
            className="min-h-72 font-mono"
            label="Content"
            name="content"
            type="text"
            isRequired
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Close>Cancel</Modal.Close>
        <Button type="submit" isPending={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </Modal.Footer>
    </Form>
  )
}
