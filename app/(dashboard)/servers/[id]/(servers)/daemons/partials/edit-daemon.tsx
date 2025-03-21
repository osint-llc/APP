import type React from "react"

import { Editable } from "@/components/ui/editable"
import type { Daemon } from "@/resources/types"
import { Button, Form, Modal } from "ui"

export function EditDaemon({
  handleUpdate,
  loading,
  current,
}: {
  handleUpdate: (e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
  current: Daemon
}) {
  return (
    <Form onSubmit={handleUpdate}>
      <Modal.Body>
        <Editable>{current.content}</Editable>
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
