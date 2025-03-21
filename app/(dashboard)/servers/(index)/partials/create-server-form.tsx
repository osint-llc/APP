"use client"

import React from "react"

import { IconBrandAws } from "@/components/icons/icon-brand-aws"
import { IconBrandAzure } from "@/components/icons/icon-brand-azure"
import { IconBrandDo } from "@/components/icons/icon-brand-do"
import { IconBrandGcp } from "@/components/icons/icon-brand-gcp"
import { IconBrandHetzner } from "@/components/icons/icon-brand-hetzner"
import { IconBrandHostinger } from "@/components/icons/icon-brand-hostinger"
import { IconBrandLinode } from "@/components/icons/icon-brand-linode"
import { IconBrandScaleway } from "@/components/icons/icon-brand-scaleway"
import { IconBrandVultr } from "@/components/icons/icon-brand-vultr"
import database_drivers from "@/resources/data/database-drivers.json"
import phpVersions from "@/resources/data/php-versions.json"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import type { Key } from "react-aria-components"
import {
  Button,
  Checkbox,
  CheckboxGroup,
  ComboBox,
  Description,
  Form,
  Modal,
  NumberField,
  Select,
  TextField,
} from "ui"

interface Provider {
  id: string
  name: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const providers: Provider[] = [
  { id: "digitalocean", name: "DigitalOcean", icon: IconBrandDo },
  { id: "vultr", name: "Vultr", icon: IconBrandVultr },
  { id: "aws", name: "Amazon Web Services", icon: IconBrandAws },
  { id: "google", name: "Google Cloud Platform", icon: IconBrandGcp },
  { id: "azure", name: "Microsoft Azure", icon: IconBrandAzure },
  { id: "linode", name: "Linode", icon: IconBrandLinode },
  { id: "scaleway", name: "Scaleway", icon: IconBrandScaleway },
  { id: "hetzner", name: "Hetzner", icon: IconBrandHetzner },
  { id: "hostinger", name: "Hostinger", icon: IconBrandHostinger },
]

const regions = [
  { id: "us-east-1", name: "US East (N. Virginia)" },
  { id: "us-west-1", name: "US West (N. California)" },
  { id: "us-west-2", name: "US West (Oregon)" },
  { id: "eu-central-1", name: "EU (Frankfurt)" },
  { id: "eu-west-1", name: "EU (Ireland)" },
  { id: "eu-west-2", name: "EU (London)" },
  { id: "ap-southeast-1", name: "Asia Pacific (Singapore)" },
  { id: "ap-southeast-2", name: "Asia Pacific (Sydney)" },
  { id: "ap-northeast-1", name: "Asia Pacific (Tokyo)" },
  { id: "sa-east-1", name: "South America (São Paulo)" },
]

interface ServerFormProps {
  setIsOpen?: (isOpen: boolean) => void
  isOpen?: boolean
}

export function CreateServerForm({ isOpen, setIsOpen }: ServerFormProps) {
  const [serverType, setServerType] = React.useState<Key>("app")
  const [phpVersion, setPhpVersion] = React.useState<Key>("")
  const { loading, submit } = useFormSubmit("The server has been created successfully.")
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await submit(e).then(() => {
      if (setIsOpen) {
        setIsOpen(false)
      }
    })
  }
  return (
    <Modal.Content
      isDismissable={false}
      isKeyboardDismissDisabled
      size="4xl"
      onOpenChange={setIsOpen}
      isOpen={isOpen}
    >
      <Modal.Header>
        <Modal.Title>New Server</Modal.Title>
        <Modal.Description>
          Create a new server for your application. You can use this server to host your
          application's code and data.
        </Modal.Description>
      </Modal.Header>
      <Form onSubmit={handleSubmit} className="flex flex-col">
        <Modal.Body>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <Select isRequired label="Provider" name="provider">
              <Select.Trigger />
              <Select.List items={providers}>
                {(item) => (
                  <Select.Option className="capitalize">
                    <item.icon />
                    <Select.Label>{item.name}</Select.Label>
                  </Select.Option>
                )}
              </Select.List>
            </Select>
            <Select
              isRequired
              label="Server Type"
              name="server_type"
              onSelectionChange={setServerType}
              selectedKey={serverType}
            >
              <Select.Trigger />
              <Select.List>
                {["app", "worker", "load_balancer", "cache", "database", "system"].map(
                  (type, i) => (
                    <Select.Option className="capitalize" id={type} key={i}>
                      {type.replace("_", " ")}
                    </Select.Option>
                  ),
                )}
              </Select.List>
            </Select>
            <TextField label="Name" name="name" type="text" isRequired />
            <TextField label="IP Address" name="ipAddress" type="text" isRequired />
            <NumberField label="SSH Port" name="sshPort" isRequired />
            <ComboBox isRequired label="Region" name="type" placeholder="Select a region">
              <ComboBox.Input />
              <ComboBox.List items={regions}>
                {(item) => <ComboBox.Option>{item.name}</ComboBox.Option>}
              </ComboBox.List>
            </ComboBox>

            {serverType === "app" && (
              <>
                <Select
                  isRequired
                  label="PHP Version"
                  name="php_version"
                  onSelectionChange={setPhpVersion}
                  selectedKey={phpVersion}
                >
                  <Select.Trigger />
                  <Select.List items={phpVersions}>
                    {(item) => <Select.Option className="capitalize">{item.name}</Select.Option>}
                  </Select.List>
                  {phpVersion === 1 && (
                    <Description isWarning>
                      We recommend using PHP 7.4+ for new projects.
                    </Description>
                  )}
                </Select>
                <Select isRequired label="Database Driver" name="database_driver">
                  <Select.Trigger />
                  <Select.List items={database_drivers}>
                    {(item) => <Select.Option className="capitalize">{item.name}</Select.Option>}
                  </Select.List>
                </Select>

                <CheckboxGroup label="Server Options">
                  <Checkbox
                    value="monitoring"
                    label="Install Monitoring"
                    name="enabled_monitoring"
                  />
                  <Checkbox
                    defaultSelected
                    value="composer"
                    label="Install Composer"
                    name="install_composer"
                  />
                  <Checkbox value="node" label="Install Node.js" name="install_node" />
                  <Checkbox
                    value="ssh_key"
                    label="Add Server's SSH Key To Source Control Providers"
                    name="add_ssh_key"
                  />
                </CheckboxGroup>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>Cancel</Modal.Close>
          <Button type="submit" isPending={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal.Content>
  )
}
