"use client"

import React from "react"

import { Testimonial } from "@/app/(market)/pricing/partials/testimonial"
import prices from "@/resources/data/prices.json"
import { IconCheck, IconMinus } from "justd-icons"
import { twMerge } from "tailwind-merge"
import { Badge, Button, Container, Separator, Toggle } from "ui"

export function Pricing() {
  const [monthly, setMonthly] = React.useState<boolean>(false)
  return (
    <div className="relative z-20 bg-linear-to-t from-bg py-6">
      <div
        aria-hidden="true"
        className="-top-96 -z-10 absolute inset-x-0 flex transform-gpu justify-center overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
          className="aspect-1108/632 w-[69.25rem] flex-none bg-linear-to-r from-blue-600 to-primary/50 opacity-10 dark:opacity-[0.12]"
        />
      </div>
      <div className="mb-6 flex items-center justify-center">
        <div className="flex items-center gap-x-1 rounded-2xl border border-fg/10 bg-primary/10 p-1 backdrop-blur-sm dark:bg-primary/5">
          <Toggle
            className="w-20"
            intent="plain"
            isSelected={monthly}
            onChange={() => setMonthly(!monthly)}
          >
            Monthly
          </Toggle>
          <Separator orientation="vertical" className="h-6 w-px bg-sky-700/30" />
          <Toggle
            className="w-20"
            intent="plain"
            isSelected={!monthly}
            onChange={() => setMonthly(!monthly)}
          >
            Yearly
          </Toggle>
        </div>
        {/*</div>*/}
      </div>
      <div className="relative border-fg/10 lg:border-y">
        <div className="absolute hidden h-[12rem] w-full border-fg/10 border-b bg-secondary/20 lg:block" />
        <Container className="px-0">
          <div className="relative grid border-x lg:grid-cols-3 lg:divide-x lg:divide-fg/10">
            {prices.map((price) => (
              <div key={price.id}>
                <div className="relative border-y bg-secondary/50 px-4 py-6 lg:border-y-0 lg:bg-transparent lg:px-12 lg:py-14">
                  {price.name === "Standard" ? (
                    <Badge intent="info" className="top-6 left-10 lg:absolute">
                      Most Popular
                    </Badge>
                  ) : null}
                  <h3 className="mt-2 font-bold text-2xl lg:mt-0">
                    $
                    <span className="tabular-nums">
                      {monthly ? price.price.monthly - 1 : price.price.yearly - 1}{" "}
                      <span className="font-normal text-muted-fg">/ </span>{" "}
                      <span className="font-normal text-base text-muted-fg">
                        {monthly ? "monthly" : "yearly"}
                      </span>
                    </span>
                  </h3>
                  <p className="mt-1 text-base text-muted-fg">{price.description}</p>
                </div>
                <ul aria-label="List Prices" className="relative space-y-2 p-4 lg:not-first:p-12">
                  <li className="mb-4 font-mono text-primary text-sm tracking-tight">
                    {price.name} benefits
                  </li>
                  {price.name === "Standard" ? (
                    <li className="absolute inset-x-0 bottom-0 h-28 w-full bg-linear-to-t from-bg via-bg/80" />
                  ) : price.name === "Basic" ? (
                    <li className="absolute inset-x-0 bottom-0 h-56 w-full bg-linear-to-t from-bg via-bg/80" />
                  ) : null}
                  {price.benefits.map((benefit) => (
                    <Item key={benefit}>{benefit}</Item>
                  ))}
                  {price.name === "Basic" && (
                    <>
                      <Item plus={false}>Security patches</Item>
                      <Item plus={false}>Resource scaling options</Item>
                      <Item plus={false}>Disaster recovery planning</Item>
                      <Item plus={false}>Compliance management</Item>
                    </>
                  )}
                  {price.name === "Standard" && (
                    <>
                      <Item plus={false}>Disaster recovery planning</Item>
                      <Item plus={false}>Compliance management</Item>
                    </>
                  )}
                </ul>
                <div className="flex justify-center px-4 pb-10 lg:px-14">
                  <Button
                    intent={price.name === "Standard" ? "primary" : "outline"}
                    className="w-full"
                    shape="circle"
                    size="large"
                  >
                    Getting Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <Testimonial />
    </div>
  )
}

interface ItemProps extends React.ComponentProps<"li"> {
  plus?: boolean
}

function Item({ plus = true, ...props }: ItemProps) {
  return (
    <li
      className={twMerge("flex items-center gap-x-4 text-fg/80", !plus && "text-fg/50")}
      {...props}
    >
      {plus ? <IconCheck /> : <IconMinus />}
      {props.children}
    </li>
  )
}
