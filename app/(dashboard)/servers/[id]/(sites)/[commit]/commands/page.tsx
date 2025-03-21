import { CommandHistory } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/commands/partials/command-history"
import { CreateCommand } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/commands/partials/create-command"

export default function Page() {
  return (
    <>
      <CreateCommand />
      <CommandHistory />
    </>
  )
}
