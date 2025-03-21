"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { useParams } from "next/navigation"
import { Button, Card, Form, Modal } from "ui"

export function UninstallRepository() {
  const params = useParams()
  const { loading, open, setOpen, submit } = useFormSubmit(
    "Repository uninstalled successfully.",
    `/servers/${params.id}/sites`,
  )
  return (
    <>
      <Card>
        <Card.Header
          title="Uninstall Repository"
          description="Removing a repo takes the site back to its OG state, showing default page. All files in the site’s folder? Gone."
        />
        <Card.Footer>
          <Button onPress={() => setOpen(true)} intent="danger">
            Uninstall Repository
          </Button>
        </Card.Footer>
      </Card>
      <Modal.Content isOpen={open} onOpenChange={setOpen}>
        <Modal.Header
          title="Are you sure?"
          description="When you uninstall a repository, all files in the site’s folder will be deleted. This action cannot be undone."
        />
        <Modal.Footer>
          <Modal.Close>Cancel</Modal.Close>
          <Form onSubmit={submit}>
            <Button className="w-full sm:w-auto" type="submit" isPending={loading} intent="danger">
              Uninstall Repository
            </Button>
          </Form>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
