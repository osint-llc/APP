"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Choicebox, Form, Label, Modal, Select, TextField, Textarea } from "ui"

export function CreateRule() {
  const { open, setOpen, submit, loading } = useFormSubmit("Rule created successfully.")
  return (
    <div>
      <Button onPress={() => setOpen(true)}>Create Rule</Button>
      <Modal.Content size="2xl" onOpenChange={setOpen} isOpen={open}>
        <Modal.Header title="New Rule" description="" />
        <Form onSubmit={submit} className="flex flex-col">
          <Modal.Body className="space-y-4">
            <Select name="vendor" label="Vendor" isRequired>
              <Select.Trigger />
              <Select.List items={vendors}>
                {(vendor) => (
                  <Select.Option id={vendor.name} textValue={vendor.name}>
                    {vendor.name}
                  </Select.Option>
                )}
              </Select.List>
            </Select>
            <div className="flex gap-6">
              <TextField className="w-full" name="ip_address" label="IP Address" isRequired />
              <TextField className="max-w-xs" name="port" label="Port" isRequired />
            </div>
            <div className="flex flex-col gap-y-1">
              <Label>Determine Rule Type</Label>
              <Choicebox
                layout="grid"
                aria-label="Determine Rule Type"
                selectionMode="single"
                defaultSelectedKeys="allow"
              >
                <Choicebox.Item description="Make any rule for allow request." title="Allow" />
                <Choicebox.Item description="Make any rule for deny request." title="Deny" />
              </Choicebox>
            </div>
            <Textarea name="note" label="Note (Optional)" />
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

export const vendors = [
  { id: 1, name: "Swoole" },
  { id: 2, name: "Amp" },
  { id: 3, name: "RoadRunner" },
  { id: 4, name: "Ratchet" },
  { id: 5, name: "Workerman" },
  { id: 6, name: "Pawl" },
  { id: 7, name: "OpenSwoole" },
  { id: 8, name: "Symfony HttpClient" },
  { id: 9, name: "Clue/ReactPHP-HttpProxy" },
]
