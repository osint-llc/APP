import type * as React from "react"

import { tv } from "tailwind-variants"

const descriptionListStyles = tv({
  slots: {
    dl: "grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,calc(var(--spacing)*80))_auto] sm:text-sm/6",
    dt: "col-start-1 border-t pt-3 text-muted-fg first:border-none sm:py-3",
    dd: "pt-1 pb-3 text-fg sm:border-t sm:nth-2:border-none sm:py-3",
  },
})

const { dl, dt, dd } = descriptionListStyles()

const DescriptionList = ({ className, ...props }: React.ComponentPropsWithoutRef<"dl">) => {
  return <dl {...props} className={dl({ className })} />
}

const DescriptionTerm = ({ className, ...props }: React.ComponentPropsWithoutRef<"dt">) => {
  return <dt {...props} className={dt({ className })} />
}

const DescriptionDetails = ({ className, ...props }: React.ComponentPropsWithoutRef<"dd">) => {
  return <dd {...props} className={dd({ className })} />
}

DescriptionList.Term = DescriptionTerm
DescriptionList.Details = DescriptionDetails
export { DescriptionList }
