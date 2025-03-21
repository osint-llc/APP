import { Pricing } from "@/app/(market)/pricing/partials/pricing"
import { Header } from "@/components/header"

export const metadata = {
  title: "Pricing",
  description:
    "Flexible deployment and server management plans tailored to fit your needs. Choose from Basic, Standard, or Premium packages with increasing benefits to enhance your cloud infrastructure.",
}

export default function Page() {
  return (
    <>
      <Header className="pb-0 sm:pb-4" title={metadata.title} description={metadata.description} />
      <Pricing />
    </>
  )
}
