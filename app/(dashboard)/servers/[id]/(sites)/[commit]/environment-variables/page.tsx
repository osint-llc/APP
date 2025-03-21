import { CreateEv } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/environment-variables/partials/create-ev"
import { InvitePeople } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/environment-variables/partials/invite-people"
import { ListEv } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/environment-variables/partials/list-ev"
import { Heading } from "ui"

export const metadata = {
  title: "Environment Variables",
}
export default function Page() {
  return (
    <>
      <Heading className="sr-only">Environment Variables</Heading>
      <CreateEv />
      <InvitePeople />
      <ListEv />
    </>
  )
}
