import { ListTemplates } from "@/app/(dashboard)/servers/[id]/(servers)/nginx-templates/partials/list-templates"
import { Heading } from "ui"

export const metadata = {
  title: "Nginx Templates",
}

export default function Page() {
  return (
    <>
      <Heading className="sr-only">Nginx Templates</Heading>
      <ListTemplates />
    </>
  )
}
