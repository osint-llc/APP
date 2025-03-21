import { CreateBackup } from "@/app/(dashboard)/servers/[id]/(servers)/backups/partials/create-backup"

export const metadata = {
  title: "Backups",
}
export default function Page() {
  return <CreateBackup />
}
