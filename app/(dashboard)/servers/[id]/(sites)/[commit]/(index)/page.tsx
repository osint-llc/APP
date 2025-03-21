import { DeleteSite } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/(index)/partials/delete-site"
import { SiteInformation } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/(index)/partials/site-information"
import { UninstallRepository } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/(index)/partials/uninstall-repository"
import { UpdateGitRemote } from "@/app/(dashboard)/servers/[id]/(sites)/[commit]/(index)/partials/update-git-remote"
import sites from "@/resources/data/sites.json"
import { getModel } from "@/resources/eloquent"

export async function generateMetadata({ params }: { params: Promise<{ commit: string }> }) {
  const { commit } = await params
  const site = getModel(sites, "commit", commit)
  return {
    title: site?.branch,
    description: getModel(sites, "commit", commit)?.domain,
  }
}

export default async function Page({ params }: { params: Promise<{ commit: string }> }) {
  const commit = (await params).commit
  return (
    <>
      <SiteInformation commit={commit} />
      <UpdateGitRemote />
      <div className="grid gap-6 sm:grid-cols-2">
        <UninstallRepository />
        <DeleteSite />
      </div>
    </>
  )
}
