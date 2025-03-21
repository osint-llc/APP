import { useState } from "react"

import { wait } from "@/resources/helpers"
import { redirect as t } from "next/navigation"
import { toast } from "sonner"

export const useFormSubmit = (successMessage?: string, redirect?: string) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await wait(1000) // Simulate async operation
    setLoading(false)
    setOpen(false)
    if (redirect) {
      if (successMessage) {
        toast.success(successMessage)
      }
      t(redirect)
    }
    if (successMessage) {
      toast.success(successMessage)
    }
  }

  return { loading, open, setOpen, submit }
}
