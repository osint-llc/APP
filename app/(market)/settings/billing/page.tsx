import { CurrentSubscribed } from "@/app/(market)/settings/billing/partials/current-subscribed"
import { InvoiceMail } from "@/app/(market)/settings/billing/partials/invoice-mail"
import { ListInvoices } from "@/app/(market)/settings/billing/partials/list-invoices"
import { Heading } from "ui"

export const metadata = {
  title: "Billing",
  description:
    "Manage your billing settings. Update your payment method, view your invoices, and more.",
}

export default function Page() {
  return (
    <>
      <Heading>Billing</Heading>
      <CurrentSubscribed />
      <InvoiceMail />
      <ListInvoices />
    </>
  )
}
