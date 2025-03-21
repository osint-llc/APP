import Image from "next/image"

export function Features() {
  return (
    <div className="bg-bg py-8 sm:mt-0 sm:pb-20">
      <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
        <h2 className="font-semibold text-base/7 text-primary">Push faster</h2>
        <p className="mt-2 max-w-lg text-pretty font-semibold text-4xl text-fg tracking-tight sm:text-5xl">
          All the tools you need to launch your app
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-bg max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <div className="absolute inset-x-0 top-0 h-32 w-full bg-linear-to-b from-bg/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-40 h-32 w-full bg-linear-to-t from-bg via-bg/90 to-transparent" />
              <Image
                width={2432}
                height={1442}
                alt="Ev Light"
                src="/images/ev.png"
                className="h-80 object-cover object-left dark:hidden"
              />{" "}
              <Image
                width={2432}
                height={1442}
                alt="Ev Light"
                src="/images/ev-dark.png"
                className="hidden h-80 object-cover object-left dark:block"
              />
              <div className="p-10 pt-4">
                <h3 className="font-semibold text-primary text-sm/4">Good UX</h3>
                <p className="mt-2 font-medium text-fg text-lg tracking-tight">
                  Environment Variables
                </p>
                <p className="mt-2 max-w-lg text-muted-fg text-sm/6">
                  We have a simple and intuitive interface to manage environment variables so you
                  can focus on your code.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-fg/10 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
          </div>
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-bg lg:rounded-tr-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <div className="absolute inset-x-0 top-0 h-32 w-full bg-linear-to-b from-bg/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-40 h-32 w-full bg-linear-to-t from-bg via-bg/90 to-transparent" />
              <Image
                alt=""
                width={2432}
                height={1442}
                src="/images/site-info.png"
                className="h-80 object-cover object-left lg:object-left dark:hidden"
              />{" "}
              <Image
                alt=""
                width={2432}
                height={1442}
                src="/images/site-info-dark.png"
                className="hidden h-80 object-cover object-left lg:object-left dark:block"
              />
              <div className="p-10 pt-4">
                <h3 className="font-semibold text-primary text-sm/4">Releases</h3>
                <p className="mt-2 font-medium text-fg text-lg tracking-tight">Push to deploy</p>
                <p className="mt-2 max-w-lg text-muted-fg text-sm/6">
                  Once you push to the configured branch, the site will be deployed automatically
                  with the latest commit.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-fg/10 lg:rounded-tr-[2rem]" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-bg lg:rounded-bl-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              <div className="absolute inset-x-0 top-0 h-32 w-full bg-linear-to-b from-bg via-bg/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-40 h-32 w-full bg-linear-to-t from-bg via-bg/90 to-transparent" />
              <Image
                width={2432}
                height={1442}
                alt="Command Light"
                src="/images/command.png"
                className="h-80 object-cover object-left dark:hidden"
              />
              <Image
                width={2432}
                height={1442}
                alt="Command Dark"
                src="/images/command-dark.png"
                className="hidden h-80 object-cover object-left dark:block"
              />
              <div className="p-10 pt-4">
                <h3 className="font-semibold text-primary text-sm/4">Command</h3>
                <p className="mt-2 font-medium text-fg text-lg tracking-tight">
                  Built for power users
                </p>
                <p className="mt-2 max-w-lg text-muted-fg text-sm/6">
                  Everything is on the app, so you can use the command line to manage your server.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-fg/10 lg:rounded-bl-[2rem]" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-bg" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="absolute inset-x-0 top-0 h-32 w-full bg-linear-to-b from-bg via-bg/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-40 h-32 w-full bg-linear-to-t from-bg via-bg/90 to-transparent" />
              <Image
                width={2432}
                height={1442}
                alt="Provider"
                src="/images/provider.png"
                className="h-80 object-cover object-left dark:hidden"
              />
              <Image
                width={2432}
                height={1442}
                alt="Provider Dark"
                src="/images/provider-dark.png"
                className="hidden h-80 object-cover object-left dark:block"
              />
              <div className="p-10 pt-4">
                <h3 className="font-semibold text-primary text-sm/4">Integrations</h3>
                <p className="mt-2 font-medium text-fg text-lg tracking-tight">
                  Connect your favorite vendors.
                </p>
                <p className="mt-2 max-w-lg text-muted-fg text-sm/6">
                  Sign in with your favorite vendors to get the most out of your server.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-fg/10" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-px rounded-lg bg-bg max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <div className="absolute inset-x-0 top-0 h-32 w-full bg-linear-to-b from-bg via-bg/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-40 h-32 w-full bg-linear-to-t from-bg via-bg/90 to-transparent" />
              <Image
                width={2432}
                height={1442}
                alt="List Server"
                src="/images/list-server.png"
                className="h-80 object-cover object-left dark:hidden"
              />{" "}
              <Image
                width={2432}
                height={1442}
                alt="List Server Dark"
                src="/images/list-server-dark.png"
                className="hidden h-80 object-cover object-left dark:block"
              />
              <div className="p-10 pt-4">
                <h3 className="font-semibold text-primary text-sm/4">Clear</h3>
                <p className="mt-2 font-medium text-fg text-lg tracking-tight">
                  We've got your back
                </p>
                <p className="mt-2 max-w-lg text-muted-fg text-sm/6">
                  We have a simple and intuitive interface to manage your server. No more confusion.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-fg/10 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
          </div>
        </div>
      </div>
    </div>
  )
}
