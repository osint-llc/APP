"use client"

import React from "react"

import Image from "next/image"
import { toast } from "sonner"
import { Button, Card, Form, InputOTP, Loader, Modal, TextField } from "ui"

export function TwoFactorAuth() {
  const [openOtpConfirmation, setOpenOtpConfirmation] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [isPending, setIsPending] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)

  function enableTwoFactor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      setOpenOtpConfirmation(true)
      toast.success("Great, now we need to confirm your code.")
      setOpen(false)
    }, 1000)
  }

  function finishing(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toast.success("Two factor authentication has been enabled successfully.")
    setOpen(false)
    setOpenOtpConfirmation(false)

    setIsActive(true)
  }

  return (
    <>
      <Card>
        <Card.Header
          title="Two Factor"
          description="Add an extra layer of security to your account."
        />

        <Card.Content>
          <Button
            onPress={() => {
              setOpen(true)
            }}
          >
            {isActive ? "Disable" : "Enable"} Two Factor Authentication
          </Button>
        </Card.Content>
      </Card>
      <Modal.Content isOpen={open} onOpenChange={setOpen}>
        <Modal.Header
          title="Enter Password"
          description={`Enter your password to ${isActive ? "disable" : "enable"} two factor authentication.`}
        />
        <Form onSubmit={enableTwoFactor} className="flex flex-col">
          <Modal.Body>
            <TextField name="password" label="Password" type="password" isRequired />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            <Button type="submit">
              {isPending && <Loader variant="spin" />}
              {isPending ? "Continue..." : "Continue"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
      <Modal.Content isOpen={openOtpConfirmation} onOpenChange={setOpenOtpConfirmation}>
        <Modal.Header
          className="bg-secondary px-0 sm:items-center"
          title="Confirm Code"
          description="Enter the code sent to your phone."
        />
        <Form onSubmit={finishing} className="flex flex-col">
          <Modal.Body className="items-center overflow-hidden sm:px-0 sm:py-2">
            <div className="-mt-2 mb-2 flex w-full justify-center border-y bg-white">
              <Image className="mb-2" src="/qr.png" alt="Qr code" width={200} height={200} />
            </div>
            <Otp />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            <Button type="submit">Finish</Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </>
  )
}

function Otp() {
  return (
    <InputOTP maxLength={6}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  )
}
