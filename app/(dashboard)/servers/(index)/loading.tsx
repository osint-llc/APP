import { IconLoader } from "justd-icons"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <IconLoader className="size-6 animate-spin" />
    </div>
  )
}
