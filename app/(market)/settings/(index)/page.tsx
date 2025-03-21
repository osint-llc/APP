import { ChangePassword } from "@/app/(market)/settings/(index)/partials/change-password"
import { DeleteAccount } from "@/app/(market)/settings/(index)/partials/delete-account"
import { TwoFactorAuth } from "@/app/(market)/settings/(index)/partials/two-factor-auth"
import { UpdateProfileInformationForm } from "@/app/(market)/settings/(index)/partials/update-profile-information-form"
import { Heading } from "ui"

export const metadata = {
  title: "Settings",
  description: "Manage your account settings. Change your password, email address, and more.",
}

export default function Page() {
  return (
    <>
      <Heading>Settings</Heading>
      <UpdateProfileInformationForm />
      <ChangePassword />
      <TwoFactorAuth />
      <DeleteAccount />
    </>
  )
}
