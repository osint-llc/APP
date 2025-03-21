"use client"

import type React from "react"

import type { SecurityRule } from "@/resources/types"
import { Button, Form, Modal, TextField } from "ui"

interface Props {
  submit: (e: React.FormEvent<HTMLFormElement>) => void
  loadingState: {
    update?: boolean
    create?: boolean
  }
  current?: SecurityRule
}

export function FormSecurityRule({ submit, loadingState, current }: Props) {
  return (
    <Form onSubmit={submit}>
      <Modal.Body>
        <div className="space-y-6">
          <TextField name="name" defaultValue={current?.name} isRequired label="Name" />
          <TextField name="path" defaultValue={current?.path} isRequired label="Path" />
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              name="username"
              defaultValue={current?.username}
              isRequired
              label="Username"
            />
            <TextField
              name="password"
              defaultValue={current?.password}
              isRequired
              label="Password"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Close>Cancel</Modal.Close>
        <Button type="submit" isPending={loadingState.create || loadingState.update}>
          {loadingState.update ? "Updating..." : loadingState.create ? "Creating..." : "Create"}
        </Button>
      </Modal.Footer>
    </Form>
  )
}
