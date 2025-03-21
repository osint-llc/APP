import { ListServers } from "@/app/(market)/settings/servers/partials/list-servers"
import { ListServersArchived } from "@/app/(market)/settings/servers/partials/list-servers-archived"
import { Heading } from "ui"

export const metadata = {
  title: "Servers",
  description: "Here you can manage your servers. Archive, delete, and more.",
}

export default function Page() {
  return (
    <>
      <Heading>Servers</Heading>
      <ListServers />
      <ListServersArchived />
    </>
  )
}
