import { ServerLogs } from "@/app/(dashboard)/servers/[id]/(servers)/logs/partials/server-logs"

export const metadata = {
  title: "Logs",
}

export default function Page() {
  return <ServerLogs />
}
