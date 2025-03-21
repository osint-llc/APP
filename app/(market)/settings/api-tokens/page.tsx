import { CreateApiToken } from "@/app/(market)/settings/api-tokens/partials/create-api-token"
import { ListApiTokens } from "@/app/(market)/settings/api-tokens/partials/list-api-tokens"
import { Heading } from "ui"

export const metadata = {
  title: "API Tokens",
  description: "Manage your API tokens. Create, revoke, and regenerate them.",
}

export default function Page() {
  return (
    <>
      <Heading>API Tokens</Heading>
      <CreateApiToken />
      <ListApiTokens />
    </>
  )
}
