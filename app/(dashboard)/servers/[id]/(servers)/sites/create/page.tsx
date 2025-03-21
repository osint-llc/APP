import { NewSiteForm } from "@/app/(dashboard)/servers/[id]/(servers)/sites/partials/new-site-form"

export const metadata = {
  title: "New Site",
  description:
    "Create a new site for your application. You can use this site to host your application's code and data.",
}
export default function Page() {
  return <NewSiteForm />
}
