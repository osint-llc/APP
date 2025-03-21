"use client"

import React from "react"

import { Editable } from "@/components/ui/editable"
import { wait } from "@/resources/helpers"
import { toast } from "sonner"
import { Button, Card } from "ui"

export function DeployScript() {
  const [loading, setLoading] = React.useState(false)
  function update() {
    setLoading(true)
    wait(2000).then(() => {
      setLoading(false)
      toast.success("Script updated")
    })
  }
  return (
    <Card>
      <Card.Header title="Deployment Script" />
      <Card.Content>
        <Editable>
          {`cd /home/ployman/irsyad.co
$artisan down
git stash
$artisan filament:clear-cached-components
$artisan icons:clear
git pull origin $PLOYMAN_SITE_BRANCH
$composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

( flock -w 10 9 || exit 1
echo 'Restarting FPM...'; sudo -S service $PLOYMAN_PHP_FPM reload ) 9>/tmp/fpmlock

if [ -f artisan ]; then
$artisan migrate --force
fi

bun i && bun run prod

$artisan ziggy:generate
$artisan filament:cache-components
$artisan icons:cache
$artisan route:cache
$artisan event:cache
$artisan config:cache
$artisan horizon:terminate
$artisan inertia:stop-ssr
$artisan generate:search
$artisan up

# $artisan reverb:restart`}
        </Editable>
      </Card.Content>
      <Card.Footer>
        <Button onPress={update} isPending={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </Card.Footer>
    </Card>
  )
}
