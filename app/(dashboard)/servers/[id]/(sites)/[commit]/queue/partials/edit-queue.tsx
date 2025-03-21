import type React from "react"

import type { Queue } from "@/resources/types"
import { Button, Checkbox, CheckboxGroup, Form, Modal, NumberField, TextField } from "ui"

interface Props {
  handleUpdate: (e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
  current: Queue
}

export function EditQueue({ handleUpdate, loading, current }: Props) {
  return (
    <Form onSubmit={handleUpdate}>
      <Modal.Body>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <TextField defaultValue={current?.name} label="Name" name="name" isRequired />
            <NumberField
              defaultValue={current?.maxRetries}
              label="Max Retries"
              name="maxRetries"
              isRequired
            />
            <NumberField
              defaultValue={current?.timeout}
              label="Timeout"
              name="timeout"
              isRequired
            />
            <NumberField
              defaultValue={current?.concurrency}
              label="Concurrency"
              name="concurrency"
              isRequired
            />
            <NumberField
              defaultValue={current?.maxPerJob}
              label="Max Per Job"
              name="maxPerJob"
              isRequired
            />
          </div>
          <CheckboxGroup label="Priority" name="priority" isRequired>
            <Checkbox
              value="low"
              label="Low Priority"
              name="lowPriority"
              isSelected={current?.priority === "low"}
            />
            <Checkbox
              value="medium"
              label="Medium Priority"
              name="mediumPriority"
              isSelected={current?.priority === "medium"}
            />
            <Checkbox
              value="high"
              label="High Priority"
              name="highPriority"
              isSelected={current?.priority === "high"}
            />
          </CheckboxGroup>
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
