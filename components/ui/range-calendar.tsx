"use client"

import type {
  DateValue,
  RangeCalendarProps as RangeCalendarPrimitiveProps,
} from "react-aria-components"
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  RangeCalendar as RangeCalendarPrimitive,
  Text,
} from "react-aria-components"
import { twJoin } from "tailwind-merge"
import { tv } from "tailwind-variants"

import { Calendar } from "./calendar"
import { composeTailwindRenderProps, focusRing } from "./primitive"

const cell = tv({
  extend: focusRing,
  base: "flex size-full items-center justify-center rounded-full tabular-nums forced-color-adjust-none",
  variants: {
    selectionState: {
      none: "group-data-hovered/calendar-cell:bg-secondary-fg/15 group-data-pressed/calendar-cell:bg-secondary-fg/20 forced-colors:group-data-pressed/calendar-cell:bg-[Highlight]",
      middle: [
        "group-data-hovered/calendar-cell:bg-(--cell) forced-colors:group-data-hovered/calendar-cell:bg-[Highlight]",
        "group-data-pressed/calendar-cell:bg-(--cell) forced-colors:text-[HighlightText] forced-colors:group-data-pressed/calendar-cell:bg-[Highlight]",
        "group-data-invalid/calendar-cell:group-data-pressed/calendar-cell:bg-red-300 dark:group-data-invalid/calendar-cell:group-data-pressed/calendar-cell:bg-red-900 forced-colors:group-data-invalid/calendar-cell:group-data-pressed/calendar-cell:bg-[Mark]",
        "group-data-invalid:group-data-hovered/calendar-cell:bg-red-300 group-data-invalid/calendar-cell:text-red-500 dark:group-data-invalid:group-data-hovered/calendar-cell:bg-red-900 forced-colors:group-data-invalid:group-data-hovered/calendar-cell:bg-[Mark]",
      ],
      cap: "bg-primary text-primary-fg group-data-invalid/calendar-cell:bg-danger group-data-invalid/calendar-cell:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:group-data-invalid/calendar-cell:bg-[Mark]",
    },
    isDisabled: {
      true: "opacity-50 forced-colors:text-[GrayText]",
    },
  },
})

interface RangeCalendarProps<T extends DateValue>
  extends Omit<RangeCalendarPrimitiveProps<T>, "visibleDuration"> {
  errorMessage?: string
}

const RangeCalendar = <T extends DateValue>({
  errorMessage,
  className,
  ...props
}: RangeCalendarProps<T>) => {
  return (
    <RangeCalendarPrimitive
      className={composeTailwindRenderProps(className, "max-w-[17.5rem] sm:max-w-[15.8rem]")}
      {...props}
    >
      <Calendar.Header />
      <CalendarGrid className="**:[td]:px-0 **:[td]:py-[1.5px]">
        <Calendar.GridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={twJoin([
                "[--cell-fg:var(--color-primary)] [--cell:color-mix(in_oklab,var(--color-primary)_10%,white_90%)]",
                "dark:[--cell-fg:color-mix(in_oklab,var(--color-primary)_80%,white_20%)] dark:[--cell:color-mix(in_oklab,var(--color-primary)_35%,black_50%)]",
                "group/calendar-cell size-10 cursor-default outline-hidden [line-height:2.286rem] data-selection-start:rounded-s-full data-selection-end:rounded-e-full data-outside-month:text-muted-fg sm:text-sm lg:size-9",
                "data-selected:bg-(--cell)/70 data-selected:text-(--cell-fg) dark:data-selected:bg-(--cell)",
                "data-invalid:data-selected:bg-red-100 dark:data-invalid:data-selected:bg-red-700/30",
                "[td:first-child_&]:rounded-s-full [td:last-child_&]:rounded-e-full",
                "forced-colors:data-invalid:data-selected:bg-[Mark] forced-colors:data-selected:bg-[Highlight] forced-colors:data-selected:text-[HighlightText]",
              ])}
            >
              {({
                formattedDate,
                isSelected,
                isSelectionStart,
                isSelectionEnd,
                isFocusVisible,
                isDisabled,
              }) => (
                <span
                  className={cell({
                    selectionState:
                      isSelected && (isSelectionStart || isSelectionEnd)
                        ? "cap"
                        : isSelected
                          ? "middle"
                          : "none",
                    isFocusVisible,
                    isDisabled,
                  })}
                >
                  {formattedDate}
                </span>
              )}
            </CalendarCell>
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-danger text-sm">
          {errorMessage}
        </Text>
      )}
    </RangeCalendarPrimitive>
  )
}

export { RangeCalendar }
