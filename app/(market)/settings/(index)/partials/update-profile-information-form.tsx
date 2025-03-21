"use client"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Form, TextField } from "ui"

const data = {
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  phone: "123-456-7890",
  address: "123 Main St",
  city: "Anytown",
  state: "CA",
  zip: "12345",
}

export function UpdateProfileInformationForm() {
  const { loading, submit } = useFormSubmit("Profile is updated successfully.")
  return (
    <Card>
      <Card.Header
        title="Update Profile Information"
        description="Update your profile information to access your account."
      />
      <Form onSubmit={submit}>
        <Card.Content className="grid gap-6 sm:grid-cols-2">
          <TextField
            isRequired
            label="First Name"
            name="first_name"
            defaultValue={data.first_name}
          />
          <TextField isRequired label="Last Name" name="last_name" defaultValue={data.last_name} />
          <TextField isRequired label="Email" name="email" defaultValue={data.email} />
          <TextField isRequired label="Phone" type="tel" name="phone" defaultValue={data.phone} />
          <TextField isRequired label="Address" name="address" defaultValue={data.address} />
          <TextField isRequired label="City" name="city" defaultValue={data.city} />
          <TextField isRequired label="State" name="state" defaultValue={data.state} />
          <TextField isRequired label="Zip" name="zip" defaultValue={data.zip} />
        </Card.Content>
        <Card.Footer>
          <Button type="submit" isPending={loading}>
            Update
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
