"use client"

import React from "react"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { siteConfig } from "@/resources/site-config"
import { Button, Card, Form } from "ui"

export function QuickDeploy() {
  const [enabled, setEnabled] = React.useState(false)
  const { loading, submit } = useFormSubmit("Quick Deploy is updated successfully.")
  return (
    <Card>
      <Card.Header>
        <Card.Title>Quick Deploy</Card.Title>
        <Card.Description className="max-w-2xl">
          Quick deploy lets you launch projects instantly whenever you push to source control.
          Simply push to this app’s deploy branch, and {siteConfig.name} will pull your latest code
          and smoothly run your deploy script.
        </Card.Description>
      </Card.Header>
      <Card.Footer className="justify-between">
        <Form
          onSubmit={(e) => {
            submit(e).then(() => {
              setEnabled(!enabled)
            })
          }}
        >
          <Button type="submit" intent={enabled ? "danger" : "primary"} isPending={loading}>
            {enabled ? "Disable Quick Deploy" : "Enable Quick Deploy"}
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  )
}
