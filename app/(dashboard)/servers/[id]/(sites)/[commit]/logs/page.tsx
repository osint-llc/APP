import { Heading } from "ui"

import { Logs } from "./partials/logs"

export default function Page() {
  return (
    <div>
      <Heading className="sr-only">Logs</Heading>

      <Logs />
    </div>
  )
}
