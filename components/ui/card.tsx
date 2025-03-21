import type * as React from "react"
import { tv } from "tailwind-variants"

import { twMerge } from "tailwind-merge"
import { Heading } from "./heading"

const card = tv({
  slots: {
    root: [
      "xrkr xkd2 overflow-hidden rounded-xl border bg-tertiary text-fg [&:has(.larhy3):not(:has(.yahnba))>.ccvgs8x]:pt-6 [&:has(.larhy3)]:overflow-hidden [&:has(table)]:overflow-hidden [&:has(table)_.ccvgs8x]:border-t [&:has(table)_.x32]:bg-secondary/30 dark:[&:has(table)_.x32]:bg-secondary [&_table]:overflow-hidden [&_table_tr_td:first-child]:pl-6 [&_table_tr_th:first-child]:pl-6",
    ],
    header: "xlw32 flex flex-col gap-y-1 px-4 py-3.5 sm:px-6 sm:py-5",
    description: "dl2 text-muted-fg text-sm",
    content:
      "yahnba px-4 pb-4 has-[.t-hea]:bg-secondary/40 has-[table]:p-0 sm:px-6 sm:pb-6 [&:has(table)+.ccvgs8x]:py-4 sm:[&:has(table)+.ccvgs8x]:py-5 [&:has(table)]:border-t [&_.t-cel]:px-4 sm:[&_.t-cel]:px-6 [&_.t-col]:px-4 sm:[&_.t-col]:px-6",
    footer: "ccvgs8x flex items-center border-t bg-secondary/30 p-6",
  },
})

const { root, header, description, content, footer } = card()

const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={root({ className })} {...props} />
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  withoutPadding?: boolean
}

const Header = ({
  withoutPadding = false,
  className,
  title,
  description,
  children,
  ...props
}: HeaderProps) => (
  <div
    className={header({ className: twMerge(className, withoutPadding && "px-0 pt-0") })}
    {...props}
  >
    {title && <Title>{title}</Title>}
    {description && <Description>{description}</Description>}
    {!title && typeof children === "string" ? <Title>{children}</Title> : children}
  </div>
)

const title = tv({
  base: "font-semibold",
  variants: {
    level: {
      1: "text-2xl sm:text-3xl",
      2: "text-2xl sm:text-3xl",
      3: "text-lg sm:text-xl",
      4: "font-semibold",
    },
  },
})

const Title = ({ className, level = 3, ...props }: React.ComponentProps<typeof Heading>) => {
  return <Heading level={level} className={title({ level, className })} {...props} />
}

const Description = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} slot="description" className={description({ className })} {...props} />
}

const Content = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={content({ className })} {...props} />
}

const Footer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={footer({ className })} {...props} />
}

Card.Content = Content
Card.Description = Description
Card.Footer = Footer
Card.Header = Header
Card.Title = Title

export { Card }
