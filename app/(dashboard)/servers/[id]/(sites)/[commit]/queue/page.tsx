import { ListQueues } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/queue/partials/list-queues"
import { Heading } from "ui"

export const metadata = {
  title: "Queues",
  description: "List of queues of the current application.",
}

export default function Page() {
  return (
    <>
      <Heading className="sr-only">Queues</Heading>
      <ListQueues />
    </>
  )
}
