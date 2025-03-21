import { Heading } from "ui"

import { ListSecurityRules } from "./partials/list-security-rules"

export const metadata = {
  title: "Security Rules",
  description: "List of security rules for your site.",
}

export default function Page() {
  return (
    <>
      <Heading className="sr-only">Security Rules</Heading>
      <ListSecurityRules />
    </>
  )
}
