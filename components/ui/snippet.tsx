"use client"

import * as React from "react"

import { IconCheck, IconDuplicate } from "justd-icons"

import { twMerge } from "tailwind-merge"
import { Button } from "./button"

interface SnippetProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  text: string
  indicator?: React.ReactNode
}

export function Snippet({ className, text, ...props }: SnippetProps) {
  const [isCopied, setIsCopied] = React.useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  React.useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [isCopied])
  return (
    <div
      className={twMerge(
        "flex items-center justify-between rounded-xl bg-secondary/50 py-1.5 pr-1.5 ring-1 ring-border",
        !props.indicator && "pl-4",
        className,
      )}
      {...props}
    >
      {props.indicator && <>{props.indicator}</>}
      <span className="truncate pr-4 font-mono text-sm">{text}</span>
      <Button data-slot="copy" size="square-petite" intent="outline" onPress={copy}>
        {isCopied ? <IconCheck /> : <IconDuplicate />}
      </Button>
    </div>
  )
}
