import type React from "react"

import { Button, Checkbox, CheckboxGroup, Form, Modal, NumberField, TextField } from "ui"

export function NewWorker({
  newWorker,
  loading,
}: {
  newWorker: (e: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
}) {
  return (
    <Form onSubmit={newWorker}>
      <Modal.Body>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <TextField label="Name" name="name" isRequired />
            <NumberField label="Max Retries" name="maxRetries" isRequired />
            <NumberField label="Timeout" name="timeout" isRequired />
            <NumberField label="Concurrency" name="concurrency" isRequired />
            <NumberField label="Max Per Job" name="maxPerJob" isRequired />
          </div>
          <CheckboxGroup label="Priority" name="priority" isRequired>
            <Checkbox value="low" label="Low Priority" name="lowPriority" />
            <Checkbox value="medium" label="Medium Priority" name="mediumPriority" />
            <Checkbox value="high" label="High Priority" name="highPriority" />
          </CheckboxGroup>
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
