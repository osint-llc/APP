import { ArchiveServer } from "@/app/(dashboard)/servers/[id]/(servers)/settings/partials/archive-server"
import { PublicKey } from "@/app/(dashboard)/servers/[id]/(servers)/settings/partials/public-key"
import { ServerSettings } from "@/app/(dashboard)/servers/[id]/(servers)/settings/partials/server-settings"
import { TransferServer } from "@/app/(dashboard)/servers/[id]/(servers)/settings/partials/transfer-server"

export const metadata = {
  title: "Settings",
}

export default function Page() {
  return (
    <>
      <PublicKey />
      <ServerSettings />
      <TransferServer />
      <ArchiveServer />
    </>
  )
}
