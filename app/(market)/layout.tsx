import { AppFooter } from "@/app/(market)/app-footer"
import { AppNavbar } from "@/app/(market)/app-navbar"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AppNavbar>
        <div className="py-4 sm:py-8">{children}</div>
      </AppNavbar>
      <AppFooter />
    </>
  )
}
