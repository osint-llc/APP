"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { siteConfig } from "@/resources/site-config"
import { Button, Card, Form, Note, Select } from "ui"

export function DeployBranch() {
  const { loading, submit } = useFormSubmit("Branch is updated successfully.")
  return (
    <Card>
      <Card.Header title="Deployment Branch" description="Branch to deploy on your server" />
      <Card.Content>
        <Note className="max-w-xl">
          <strong>Note:</strong> {siteConfig.name} relies on this branch to fetch the latest commit
          details when deploying your app. Make sure this branch aligns with both your deployment
          script and the branch currently deployed on your server.
        </Note>
        <Form onSubmit={submit} className="mt-4 max-w-xl space-y-4">
          <Select label="Branch" defaultSelectedKey="main">
            <Select.Trigger />
            <Select.List>
              <Select.Option id="main" textValue="main">
                main
              </Select.Option>
              <Select.Option id="staging" textValue="staging">
                staging
              </Select.Option>
              <Select.Option id="testing" textValue="testing">
                testing
              </Select.Option>
            </Select.List>
          </Select>
          <div>
            <Button type="submit" isPending={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  )
}
