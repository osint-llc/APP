"use client"

import type React from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { SearchField } from "ui"
import { useDebouncedCallback } from "use-debounce"

export function Search(props: React.ComponentProps<typeof SearchField>) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div>
      <SearchField
        {...props}
        onChange={handleSearch}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  )
}
