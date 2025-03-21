"use client"

import { Snippet } from "@/components/ui/snippet"
import { useParams } from "next/navigation"
import { Card } from "ui"

export function DeployTriggerUrl() {
  const { id, commit } = useParams()
  return (
    <Card>
      <Card.Header
        title="Deployment Trigger URL"
        description={
          "Using a CI service to run tests before shipping to world? Easy stuff. Drop fresh code, or when your CI wraps up testing, have it hit up this URL with a GET or POST. That’ll fire off your deploy script like magic"
        }
      />
      <Card.Content>
        <Snippet
          className="max-w-2xl"
          text={`https://ployman.com/servers/${id}/sites/${commit}/deploy/http?token=q5ln5nhuc9pi2sbxd2wtt66tvhrx66kpaqla8hqi2hrj95jst7hxs0pr`}
        />
      </Card.Content>
    </Card>
  )
}
