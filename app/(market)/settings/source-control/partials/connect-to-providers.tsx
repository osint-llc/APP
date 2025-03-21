"use client"

import { useState } from "react"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { IconBrandBitbucket, IconBrandGithub, IconBrandGitlab } from "justd-icons"
import { toast } from "sonner"
import { Button, Card, Form } from "ui"

export function ConnectToProviders() {
  const { submit } = useFormSubmit()
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const providers = [
    {
      name: "Github",
      icon: <IconBrandGithub className="size-[22px]" />,
      description:
        "GitHub is a developer platform that allows developers to create, store, manage and share their code.",
    },
    {
      name: "Gitlab",
      icon: <IconBrandGitlab className="size-[22px]" />,
      description:
        "GitLab is a web-based platform that helps teams develop, secure, and operate software applications.",
    },
    {
      name: "Bitbucket",
      icon: <IconBrandBitbucket className="size-[22px]" />,
      description:
        "Bitbucket is a web-based platform that helps teams store, manage, and collaborate on code.",
    },
  ]

  function handleSubmit(e: React.FormEvent<HTMLFormElement>, provider: string) {
    e.preventDefault()
    setLoadingProvider(provider) // Set loading for the specific provider
    submit(e).then(() => {
      toast.success(`${provider} connected successfully.`)
      setLoadingProvider(null) // Reset loading after submission completes
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {providers.map(({ description, name, icon }) => (
        <Card key={name}>
          <Card.Header>
            <Card.Title className="flex items-center gap-x-2">
              {icon}
              <span>{name}</span>
            </Card.Title>
            <Card.Description>{description}</Card.Description>
          </Card.Header>
          <Card.Footer>
            <Form onSubmit={(e) => handleSubmit(e, name.toLowerCase())}>
              <Button
                className="w-full"
                type="submit"
                isPending={loadingProvider === name.toLowerCase()}
              >
                {loadingProvider === name.toLowerCase() ? "Connecting..." : "Connect"}
              </Button>
            </Form>
          </Card.Footer>
        </Card>
      ))}
    </div>
  )
}
