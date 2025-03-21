import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { siteConfig } from "@/resources/site-config"
import { IconFolder, IconTerminal } from "justd-icons"
import { Button, Form, Modal, Select, TextField } from "ui"

export function CreateDaemon() {
  const { open, setOpen, submit, loading } = useFormSubmit(
    "The daemon has been created successfully.",
  )
  return (
    <div>
      <Button onPress={() => setOpen(true)}>Create Daemon</Button>
      <Modal.Content size="2xl" onOpenChange={setOpen} isOpen={open}>
        <Modal.Header title="Create Daemon" description="Create a new daemon for your server." />
        <Form onSubmit={submit} className="flex flex-col">
          <Modal.Body className="space-y-6">
            <TextField
              placeholder="Running queue."
              label="Name"
              name="name"
              type="text"
              isRequired
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                prefix={<IconTerminal />}
                label="Command"
                placeholder="artisan queue:work --queue=default --sleep=3 --tries=3"
                name="command"
                type="text"
                isRequired
              />
              <TextField
                prefix={<IconFolder />}
                placeholder={`/home/${siteConfig.name.toLowerCase()}/example.com/`}
                label="Directory"
                name="directory"
                type="text"
                isRequired
              />
            </div>
            <TextField placeholder="root" label="User" name="user" type="text" isRequired />
            <div className="grid gap-6 sm:grid-cols-2">
              <Select label="Processes">
                <Select.Trigger />
                <Select.List
                  items={[1, 2, 3, 4, 5].map((item) => ({ label: item.toString(), value: item }))}
                >
                  {(item) => (
                    <Select.Option id={item.value} textValue={item.label}>
                      {item.label}
                    </Select.Option>
                  )}
                </Select.List>
              </Select>
              <Select label="Stop Signal">
                <Select.Trigger />
                <Select.List items={signals}>
                  {(item) => (
                    <Select.Option id={item.label} textValue={item.label}>
                      <Select.OptionDetails {...item} />
                    </Select.Option>
                  )}
                </Select.List>
              </Select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>Cancel</Modal.Close>
            <Button type="submit" isPending={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Content>
    </div>
  )
}

const signals = [
  {
    label: "SIGHUP",
    description: "Hangup detected on controlling terminal or death of controlling process",
  },
  { label: "SIGINT", description: "Interrupt from keyboard" },
  { label: "SIGQUIT", description: "Quit from keyboard" },
  { label: "SIGILL", description: "Illegal Instruction" },
  { label: "SIGTRAP", description: "Trace/breakpoint trap" },
  { label: "SIGABRT", description: "Abort signal from abort(3)" },
  { label: "SIGBUS", description: "Bus error (bad memory access)" },
  { label: "SIGFPE", description: "Floating-point exception" },
  { label: "SIGKILL", description: "Kill signal" },
  { label: "SIGUSR1", description: "User-defined signal 1" },
  { label: "SIGSEGV", description: "Invalid memory reference" },
  { label: "SIGUSR2", description: "User-defined signal 2" },
  { label: "SIGPIPE", description: "Broken pipe: write to pipe with no readers" },
  { label: "SIGALRM", description: "Timer signal from alarm(2)" },
  { label: "SIGTERM", description: "Termination signal" },
  { label: "SIGCHLD", description: "Child stopped or terminated" },
  { label: "SIGCONT", description: "Continue if stopped" },
  { label: "SIGSTOP", description: "Stop process" },
  { label: "SIGTSTP", description: "Stop typed at terminal" },
  { label: "SIGTTIN", description: "Terminal input for background process" },
  { label: "SIGTTOU", description: "Terminal output for background process" },
]
