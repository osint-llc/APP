import { Heading } from "ui"

import { Domain } from "./partials/domain"
import { PhpVersion } from "./partials/php-version"
import { Tags } from "./partials/tags"
import { WebDirectory } from "./partials/web-directory"

export const metadata = {
  title: "Settings",
  description: "List of settings for your site.",
}

export default function Page() {
  return (
    <>
      <Heading className="sr-only">Settings</Heading>

      <Domain />
      <WebDirectory />
      <PhpVersion />
      <Tags />
    </>
  )
}
