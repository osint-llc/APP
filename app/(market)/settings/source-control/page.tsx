import { ConnectToProviders } from "@/app/(market)/settings/source-control/partials/connect-to-providers"
import { CurrentConnectedAccount } from "@/app/(market)/settings/source-control/partials/current-connected-account"
import { GitlabSelfHosted } from "@/app/(market)/settings/source-control/partials/gitlab-self-hosted"
import { Heading } from "ui"

export const metadata = {
  title: "Source Control",
  description: "Manage your source control settings. Integrate with GitHub, GitLab, and more.",
}

export default function Page() {
  return (
    <>
      <Heading>Source Control</Heading>
      <CurrentConnectedAccount />
      <ConnectToProviders />
      <GitlabSelfHosted />
    </>
  )
}
