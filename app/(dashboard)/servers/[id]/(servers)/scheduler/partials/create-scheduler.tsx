import React from "react"

import { title } from "@/resources/helpers"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Form, Modal, Select, TextField } from "ui"

export function CreateScheduler() {
  const { submit, open, setOpen, loading } = useFormSubmit("Scheduler created successfully.")
  const [selectedKey, setSelectedKey] = React.useState("")
  return (
    <div>
      <Button onPress={() => setOpen(true)}>Create Scheduler</Button>
      <Modal.Content size="2xl" onOpenChange={setOpen} isOpen={open}>
        <Modal.Header
          title="Create Scheduler"
          description="Create a new scheduler for your server."
        />
        <Form onSubmit={submit}>
          <Modal.Body>
            <div className="space-y-6">
              <TextField label="Command" isRequired name="command" />
              <TextField label="User" isRequired name="user" />
              <Select
                label="Frequency"
                selectedKey={selectedKey}
                onSelectionChange={(value) => setSelectedKey(value as string)}
                isRequired
                name="frequency"
              >
                <Select.Trigger />
                <Select.List
                  items={[
                    { id: "daily", name: "Daily" },
                    { id: "weekly", name: "Weekly" },
                    { id: "monthly", name: "Monthly" },
                    { id: "yearly", name: "Yearly" },
                    { id: "custom", name: "Custom" },
                  ]}
                >
                  {(item) => <Select.Option>{item.name}</Select.Option>}
                </Select.List>
              </Select>
              {selectedKey === "custom" && (
                <div className="grid grid-cols-5 gap-6">
                  <TextField label={title("minute")} isRequired name="minute" />
                  <TextField label={title("hour")} isRequired name="hour" />
                  <TextField label={title("day_of_month")} isRequired name="day_of_month" />
                  <TextField label={title("month")} isRequired name="month" />
                  <TextField label={title("day_of_week")} isRequired name="day_of_week" />
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            <Button type="submit" isPending={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </div>
  )
}
