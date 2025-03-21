import { Heading } from "ui"

import { CreateCertificate } from "./partials/create-certificate"
import { CurrentCertificate } from "./partials/current-certificate"

export default function Page() {
  return (
    <>
      <Heading className="sr-only">SSL</Heading>
      <CreateCertificate />
      <CurrentCertificate />
    </>
  )
}
