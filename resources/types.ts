export type Site = {
  id: number
  repo: string
  domain: string
  https: string
  php_version: string
  quick_deploy: string
  envoyer_integration: string
  web_directory: string
  last_deployed: string
  commit: string
  server_id: number
}

export type Server = {
  id: number
  name: string
  ip_address: string
  location: string
  status: string
  created_at: string
  updated_at: string
  os: string
  cpu: string
  memory: string
  disk: string
}

export type Database = {
  id: number
  user_id: number
  driver_id: number
  name: string
  created_at: string
}

export type User = {
  id: number
  username: string
  created_at: string
}

export type Driver = {
  id: number
  name: string
}

export type Rule = {
  id: number
  name: string
  port: string
  type: string
  from?: string
  ip_address: string
  created_at: string
}

export type Queue = {
  id: number
  name: string
  priority: string
  maxRetries: number
  timeout: number
  concurrency: number
  maxPerJob: number
}

export type Template = {
  id: number
  name: string
  content: string
}

export type Daemon = {
  id: number
  command: string
  status: string
  content: string
  directory: string
  user: string
  processes: {
    pid: number
    status: string
  }[]
}

export interface Redirect {
  id: number
  site_id: number
  from: string
  to: string
  status_code: number
  type: string
  note: string
  created_at: string
}

export interface SecurityRule {
  id: number
  name: string
  path: string
  username: string
  password: string
}
