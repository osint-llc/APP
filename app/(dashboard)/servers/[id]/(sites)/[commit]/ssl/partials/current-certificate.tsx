"use client"

import sites from "@/resources/data/sites.json"
import { getModel } from "@/resources/eloquent"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { useParams } from "next/navigation"
import { Button, Card, Form, Modal, Note } from "ui"

export function CurrentCertificate() {
  const params = useParams()
  const site = getModel(sites, "commit", params.commit)
  const { submit, loading, open, setOpen } = useFormSubmit("Certificate is removed successfully.")
  const certificate = {
    id: 1,
    domain: site?.domain,
    issued_by: "Let's Encrypt",
    issued_on: "2024-01-15",
    expires_on: "2024-04-15",
    status: "active",
  }

  return (
    <>
      <Card>
        <Card.Header
          title={certificate.domain}
          description={`${certificate.issued_by} issued on ${certificate.issued_on} expires on ${certificate.expires_on}`}
        />
        <Card.Footer>
          <Button intent="danger" onPress={() => setOpen(true)}>
            Remove Certificate
          </Button>
        </Card.Footer>
      </Card>
      <Modal.Content onOpenChange={setOpen} isOpen={open}>
        <Modal.Header
          title="Remove Certificate"
          description="Are you sure you want to remove this certificate?"
        />
        <Modal.Body>
          <Note className="**:data-[slot=icon]:mt-1" intent="danger">
            This action will remove the certificate from your site and can not be undo.
          </Note>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>Cancel</Modal.Close>
          <Form onSubmit={submit}>
            <Button className="w-full sm:w-auto" intent="danger" type="submit" isPending={loading}>
              {loading ? "Removing..." : "Remove"}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
