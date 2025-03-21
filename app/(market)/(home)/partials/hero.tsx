"use client"

import { IconBrandAws } from "@/components/icons/icon-brand-aws"
import { IconBrandAzure } from "@/components/icons/icon-brand-azure"
import { IconBrandDo } from "@/components/icons/icon-brand-do"
import { IconBrandGcp } from "@/components/icons/icon-brand-gcp"
import { IconBrandHetzner } from "@/components/icons/icon-brand-hetzner"
import { IconBrandHostinger } from "@/components/icons/icon-brand-hostinger"
import { IconBrandLinode } from "@/components/icons/icon-brand-linode"
import { IconBrandScaleway } from "@/components/icons/icon-brand-scaleway"
import { IconBrandVultr } from "@/components/icons/icon-brand-vultr"
import { IconBrandLaravel, IconBrandNextjs, IconBrandNuxtjs, IconBrandRemix } from "justd-icons"
import Image from "next/image"
import { Badge, Link, buttonStyles } from "ui"

export function Hero() {
  return (
    <div className="-mt-4 sm:-mt-8 relative isolate z-20 overflow-hidden bg-linear-to-b from-bg via-bg to-transparent">
      <svg
        aria-hidden="true"
        className="-z-10 absolute inset-0 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={100}
            height={100}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-fg/5">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div
        aria-hidden="true"
        className="-z-10 absolute top-10 left-[calc(50%-4rem)] transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
          className="aspect-1108/632 w-[69.25rem] bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl shrink-0 **:data-[slot=badge]:**:data-[slot=icon]:size-4 **:data-[slot=badge]:gap-x-1 **:data-[slot=badge]:bg-transparent **:data-[slot=badge]:px-1 **:data-[slot=badge]:text-base lg:mx-0 lg:pt-8 dark:**:data-[slot=badge]:bg-transparent">
          <h1 className="mt-10 text-pretty font-semibold text-5xl text-fg tracking-tight sm:text-7xl">
            Say goodbye to server management headaches
          </h1>
          <p className="mt-8 text-pretty font-medium text-lg text-muted-fg sm:text-xl/9">
            Seamlessly deploy and scale any app like
            <Badge intent="secondary">
              <IconBrandNextjs className="text-fg" />
              Next.js
            </Badge>
            ,{" "}
            <Badge intent="secondary">
              <IconBrandNuxtjs className="text-emerald-500" />
              Nuxt.js
            </Badge>
            ,{" "}
            <Badge intent="secondary">
              <IconBrandRemix className="text-fg" />
              Remix
            </Badge>{" "}
            <Badge intent="secondary">
              <IconBrandLaravel className="text-red-500" /> Laravel
            </Badge>
            , and more by leading platforms like{" "}
            <Badge intent="secondary">
              <IconBrandDo /> DigitalOcean
            </Badge>
            ,{" "}
            <Badge intent="secondary">
              <IconBrandVultr />
              Vultr
            </Badge>
            ,{" "}
            <Badge intent="secondary">
              <IconBrandAws />
              AWS
            </Badge>
            ,{" "}
            <Badge intent="secondary">
              <IconBrandGcp /> GCP
            </Badge>
            ,{" "}
            <Badge intent="secondary">
              <IconBrandAzure /> Azure
            </Badge>
            ,{" "}
            <Badge intent="secondary">
              <IconBrandLinode />
              Linode
            </Badge>
            ,{" "}
            <Badge intent="secondary">
              <IconBrandScaleway />
              Scaleway
            </Badge>
            ,{" "}
            <Badge intent="secondary">
              <IconBrandHetzner />
              Hetzner
            </Badge>
            ,{" "}
            <Badge intent="secondary">
              <IconBrandHostinger />
              Hostinger
            </Badge>
            , and beyond.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link href="/servers" className={buttonStyles({ size: "large", shape: "circle" })}>
              Get started
            </Link>
            <a href="#" className="font-semibold text-sm/6 text-white">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none rounded-lg border border-fg/20 bg-fg/10 p-2.5 backdrop-blur-sm sm:max-w-5xl lg:max-w-none">
            <Image
              alt="App screenshot"
              src="/images/dashboard-hero.png"
              width={2432}
              height={1442}
              className="w-[76rem] rounded-md border border-fg/20 bg-bg/5 shadow-2xl dark:hidden"
            />{" "}
            <Image
              alt="App screenshot"
              src="/images/dashboard-hero-dark.png"
              width={2432}
              height={1442}
              className="hidden w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
