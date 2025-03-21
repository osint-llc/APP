"use client"

import React from "react"

import _deploymentHistory from "@/resources/data/deployment-history.json"
import { dateFormat, getColor, title } from "@/resources/helpers"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { IconDotsHorizontal, IconRefresh } from "justd-icons"
import { twMerge } from "tailwind-merge"
import { Badge, Button, Card, Form, Menu, Modal, Table, Tooltip } from "ui"

export function DeployHistory() {
  const { open, submit, loading, setOpen } = useFormSubmit("Rollback to last commit successful.")
  const [deploymentHistory, setDeploymentHistory] = React.useState(_deploymentHistory)

  async function installRollback(e: React.FormEvent<HTMLFormElement>) {
    await submit(e)
    setDeploymentHistory((prev) =>
      prev.map((item) => (item.id === 1 ? { ...item, current: true } : item)),
    )
  }
  return (
    <>
      <Card>
        <Card.Header
          title="Deployment history"
          description="The last 10 deployments made to this application."
        />
        <Card.Content>
          <Table aria-label="Deployment history">
            <Table.Header>
              <Table.Column isRowHeader>ID</Table.Column>
              <Table.Column isRowHeader>Commit</Table.Column>
              <Table.Column>When</Table.Column>
              <Table.Column>Initiated by</Table.Column>
              <Table.Column>Branch</Table.Column>
              <Table.Column>Duration</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column />
            </Table.Header>
            <Table.Body renderEmptyState={() => <Table.Empty />}>
              {deploymentHistory.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>
                    {item.current ? (
                      <Tooltip>
                        <Tooltip.Trigger>
                          <span
                            className={twMerge(
                              "font-mono",
                              item.current ? "text-primary" : "text-muted-fg",
                            )}
                          >
                            {item.commit}
                          </span>
                        </Tooltip.Trigger>
                        <Tooltip.Content showArrow>
                          <div className="text-muted-fg">
                            This is the current <br /> production commit.
                          </div>
                        </Tooltip.Content>
                      </Tooltip>
                    ) : (
                      <span className="text-muted-fg">{item.commit}</span>
                    )}
                  </Table.Cell>
                  <Table.Cell>{dateFormat(item.when)}</Table.Cell>
                  <Table.Cell>{item.initiated_by}</Table.Cell>
                  <Table.Cell>{item.branch}</Table.Cell>
                  <Table.Cell>{item.duration}</Table.Cell>
                  <Table.Cell>
                    <Badge intent={getColor(item.status)}>{title(item.status)}</Badge>
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <Menu>
                      <Button
                        aria-label="Actions"
                        intent="plain"
                        size="small"
                        className="-mr-1 h-6"
                      >
                        <IconDotsHorizontal />
                      </Button>
                      <Menu.Content placement="right top">
                        <Menu.Item
                          onAction={() => {
                            setOpen(true)
                          }}
                        >
                          <IconRefresh />
                          Instant Rollback
                        </Menu.Item>
                      </Menu.Content>
                    </Menu>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
      <Modal.Content size="xl" onOpenChange={() => setOpen(false)} isOpen={open}>
        <Modal.Header>
          <Card.Title>Instant Rollback</Card.Title>
          <Card.Description>
            Are you sure you want to rollback to the last commit? This action cannot be undone.
          </Card.Description>
        </Modal.Header>
        <Modal.Footer>
          <Modal.Close>Cancel</Modal.Close>
          <Form onSubmit={installRollback}>
            <Button className="w-full sm:w-auto" intent="warning" type="submit" isPending={loading}>
              {loading ? "Rolling back..." : "Rollback"}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
