import { Button, Card, Checkbox, Form, Link, TextField } from "ui"

export const metadata = {
  title: "Login",
  description: "Access your account by entering your email and password.",
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
          <TextField
            isRequired
            name="password"
            isRevealable
            label="Password"
            type="password"
            placeholder="Your password"
          />
          <div className="flex items-center justify-between">
            <Checkbox label="Remember me" />
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        </Card.Content>
        <Card.Footer className="justify-between">
          <Link className="underline" href="/register">
            Sign up
          </Link>
          <Button type="submit">Sign in</Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
