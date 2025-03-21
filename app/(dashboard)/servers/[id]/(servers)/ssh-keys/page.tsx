import { ListSshKeys } from "@/app/(dashboard)/servers/[id]/(servers)/ssh-keys/partials/list-ssh-keys"
import { Heading } from "ui"

export const metadata = {
  title: "SSH Keys",
  description: "Manage your SSH keys for your servers.",
}

export default function Page() {
  return (
    <>
      <Heading className="sr-only">SSH Keys</Heading>
      <ListSshKeys />
    </>
  )
}
