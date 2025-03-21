"use client"

import * as React from "react"

import { wait } from "@/resources/helpers"
import { IconBrandGit, IconBrandGithub, IconBrandGitlab } from "justd-icons"
import { ListBox, ListBoxItem, type ListBoxItemProps, Text } from "react-aria-components"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { Button, Card, Form, Note, TextField } from "ui"

export function UpdateGitRemote() {
  const [loading, setLoading] = React.useState(false)

  function updateGitRemote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    wait(2000).then(() => {
      setLoading(false)
      toast.success("Repository Uninstalled")
    })
  }

  return (
    <Card>
      <Card.Header title="Update Git Remote" />
      <Card.Content>
        <Note intent="default">
          <strong>Note:</strong> This setting sets up the Git remote URL on your server, but don’t
          worry—the site won’t go down or disappear while it’s happening. The updated Git remote has
          to match up with the same repo history as the one already installed. Don’t use this to
          bring in a totally different project. If you want to start fresh with a new project, hit
          the "Uninstall Repository" button below to clear out the current repo first.
        </Note>

        <Form onSubmit={updateGitRemote} className="mt-4 flex flex-col gap-y-4">
          <ListBox
            aria-label="Providers"
            selectedKeys={[1]}
            orientation="horizontal"
            selectionMode="single"
            items={providers}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {(item) => <Item label={item.name} description={item.description} icon={item.icon} />}
          </ListBox>

          <TextField
            isRequired
            defaultValue="irsyadadl/irsyad.co"
            label="Repository"
            name="repository"
          />
          <div className="flex justify-end">
            <Button type="submit" isPending={loading}>
              Update Git Remote
            </Button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  )
}

interface ItemProps<T extends object> extends ListBoxItemProps<T> {
  label: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const Item = <T extends object>({ label, description, icon: Icon, ...props }: ItemProps<T>) => {
  return (
    <ListBoxItem
      textValue={label}
      {...props}
      className={({ isHovered, isFocused }) =>
        twMerge(
          "group flex cursor-pointer rounded-lg border p-6 focus:outline-hidden",
          isHovered && "bg-secondary/30 text-secondary-fg",
          isFocused && "border border-ring bg-accent/10 text-fg ring-4 ring-ring/20",
        )
      }
    >
      <div className="mr-3 grid size-12 shrink-0 place-content-center rounded-full border border-fg/15 bg-fg/10">
        <Icon className="size-6 shrink-0 text-fg" />
      </div>
      <div className="flex flex-col gap-y-1">
        <Text slot="label" className="font-medium lg:text-sm">
          {label}
        </Text>
        <Text slot="description" className="text-muted-fg text-xs group-focus:text-fg">
          {description}
        </Text>
      </div>
    </ListBoxItem>
  )
}

const providers = [
  {
    id: 1,
    name: "Github",
    icon: IconBrandGithub,
    description:
      "GitHub is a developer platform that allows developers to create, store, manage and share their code.",
  },
  {
    id: 2,
    name: "Gitlab",
    icon: IconBrandGitlab,
    description:
      "GitLab is a web-based Git repository that provides free open and private repositories, issue-following capabilities, and wikis.",
  },
  {
    id: 3,
    name: "Custom",
    icon: IconBrandGit,
    description:
      "It is a free and open-source version control system used to handle small to very large projects efficiently.",
  },
]
