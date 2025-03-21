import { ListSchedulers } from "@/app/(dashboard)/servers/[id]/(servers)/scheduler/partials/list-schedulers"
import { Heading } from "ui"

export const metadata = {
  title: "Scheduler",
  description:
    "Handle all your server’s scheduling in one spot set up backups, maintenance, and whatever else you need, all easy-peasy.",
}

export default function Page() {
  return (
    <>
      <Heading className="sr-only">Scheduler</Heading>
      <ListSchedulers />
    </>
  )
}
