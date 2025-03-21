import { ListSites } from "@/app/(dashboard)/servers/[id]/(servers)/sites/partials/list-sites"
import { ServerInfo } from "@/app/(dashboard)/servers/[id]/(servers)/sites/partials/server-info"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  return (
    <div className="divide-y rounded-xl border">
      <ServerInfo id={id} />
      <ListSites />
    </div>
  )
}
