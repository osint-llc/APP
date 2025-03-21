"use client"

import * as React from "react"

import { LayoutGroup, motion } from "motion/react"
import {
  TabList,
  type TabListProps,
  TabPanel,
  type TabPanelProps,
  Tab as TabPrimitive,
  type TabProps,
  Tabs as TabsPrimitive,
  type TabsProps,
  composeRenderProps,
} from "react-aria-components"
import { twJoin, twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

import { composeTailwindRenderProps } from "./primitive"

const tabsStyles = tv({
  base: "group flex gap-4 forced-color-adjust-none",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "w-[800px] flex-row",
    },
  },
})

const Tabs = ({ className, ...props }: TabsProps) => {
  return (
    <TabsPrimitive
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        tabsStyles({
          ...renderProps,
          className,
        }),
      )}
    />
  )
}

const tabListStyles = tv({
  base: "flex forced-color-adjust-none",
  variants: {
    orientation: {
      horizontal: "flex-row gap-x-5 border-border border-b",
      vertical: "flex-col items-start gap-y-4 border-l",
    },
  },
})

const List = <T extends object>(props: TabListProps<T>) => {
  const id = React.useId()
  return (
    <LayoutGroup id={id}>
      <TabList
        {...props}
        className={composeRenderProps(props.className, (className, renderProps) =>
          tabListStyles({ ...renderProps, className }),
        )}
      />
    </LayoutGroup>
  )
}

const tabStyles = tv({
  base: [
    "relative flex cursor-default items-center whitespace-nowrap rounded-full font-medium text-sm outline-hidden transition data-hovered:text-fg *:data-[slot=icon]:mr-2 *:data-[slot=icon]:size-4",
    "group-data-[orientation=vertical]:w-full group-data-[orientation=vertical]:py-0 group-data-[orientation=vertical]:pr-2 group-data-[orientation=vertical]:pl-4",
    "group-data-[orientation=horizontal]:pb-3",
  ],
  variants: {
    isSelected: {
      false: "text-muted-fg",
      true: "text-fg",
    },
    isFocused: { false: "ring-0", true: "text-fg" },
    isDisabled: {
      true: "text-muted-fg/50",
    },
  },
})

const Tab = ({ children, ...props }: TabProps) => {
  return (
    <TabPrimitive
      {...props}
      className={composeRenderProps(props.className, (_className, renderProps) =>
        tabStyles({
          ...renderProps,
          className: twJoin("href" in props && "cursor-pointer", _className),
        }),
      )}
    >
      {({ isSelected }) => (
        <>
          {children as React.ReactNode}
          {isSelected && (
            <motion.span
              className={twMerge(
                "absolute rounded bg-fg",
                // horizontal
                "group-data-[orientation=horizontal]:-bottom-px group-data-[orientation=horizontal]:inset-x-0 group-data-[orientation=horizontal]:h-0.5 group-data-[orientation=horizontal]:w-full",
                // vertical
                "group-data-[orientation=vertical]:left-0 group-data-[orientation=vertical]:h-[calc(100%-10%)] group-data-[orientation=vertical]:w-0.5 group-data-[orientation=vertical]:transform",
              )}
              layoutId="current-selected"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
        </>
      )}
    </TabPrimitive>
  )
}

const Panel = ({ className, ...props }: TabPanelProps) => {
  return (
    <TabPanel
      {...props}
      className={composeTailwindRenderProps(
        className,
        "flex-1 text-fg text-sm data-focus-visible:outline-hidden",
      )}
    />
  )
}

Tabs.List = List
Tabs.Tab = Tab
Tabs.Panel = Panel

export { Tabs }
