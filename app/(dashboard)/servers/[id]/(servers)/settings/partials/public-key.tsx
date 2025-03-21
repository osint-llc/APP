import { Snippet } from "@/components/ui/snippet"
import { siteConfig } from "@/resources/site-config"
import { Card } from "ui"

export function PublicKey() {
  return (
    <Card>
      <Card.Header title="Public Key">
        <Card.Description>
          The key below gets added to your server automatically during setup, but sometimes it
          accidentally gets wiped. If that happens, make sure this SSH key is added to both `/home/
          {siteConfig.name}/.ssh/authorized_keys` and `/root/.ssh/authorized_keys` on your server.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Snippet text="ssh-rsa RDvuXatDQdKtD46kUuAHV6CmxxbyVUZHVHRn8pzQNIUqQ15loH5t6FwFcQTPsI0yGuQEphlkF4QsOVQnwDieeY9cpwFXggkG" />
      </Card.Content>
    </Card>
  )
}
