"use client"

import {
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

const linkStyles = tv({
  base: [
    "relative outline-0 outline-primary outline-offset-2 transition-colors data-focus-visible:outline-2 data-focused:outline-hidden",
    "data-disabled:data-focus-visible:outline-0 forced-colors:outline-[Highlight] forced-colors:data-disabled:text-[GrayText]",
    "disabled:cursor-default data-disabled:opacity-60",
  ],
  variants: {
    intent: {
      unstyled: "text-current",
      primary: "text-fg data-hovered:underline forced-colors:data-disabled:text-[GrayText]",
      secondary:
        "text-muted-fg data-hovered:text-secondary-fg forced-colors:data-disabled:text-[GrayText]",
    },
  },
  defaultVariants: {
    intent: "unstyled",
  },
})

interface LinkProps extends LinkPrimitiveProps {
  intent?: "primary" | "secondary" | "unstyled"
}

const Link = ({ className, ...props }: LinkProps) => {
  return (
    <LinkPrimitive
      {...props}
      className={composeRenderProps(className, (className, ...renderProps) =>
        linkStyles({ ...renderProps, intent: props.intent, className }),
      )}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </LinkPrimitive>
  )
}

export { Link, LinkPrimitive, type LinkPrimitiveProps, type LinkProps }
