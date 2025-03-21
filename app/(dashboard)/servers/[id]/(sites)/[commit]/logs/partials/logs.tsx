"use client"

import React from "react"

import { Editable } from "@/components/ui/editable"
import type { Key } from "react-aria-components"
import { Card, Select } from "ui"

const logs = [
  {
    id: 1,
    name: "npm_log",
    content: "Error: Failed to compile at line 23 in app.js",
  },
  {
    id: 2,
    name: "laravel.log",
    content:
      "[2024-11-15 10:00:00] production.ERROR: Undefined variable: user in /var/www/html/app/Http/Controllers/UserController.php",
  },
]

export function Logs() {
  const [currentLog, setCurrentLog] = React.useState<Key>(logs[0].id)
  const x = currentLog || 1
  const log = logs.find((item) => item.id === x)
  return (
    <Card>
      <Card.Header className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="sm:space-y-1">
          <Card.Title>{log?.name}</Card.Title>
          <Card.Description>The current log of your application.</Card.Description>
        </div>
        <div>
          <Select
            className="min-w-40"
            onSelectionChange={setCurrentLog}
            selectedKey={currentLog}
            aria-label="Switch log"
          >
            <Select.Trigger />
            <Select.List items={logs}>
              {(item) => (
                <Select.Option id={item.id} textValue={item.name}>
                  {item.name}
                </Select.Option>
              )}
            </Select.List>
          </Select>
        </div>
      </Card.Header>
      <Card.Content>
        <Editable>{log?.content}</Editable>
      </Card.Content>
    </Card>
  )
}
