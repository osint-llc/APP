import { Button, Card, Form, Link, TextField } from "ui"

export const metadata = {
  title: "Register",
  description: "Create a new account to get started with our services.",
}

export default function Page() {
  return (
    <Card>
      <Card.Header title={metadata.title} description={metadata.description} />
      <Form>
        <Card.Content className="flex flex-col gap-y-6">
          <TextField isRequired name="name" label="Name" type="text" placeholder="John Doe" />
          <TextField
            isRequired
            name="email"
            label="Email"
            type="email"
            placeholder="john@doe.com"
          />
          <TextField
            isRequired
            name="password"
            isRevealable
            label="Password"
            type="password"
            placeholder="Your password"
          />
          <TextField
            isRequired
            name="password_confirmation"
            isRevealable
            label="Confirm Password"
            type="password"
            placeholder="Your password"
          />
        </Card.Content>
        <Card.Footer className="justify-between">
          <span className="text-muted-fg">
            Already have account ?{" "}
            <Link intent="secondary" href="/login">
              Sign in
            </Link>
          </span>
          <Button type="submit">Sign in</Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
