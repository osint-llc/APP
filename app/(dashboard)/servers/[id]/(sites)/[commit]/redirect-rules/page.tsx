import { Heading } from "ui"

import { ListRedirects } from "./partials/list-redirects"

export const metadata = {
  title: "Redirect Rules",
  description: "List of redirect rules for your site.",
}

export default function Page() {
  return (
    <>
      <Heading className="sr-only">Redirect Rules</Heading>
      <ListRedirects />
    </>
  )
}
