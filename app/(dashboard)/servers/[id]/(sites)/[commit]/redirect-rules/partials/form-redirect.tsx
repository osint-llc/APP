"use client"

import type React from "react"

import type { Redirect } from "@/resources/types"
import { Button, Form, Modal, Select, TextField, Textarea } from "ui"

export const statuses = [
  {
    id: 1,
    name: "Moved Permanently",
    code: 301,
  },
  {
    id: 2,
    name: "Found (Previously Moved Temporarily)",
    code: 302,
  },
  {
    id: 3,
    name: "Temporary Redirect",
    code: 307,
  },
  {
    id: 4,
    name: "Permanent Redirect",
    code: 308,
  },
]

interface Props {
  submit: (e: React.FormEvent<HTMLFormElement>) => void
  loadingState: {
    update?: boolean
    create?: boolean
  }
  current?: Redirect
}

export function FormRedirect({ submit, loadingState, current }: Props) {
  return (
    <Form onSubmit={submit}>
      <Modal.Body>
        <div className="space-y-6">
          <div className="sm grid grid-cols-2 gap-6">
            <TextField
              defaultValue={current?.from}
              label="From"
              name="from"
              type="text"
              isRequired
            />
            <TextField defaultValue={current?.to} label="To" name="to" type="text" isRequired />
          </div>
          <Select label="Status" defaultSelectedKey={current?.status_code.toString()}>
            <Select.Trigger />
            <Select.List items={statuses}>
              {(item) => (
                <Select.Option id={item.code} textValue={item.code.toString()}>
                  {item.name}
                </Select.Option>
              )}
            </Select.List>
          </Select>
          <Textarea defaultValue={current?.note} label="Note" name="note" type="text" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Close>Cancel</Modal.Close>
        <Button type="submit" isPending={loadingState.create || loadingState.update}>
          {loadingState.update ? "Updating..." : "Update"}
          {loadingState.create ? "Creating..." : "Create"}
        </Button>
      </Modal.Footer>
    </Form>
  )
}
