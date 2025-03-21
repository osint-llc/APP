"use client"

import * as React from "react"

import { generateRandomStrings } from "@/resources/helpers"
import { IconCirclePlus } from "justd-icons"
import {
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Description,
  Form,
  Link,
  Note,
  Switch,
  TextField,
} from "ui"

export type VariableType = {
  key: string
  value: string
  sensitive?: boolean
}

export function CreateEv() {
  const [fields, setFields] = React.useState<VariableType[]>([{ key: "", value: "" }])
  const [variables, setVariables] = React.useState<any[]>(_variables)

  const handleInputChange = (index: number, field: keyof VariableType, value: string) => {
    const updatedFields = [...fields]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    updatedFields[index][field] = value
    setFields(updatedFields)
  }

  const addField = () => {
    setFields([...fields, { key: "", value: "" }])
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newVariable = {
      key: fields[fields.length - 1].key.split("@")[0],
      value: generateRandomStrings(32, 1).join("\n"),
    }

    setVariables([newVariable, ...variables])

    setFields([{ key: "", value: "" }])
  }

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header
          title="Environment Variables"
          description="Environment Variables added to the Team can be used by all, or a subset of, your Projects."
        />
        <Card.Content>
          <div className="space-y-4">
            <div>
              <Badge intent="warning">Sensitive</Badge>
            </div>
            <Note>
              <strong>Note</strong> If enabled, you and your team will not be able to read the
              values after creation.
            </Note>
            <Switch> Disabled </Switch>
          </div>
        </Card.Content>

        <Card.Content>
          <div className="mb-2">
            <Badge intent="secondary">Environment</Badge>
          </div>
          <CheckboxGroup aria-label="Environment" defaultValue={["production", "preview"]}>
            <Checkbox value="production">Production</Checkbox>
            <Checkbox value="preview">Preview</Checkbox>
            <Checkbox value="deployment">Deployment</Checkbox>
          </CheckboxGroup>
        </Card.Content>
        <div>
          <Form onSubmit={handleSubmit}>
            <Card.Content>
              {fields.map((field, index) => (
                <div key={index} className="mb-4 grid gap-4 sm:grid-cols-2">
                  <TextField
                    aria-label="Key"
                    isRequired
                    placeholder="key"
                    value={field.key}
                    onChange={(value) => handleInputChange(index, "key", value)}
                  />
                  <TextField
                    aria-label="Value"
                    isRequired
                    placeholder="value"
                    value={field.value}
                    onChange={(value) => handleInputChange(index, "value", value)}
                  />
                </div>
              ))}
              <Button type="button" intent="outline" onPress={addField}>
                <IconCirclePlus />
                Add More
              </Button>
            </Card.Content>
            <Card.Footer className="flex items-center justify-between border-t pt-4 pb-4">
              <Description>
                Invite people to your team. Learn more about{" "}
                <Link href="#" intent="primary">
                  invitations
                </Link>
                .
              </Description>
              <Button type="submit">Create</Button>
            </Card.Footer>
          </Form>
        </div>
      </Card>
    </div>
  )
}

const _variables = [
  {
    id: 1,
    key: "APP_ENV",
    value: "production",
    sensitive: false,
  },
  {
    id: 2,
    key: "APP_DEBUG",
    value: "false",
    sensitive: false,
  },
  {
    id: 3,
    key: "APP_URL",
    value: "https://example.com",
    sensitive: false,
  },
]
