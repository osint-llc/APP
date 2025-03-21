"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Form, Modal, TextField, Textarea } from "ui"

export function CreateSsh() {
  const { submit, loading, setOpen, open } = useFormSubmit("Server SSH Keys updated successfully.")
  return (
    <div>
      <Button onPress={() => setOpen(true)}>Create SSH Key</Button>
      <Modal.Content onOpenChange={setOpen} isOpen={open}>
        <Modal.Header title="SSH Keys" description="Manage your SSH keys for your servers." />
        <Form onSubmit={submit}>
          <Modal.Body>
            <div className="space-y-6">
              <TextField label="Name" name="name" isRequired />
              <TextField label="User" name="user" isRequired />
              <Textarea className="col-span-full" label="SSH Keys" name="sky_keys" isRequired />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button isPending={loading} type="submit">
              {loading ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </div>
  )
}
