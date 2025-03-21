import sites from "@/resources/data/sites.json"
import { IconBrandGithub, IconClock, IconFolder, IconGitBranches } from "justd-icons"
import { Badge, Card, DetailLine } from "ui"

export function SiteInformation({ commit }: { commit: string }) {
  const site = sites.find((site) => site.commit === commit)
  return (
    <Card>
      <Card.Header>
        <Card.Title>{site?.domain}</Card.Title>
        <Card.Description>
          Last deployed {site?.last_deployed} from {site?.provider} via {site?.branch} branch.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <DetailLine>
          <DetailLine.Item label="Application" description={site?.repo} />
          <DetailLine.Item label="HTTPS">
            <DetailLine.Description>
              <Badge intent={site?.https === "Enabled" ? "success" : "warning"}>
                {site?.https}
              </Badge>
            </DetailLine.Description>
          </DetailLine.Item>
          <DetailLine.Item label="PHP Version" description={site?.php_version} />
          <DetailLine.Item label="Quick Deploy">
            <DetailLine.Description>
              <Badge intent={site?.quick_deploy === "Enabled" ? "success" : "warning"}>
                {site?.quick_deploy}
              </Badge>
            </DetailLine.Description>
          </DetailLine.Item>
          <DetailLine.Item description={site?.web_directory}>
            <DetailLine.Label>Web Directory</DetailLine.Label>
            <DetailLine.Description className="flex max-w-[14rem] items-center gap-x-1 truncate">
              <IconFolder />
              {site?.web_directory}
            </DetailLine.Description>
          </DetailLine.Item>
          <DetailLine.Item label="Provider">
            <DetailLine.Description className="flex items-center gap-x-1">
              <IconBrandGithub />
              {site?.provider}
            </DetailLine.Description>
          </DetailLine.Item>
          <DetailLine.Item label="Branch">
            <DetailLine.Description className="flex items-center gap-x-1">
              <IconGitBranches />
              {site?.branch}
            </DetailLine.Description>
          </DetailLine.Item>
          <DetailLine.Item label="Last Commit">
            <DetailLine.Description className="flex items-center gap-x-1">
              <IconClock />
              {site?.commit}
            </DetailLine.Description>
          </DetailLine.Item>
        </DetailLine>
      </Card.Content>
    </Card>
  )
}
