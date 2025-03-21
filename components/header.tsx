import { twMerge } from "tailwind-merge"
import { Container } from "ui"

interface HeaderProps extends React.ComponentProps<"div"> {
  title: string
  description: string
}
export function Header({ title, description, className, ...props }: HeaderProps) {
  return (
    <div
      className={twMerge(
        "-mt-5 sm:-mt-10 relative isolate z-10 py-10 sm:pt-20 sm:pb-14",
        className,
      )}
      {...props}
    >
      <Container>
        {props.children}
        <svg
          aria-hidden="true"
          className="-z-10 absolute inset-0 size-full stroke-fg/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={0}
              id="1d4240dd-898f-445f-932d-e2872fd12de3"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={0} className="overflow-visible fill-secondary/60">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>

        <div className="mx-auto max-w-2xl text-center" data-slot="header-content">
          <h2
            data-slot="header-title"
            className="text-balance font-semibold text-3xl text-fg tracking-tight sm:text-5xl"
          >
            {title}
          </h2>
          <p
            data-slot="header-description"
            className="mx-auto mt-3 max-w-xl text-muted-fg sm:mt-4 lg:text-lg/8"
          >
            {description}
          </p>
        </div>
      </Container>
    </div>
  )
}
