import { Logo } from "@/components/logo"
import { siteConfig } from "@/resources/site-config"
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
} from "justd-icons"

const navigation = {
  solutions: [
    { name: "Home", href: "/" },
    { name: "Servers", href: "/servers" },
    { name: "Pricing", href: "/pricing" },
  ],
  support: [
    { name: "Submit ticket", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
  ],
  company: [
    { name: "Settings", href: "/settings" },
    { name: "API Tokens", href: "/settings/api-tokens" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
    { name: "Forgot Password", href: "/forgot-password" },
  ],
  templates: [
    { name: "Buy this template", href: "https://store.irsyad.co/l/deploy" },
    { name: "Buy 5 Templates", href: "https://store.irsyad.co/l/first-bundler" },
    { name: "Commerce", href: "https://store.irsyad.co/l/commerce" },
    { name: "Clinic", href: "https://store.irsyad.co/l/clinic" },
    { name: "Provision", href: "https://store.irsyad.co/l/provision" },
    { name: "Course / Screencast", href: "https://store.irsyad.co/l/course" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props: React.ComponentProps<"svg">) => <IconBrandFacebook {...props} />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props: React.ComponentProps<"svg">) => <IconBrandInstagram {...props} />,
    },
    {
      name: "X",
      href: "https://x.com/irsyadadl",
      icon: (props: React.ComponentProps<"svg">) => <IconBrandX {...props} />,
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props: React.ComponentProps<"svg">) => <IconBrandGithub {...props} />,
    },
    {
      name: "YouTube",
      href: "#",
      icon: (props: React.ComponentProps<"svg">) => <IconBrandYoutube {...props} />,
    },
  ],
}

export function AppFooter() {
  return (
    <footer className="bg-bg">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Logo />
            <p className="text-balance text-muted-fg text-sm/6">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-muted-fg hover:text-fg">
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-semibold text-fg text-sm/6">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-muted-fg text-sm/6 hover:text-fg">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="font-semibold text-fg text-sm/6">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-muted-fg text-sm/6 hover:text-fg">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-semibold text-fg text-sm/6">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-muted-fg text-sm/6 hover:text-fg">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="font-semibold text-fg text-sm/6">More Templates</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.templates.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        className="text-muted-fg text-sm/6 hover:text-fg"
                        rel="noreferrer"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-gray-900/10 border-t pt-8 sm:mt-20 lg:mt-24">
          <p className="text-muted-fg text-sm/6">
            &copy; 2024 {siteConfig.name}, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
