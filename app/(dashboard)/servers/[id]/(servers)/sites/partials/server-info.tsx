import servers from "@/resources/data/servers.json"
import { getModel } from "@/resources/eloquent"
import { dateFormat } from "@/resources/helpers"
import { Badge, DetailLine, Heading } from "ui"

export function ServerInfo({ id }: { id: string }) {
  const server = getModel(servers, "id", Number(id))
  return (
    <div className="relative flex flex-col gap-y-4 p-6">
      <div className="flex items-center justify-between">
        <Heading level={2}>{server?.name}</Heading>
        <Badge intent={server?.status === "active" ? "success" : "danger"}>{server?.status}</Badge>
      </div>
      <DetailLine>
        <DetailLine.Item label="Name" description={server?.name} />
        <DetailLine.Item>
          <DetailLine.Label className="tabular-nums">IP Address</DetailLine.Label>
          <DetailLine.Description className="tabular-nums">
            {server?.ip_address}
          </DetailLine.Description>
        </DetailLine.Item>
        <DetailLine.Item label="Location" description={server?.location} />
        <DetailLine.Item label="OS" description={server?.os} />
        <DetailLine.Item label="CPU" description={server?.cpu} />
        <DetailLine.Item label="Memory" description={server?.memory} />
        <DetailLine.Item label="Disk" description={server?.disk} />
        <DetailLine.Item label="Created At" description={dateFormat(server?.created_at ?? "")} />
      </DetailLine>
    </div>
  )
}
