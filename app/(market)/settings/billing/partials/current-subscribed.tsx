"use client"

import { IconArrowUpRight } from "justd-icons"
import { Badge, Card, DetailLine, Link, buttonStyles } from "ui"

export function CurrentSubscribed() {
  return (
    <Card>
      <Card.Header
        title="Current Subscribed"
        description="You are currently subscribed to the following plan."
      />
      <Card.Content>
        <DetailLine>
          <DetailLine.Item label="Plan" description="Pro" />
          <DetailLine.Item label="Amount" description="$3100" />
          <DetailLine.Item label="Expires" description="2024-11-07" />
          <DetailLine.Item label="Next Billing Date" description="2025-11-07" />
          <DetailLine.Item label="Status">
            <DetailLine.Description>
              <Badge intent="success">Active</Badge>
            </DetailLine.Description>
          </DetailLine.Item>
        </DetailLine>
      </Card.Content>
      <Card.Footer>
        <Link className={buttonStyles({ intent: "outline" })} href="#">
          Manage Subscription
          <IconArrowUpRight />
        </Link>
      </Card.Footer>
    </Card>
  )
}
