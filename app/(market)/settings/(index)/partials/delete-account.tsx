"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, Modal, Note } from "ui"

export function DeleteAccount() {
  const { loading, open, setOpen, submit } = useFormSubmit(
    "Account is deleted successfully.",
    "/login",
  )
  return (
    <>
      <Card>
        <Card.Header
          title="Delete Account"
          description="Permanently delete your account and all associated data."
        />
        <Card.Content>
          <Note>
            <strong>Note:</strong> Once you delete your account, there is no going back. Please be
            certain.
          </Note>
        </Card.Content>
        <Card.Footer>
          <Button intent="danger" onPress={() => setOpen(true)}>
            Delete Account
          </Button>
        </Card.Footer>
      </Card>
      <Modal.Content onOpenChange={setOpen} isOpen={open}>
        <Modal.Header
          title="Delete Account"
          description="Permanently delete your account and all associated data."
        />
        <Modal.Footer>
          <Modal.Close>Cancel</Modal.Close>
          <Form onSubmit={submit}>
            <Button intent="danger" type="submit" isPending={loading}>
              Yes, Delete Account
            </Button>
          </Form>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
