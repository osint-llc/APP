import { IconArrowLeft } from "justd-icons"
import { Button, Card, Form, Link, TextField } from "ui"

export const metadata = {
  title: "Forgot Password",
  description: "Reset your password by following the instructions sent to your email.",
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
        </Card.Content>
        <Card.Footer className="justify-between">
          <Link intent="secondary" href="/login">
            <IconArrowLeft />
            Cancel
          </Link>
          <Button type="submit">Send Reset Link</Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
