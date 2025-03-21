"use client"

import { IconBrandBitbucket, IconBrandGithub, IconBrandGitlab } from "justd-icons"
import { Button, Card, Form, Link, Select, Switch, TextField, Textarea, buttonStyles } from "ui"

const providers = [
  { id: "github", name: "GitHub", icon: IconBrandGithub },
  { id: "gitlab", name: "GitLab", icon: IconBrandGitlab },
  { id: "bitbucket", name: "Bitbucket", icon: IconBrandBitbucket },
]

export function NewSiteForm() {
  return (
    <Card>
      <Card.Header
        title="New Site"
        description="Create a new site for your application. You can use this site to host your application's code and data."
      />
      <Form onSubmit={(e) => e.preventDefault()}>
        <Card.Content>
          <div className="flex flex-col gap-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField label="Name" name="name" type="text" isRequired />
              <TextField label="Domain" name="domain" type="text" isRequired />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Select label="Provider" name="provider">
                <Select.Trigger />
                <Select.List items={providers}>
                  {(item) => (
                    <Select.Option>
                      <item.icon />
                      {item.name}
                    </Select.Option>
                  )}
                </Select.List>
              </Select>
              <TextField label="Repository URL" name="repo_url" type="text" isRequired />
            </div>
            <Textarea label="Note" name="note" />
            <Switch>Allow Wildcard Certificates</Switch>
            <Switch>Allow Subdomains</Switch>
            <Switch>Allow Force SSL</Switch>
            <Switch>Create database during installation</Switch>
          </div>
        </Card.Content>
        <Card.Footer className="flex justify-between">
          <Link href="/servers/1/sites" className={buttonStyles({ intent: "outline" })}>
            Cancel
          </Link>
          <Button type="submit">Create</Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
