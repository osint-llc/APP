import { AppSidebar } from "@/app/(market)/settings/app-sidebar"
import { Container } from "ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="md:py-8 lg:max-w-7xl 2xl:max-w-(--breakpoint-2xl)">
      <div className="flex flex-col items-start gap-y-6 md:flex-row md:gap-x-16 md:gap-y-0">
        <div className="-mx-2 md:sticky md:top-32 md:mx-0">
          <AppSidebar />
        </div>
        <main className="flex max-w-full flex-1 flex-col gap-y-6">{children}</main>
      </div>
    </Container>
  )
}
