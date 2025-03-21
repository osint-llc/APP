import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import type { VariantProps } from "tailwind-variants"
import type { Badge } from "ui"

dayjs.extend(relativeTime)

export function dateFormat(date: string, humans = true) {
  const formattedDate = dayjs(date)
  return humans
    ? formattedDate.isBefore(dayjs())
      ? formattedDate.fromNow()
      : formattedDate.toNow()
    : formattedDate.format("DD MMMM YYYY")
}

export function dayFormat(date: string) {
  const formattedDate = dayjs(date)
  return formattedDate.format("DD MMM")
}

export function timeFormat(date: string) {
  const formattedDate = dayjs(date)
  return formattedDate.format("hh:mm A")
}

export function wait(number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, number))
}

export const title = (text: string): string =>
  text.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

export const getColumns = (data: Record<string, string | number>[], rowHeaderKey: string) =>
  Object.keys(data[0]).map((key) => ({
    id: key,
    name: key,
    isRowHeader: key === rowHeaderKey,
  }))

export const getColor = (status: string): VariantProps<typeof Badge>["intent"] => {
  return status === "success" ? "success" : status === "failure" ? "danger" : "info"
}

export function pluralize(word: string, count: number) {
  return count === 1 ? word : `${word}s`
}

export const generateRandomStrings = (length: number, count: number): string[] => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return Array.from({ length: count }, () =>
    Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length)),
    ).join(""),
  )
}
