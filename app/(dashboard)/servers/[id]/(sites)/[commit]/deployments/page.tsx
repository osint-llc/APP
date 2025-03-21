import { DeployBranch } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/deployments/partials/deploy-branch"
import { DeployHistory } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/deployments/partials/deploy-history"
import { DeployScript } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/deployments/partials/deploy-script"
import { DeployTriggerUrl } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/deployments/partials/deploy-trigger-url"
import { QuickDeploy } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/deployments/partials/quick-deploy"
import servers from "@/resources/data/servers.json"
import sites from "@/resources/data/sites.json"
import { getModel } from "@/resources/eloquent"

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string; commit: string }>
}) => {
  const { id, commit } = await params
  const server = getModel(servers, "id", Number(id))
  const site = getModel(sites, "commit", commit)
  return {
    title: `${server?.name} - ${site?.domain} - Deployments`,
    description: `All information about the deployments of ${site?.domain} on ${server?.name}`,
  }
}

export default function Page() {
  return (
    <>
      <QuickDeploy />
      <DeployScript />
      <DeployTriggerUrl />
      <DeployBranch />
      <DeployHistory />
    </>
  )
}
