import { ListPhp } from "@/app/(dashboard)/servers/[id]/(servers)/php/list-php"

export const metadata = {
  title: "PHP",
  description: "Upgrade, manage, and monitor PHP applications on your server.",
}

export default function Page() {
  return <ListPhp />
}
