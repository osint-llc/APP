"use client"

import { Tabs } from "ui"

import { CloneForm } from "./forms/clone-form"
import { InstallExistingForm } from "./forms/install-existing-form"
import { LeForm } from "./forms/le-form"
import { SignedForm } from "./forms/signed-form"

export function CreateCertificate() {
  return (
    <div>
      <Tabs aria-label="Create Certificate">
        <Tabs.List>
          <Tabs.Tab id="signed">Create signed certificate</Tabs.Tab>
          <Tabs.Tab id="existing">Install existing</Tabs.Tab>
          <Tabs.Tab id="le">Let's Encrypt</Tabs.Tab>
          <Tabs.Tab id="clone">Clone from other</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="signed">
          <SignedForm />
        </Tabs.Panel>
        <Tabs.Panel id="existing">
          <InstallExistingForm />
        </Tabs.Panel>
        <Tabs.Panel id="le">
          <LeForm />
        </Tabs.Panel>
        <Tabs.Panel id="clone">
          <CloneForm />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
