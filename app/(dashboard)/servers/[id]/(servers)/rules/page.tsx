import { ListRules } from "@/app/(dashboard)/servers/[id]/(servers)/rules/partials/list-rules"
import { Heading } from "ui"

export const metadata = {
  title: "Rules",
}

export default function Page() {
  return (
    <>
      <Heading className="sr-only">Rules</Heading>
      <ListRules />
    </>
  )
}
