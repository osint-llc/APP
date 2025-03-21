"use client"

import invoices from "@/resources/data/invoices.json"
import { Badge, Card, Table } from "ui"

export function ListInvoices() {
  return (
    <Card>
      <Card.Header title="Invoices" description="Here you can view all your invoices." />
      <Card.Content>
        <Table aria-label="Invoices">
          <Table.Header>
            <Table.Column isRowHeader>ID</Table.Column>
            <Table.Column>Customer Name</Table.Column>
            <Table.Column>Plan</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Due Date</Table.Column>
            <Table.Column>Paid Date</Table.Column>
          </Table.Header>
          <Table.Body items={invoices}>
            {(item) => (
              <Table.Row>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.customer_name}</Table.Cell>
                <Table.Cell>{item.plan}</Table.Cell>
                <Table.Cell className="tabular-nums">${item.amount}</Table.Cell>
                <Table.Cell>
                  <Badge intent={item.status === "paid" ? "success" : "warning"}>
                    {item.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{item.due_date}</Table.Cell>
                <Table.Cell>{item.paid_date || "-"}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  )
}
