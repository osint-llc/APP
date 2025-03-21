import { CpuLoadAvg } from "@/app/(dashboard)/servers/[id]/(servers)/monitoring/partials/cpu-load-avg"
import { DiskSpace } from "@/app/(dashboard)/servers/[id]/(servers)/monitoring/partials/disk-space"
import { Memory } from "@/app/(dashboard)/servers/[id]/(servers)/monitoring/partials/memory"
import { Heading } from "ui"

export const metadata = {
  title: "System Monitoring",
}
export default function Page() {
  return (
    <>
      <Heading className="sr-only">{metadata.title}</Heading>
      <CpuLoadAvg />
      <DiskSpace />
      <Memory />
    </>
  )
}
