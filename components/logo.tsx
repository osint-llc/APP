import { IconServerStackFill } from "justd-icons"
import { twMerge } from "tailwind-merge"

export function Logo({ className, ...props }: React.ComponentProps<typeof IconServerStackFill>) {
  return <IconServerStackFill className={twMerge("size-5 text-fg", className)} {...props} />
}
