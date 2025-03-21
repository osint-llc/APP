import { IconArrowLeft } from "justd-icons"
import { Button, Card, Form, Link, TextField } from "ui"

export const metadata = {
  title: "Reset Password",
  description:
    "Enter a new password to complete the reset process and regain access to your account.",
}

export default function Page() {
  return (
    <Card>
      <Card.Header title={metadata.title} description={metadata.description} />
      <Form>
        <Card.Content className="flex flex-col gap-y-6">
          <TextField
            isRequired
            name="email"
            label="Email"
            type="email"
            placeholder="john@doe.com"
          />
          <TextField isRequired name="password" label="New Password" type="password" />
          <TextField
            isRequired
            name="password"
            isRevealable
            label="Confirm Password"
            type="password"
          />
        </Card.Content>
        <Card.Footer className="justify-between">
          <Link intent="secondary" href="/login">
            <IconArrowLeft />
            Cancel
          </Link>
          <Button type="submit">Reset Password</Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
