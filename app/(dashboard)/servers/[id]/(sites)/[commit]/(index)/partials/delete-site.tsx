"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { useParams } from "next/navigation"
import { Button, Card, Form, Modal } from "ui"

export function DeleteSite() {
  const params = useParams()
  const { loading, open, setOpen, submit } = useFormSubmit(
    "Site deleted successfully.",
    `/servers/${params.id}/sites`,
  )

  return (
    <>
      <Card>
        <Card.Header
          title="Delete site"
          description="Remove the repository, domain, and all files from the server. This action cannot be undone."
        />
        <Card.Footer>
          <Button onPress={() => setOpen(true)} intent="danger">
            Delete Site
          </Button>
        </Card.Footer>
      </Card>
      <Modal.Content onOpenChange={setOpen} isOpen={open}>
        <Modal.Header
          title="Are you sure?"
          description="Remove the repository, domain, and all files from the server. This action cannot be undone."
        />
        <Modal.Footer>
          <Modal.Close>Cancel</Modal.Close>
          <Form onSubmit={submit}>
            <Button className="w-full sm:w-auto" type="submit" isPending={loading} intent="danger">
              Yes, Delete Site
            </Button>
          </Form>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
