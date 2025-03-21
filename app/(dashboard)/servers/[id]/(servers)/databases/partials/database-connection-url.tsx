import { Snippet } from "@/components/ui/snippet"
import servers from "@/resources/data/servers.json"
import { getModel } from "@/resources/eloquent"
import { siteConfig } from "@/resources/site-config"
import { Card } from "ui"

export function DatabaseConnectionUrl() {
  return (
    <Card>
      <Card.Header
        title="Connection URL"
        description="Use the database connection string below to hook up to your database from your client. We suggest going with TablePlus. Just remember, you’ll need to enter the database password you got by email when you set up this server."
      />
      <Card.Content>
        <Snippet
          text={`mysql+ssh://${siteConfig.name}@217.15.160.66/${siteConfig.name}@127.0.0.1/${siteConfig.name}?ip=${getModel(servers, "id", 1)?.ip_address}&usePrivateKey=true`.toLowerCase()}
        />
      </Card.Content>
    </Card>
  )
}
