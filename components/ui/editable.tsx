"use client"

import React from "react"

export function Editable({ children }: { children: React.ReactNode }) {
  const editableRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      contentEditable
      ref={editableRef}
      suppressContentEditableWarning
      className="overflow-hidden rounded-xl border p-4 focus:border-ring/70 focus:outline-hidden focus:ring-3 focus:ring-ring/20"
    >
      <pre className="max-w-xs font-mono text-sm">{children}</pre>
    </div>
  )
}
