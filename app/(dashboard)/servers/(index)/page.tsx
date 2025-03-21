import { ListServers } from "@/app/(dashboard)/servers/(index)/partials/list-servers"
import Layout from "@/app/(market)/layout"
import { Header } from "@/components/header"
import { Container } from "ui"

export const metadata = {
  title: "Servers",
  description: "The Servers page is the central hub for all your applications and services.",
}

export default async function Page() {
  return (
    <Layout>
      <Header
        className="mb-4 border-b py-6 **:data-[slot=header-content]:mx-0 **:data-[slot=header-description]:mt-2 sm:mb-8 sm:py-12 lg:mb-12 [&_[data-slot=header-content]>*]:mx-0 lg:[&_[data-slot=header-content]>*]:max-w-lg lg:[&_[data-slot=header-content]>*]:text-left"
        title={metadata.title}
        description={metadata.description}
      >
        <div
          aria-hidden="true"
          className="-top-40 -z-10 absolute inset-x-0 flex transform-gpu justify-center overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
            className="aspect-16/5 w-[69.25rem] flex-none bg-linear-to-r from-blue-600 to-blue-400 opacity-10 dark:opacity-[0.12]"
          />
        </div>
      </Header>
      <Container>
        <ListServers />
      </Container>
    </Layout>
  )
}
