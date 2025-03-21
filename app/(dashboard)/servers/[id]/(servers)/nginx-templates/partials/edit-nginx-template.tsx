import type React from "react"

import type { Template } from "@/resources/types"
import { Button, Form, Modal, TextField, Textarea } from "ui"

export function EditNginxTemplate({
  handleUpdate,
  loading,
  current,
}: {
  handleUpdate: (e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
  current: Template
}) {
  return (
    <Form onSubmit={handleUpdate}>
      <Modal.Body>
        <div className="space-y-6">
          <TextField label="Name" name="name" type="text" isRequired defaultValue={current.name} />
          <Textarea
            className="min-h-72 font-mono"
            label="Content"
            name="content"
            type="text"
            isRequired
            defaultValue={current.content}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Close>Cancel</Modal.Close>
        <Button type="submit" isPending={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </Modal.Footer>
    </Form>
  )
}
