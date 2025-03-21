import { ListDaemons } from "@/app/(dashboard)/servers/[id]/(servers)/daemons/partials/list-daemons"

export const metadata = {
  title: "Daemons",
  description: "List of all daemons running on the server",
}

export default function Page() {
  return (
    <>
      <ListDaemons />
    </>
  )
}
