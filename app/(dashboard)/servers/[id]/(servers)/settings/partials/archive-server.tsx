"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { siteConfig } from "@/resources/site-config"
import { Button, Card, Form, Modal, Note } from "ui"

export function ArchiveServer() {
  const { loading, submit, open, setOpen } = useFormSubmit(
    "The server has been archived successfully.",
    "/servers",
  )
  return (
    <>
      <Card>
        <Card.Header title="Archive Server" description="Archive your server to a backup file." />
        <Card.Footer>
          <Button intent="warning" onPress={() => setOpen(true)}>
            Archive
          </Button>
        </Card.Footer>
      </Card>
      <Modal.Content onOpenChange={setOpen} isOpen={open}>
        <Modal.Header>
          <Card.Title>Archive Server</Card.Title>
          <Card.Description>Archive your server to a backup file.</Card.Description>
        </Modal.Header>
        <Modal.Body>
          <Note intent="warning">
            <p className="mb-6">
              This will archive your server to a backup file. This file can be used to restore your
              server at any time.
            </p>
            <p>
              The backup file will be stored in the <code>/home/{siteConfig.name}/backups</code>{" "}
              directory.
            </p>
          </Note>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>Cancel</Modal.Close>
          <Form onSubmit={submit}>
            <Button className="w-full sm:w-auto" intent="warning" type="submit" isPending={loading}>
              {loading ? "Archiving..." : "Archive"}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
