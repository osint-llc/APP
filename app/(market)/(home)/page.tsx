import { Hero } from "@/app/(market)/(home)/partials/hero"
import { Pricing } from "@/app/(market)/pricing/partials/pricing"

import { Features } from "./partials/features"

export const metadata = {
  title: "Home",
  description: "Home page of the application.",
}
export default function Page() {
  return (
    <div className="flex flex-col gap-y-4">
      <Hero />
      <Features />
      <Pricing />
    </div>
  )
}
