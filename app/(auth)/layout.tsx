import { Logo } from "@/components/logo"
import { Link } from "ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg p-6">
        <Link
          href="/"
          className="mx-auto grid size-12 place-items-center rounded-full border bg-secondary"
        >
          <Logo />
        </Link>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
