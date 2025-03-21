"use client"

import React from "react"

import { Editable } from "@/components/ui/editable"
import { IconChevronLgDown } from "justd-icons"
import { Button, Card, Menu } from "ui"

export function ServerLogs() {
  const [selectedHeader, setSelectedHeader] = React.useState(1)
  return (
    <Card>
      <Card.Header className="flex flex-col justify-between gap-2 md:flex-row">
        <div className="max-w-xl space-y-1">
          <Card.Title>{logs.find((item) => item.id === selectedHeader)?.title}</Card.Title>
          <Card.Description>
            {logs.find((item) => item.id === selectedHeader)?.description}
          </Card.Description>
        </div>
        <Menu>
          <Button intent="outline" className="group justify-between">
            View Logs...
            <IconChevronLgDown className="size-4 transition group-data-pressed:rotate-180" />
          </Button>
          <Menu.Content
            items={logs}
            onAction={(action) => {
              setSelectedHeader(action as number)
            }}
          >
            {(item) => <Menu.Item id={item.id}>{item.title}</Menu.Item>}
          </Menu.Content>
        </Menu>
      </Card.Header>
      <Card.Content>
        <Editable>
          <pre className="whitespace-pre-wrap break-all">
            {`# ${logs.find((item) => item.id === selectedHeader)?.title}
                        
${logs.find((item) => item.id === selectedHeader)?.content}`}
          </pre>
        </Editable>
      </Card.Content>
      <Card.Footer className="font-mono text-muted-fg text-xs tracking-tight">
        Server logs are stored in the <code>/var/log</code> directory on the server. The logs can be
        accessed via SSH or SFTP.
      </Card.Footer>
    </Card>
  )
}

const logs = [
  {
    id: 1,
    title: "Nginx Error",
    description:
      "Logs any errors encountered by the Nginx web server, including issues with configuration, upstream failures, and server-related errors that prevent normal operations.",
    content:
      '2023/08/01 12:00:00 [error] 1234#5678: *1 connect() failed (111: Connection refused) while connecting to upstream, client: 127.0.0.1, server: example.com, request: "GET / HTTP/1.1", upstream: "http://127.0.0.1:8080/", host: "example.com"',
  },
  {
    id: 2,
    title: "Nginx Access",
    description:
      "Records requests made to the Nginx server, showing information like IP addresses, request methods, response codes, and resource access times.",
    content:
      '2023/08/01 12:00:00 127.0.0.1 - - [2023-08-01T12:00:00.000Z] "GET /index.php HTTP/1.1" 200 0 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36" "-"',
  },
  {
    id: 3,
    title: "PHP 5.6",
    description:
      "Logs specific to PHP version 5.6, capturing runtime errors, warnings, and deprecated notices for applications using this PHP version.",
    content:
      "[01-Aug-2023 12:00:00] PHP Warning:  mysqli_connect(): (HY000/1045): Access denied for user 'root'@'localhost' (using password: YES) in /var/www/html/index.php on line 3",
  },
  {
    id: 4,
    title: "PHP 7.1",
    description:
      "Captures logs for PHP 7.1, including errors, warnings, and compatibility issues unique to this version, helping track issues in applications using PHP 7.1.",
    content:
      "[01-Aug-2023 12:00:00] PHP Notice:  Undefined variable: data in /var/www/html/index.php on line 5",
  },
  {
    id: 5,
    title: "PHP 7.2",
    description:
      "Logs detailing errors, warnings, and other runtime information for PHP 7.2, aiding in debugging and monitoring applications running on this version.",
    content:
      "[01-Aug-2023 12:00:00] PHP Fatal error:  Uncaught Error: Call to undefined function mysql_connect() in /var/www/html/index.php:10 Stack trace: #0 {main} thrown in /var/www/html/index.php on line 10",
  },
  {
    id: 6,
    title: "PHP 7.3",
    description:
      "Contains logs for PHP 7.3, recording errors, warnings, and version-specific notices that assist in maintaining applications compatible with PHP 7.3.",
    content:
      "[01-Aug-2023 12:00:00] PHP Deprecated:  Array and string offset access syntax with curly braces is deprecated in /var/www/html/index.php on line 8",
  },
  {
    id: 7,
    title: "PHP 8.2",
    description:
      "Logs for PHP 8.2, highlighting runtime errors, warnings, and new feature notifications relevant to applications utilizing PHP 8.2.",
    content:
      '[01-Aug-2023 12:00:00] PHP Warning:  Undefined array key "name" in /var/www/html/index.php on line 12',
  },
  {
    id: 8,
    title: "PHP 8.4",
    description:
      "Provides log details for PHP 8.4, documenting runtime information, error logs, and performance issues specific to this version.",
    content:
      "[01-Aug-2023 12:00:00] PHP Fatal error:  Unsupported operand types: string + int in /var/www/html/index.php on line 15",
  },
  {
    id: 9,
    title: "MySQL",
    description:
      "Contains logs for MySQL database operations, including connection events, query errors, slow queries, and performance metrics crucial for database management.",
    content:
      "2023-08-01T12:00:00.000Z [ERROR] [MY-010326] [Server] Access denied for user 'root'@'localhost' (using password: YES)",
  },
  {
    id: 10,
    title: "Postgres",
    description:
      "Logs for PostgreSQL database activities, tracking events such as authentication attempts, query execution details, error reports, and performance insights.",
    content: "2023-08-01 12:00:00.000 UTC [1] LOG:  connection authorized: user=root database=test",
  },
  {
    id: 11,
    title: "SSH Auth",
    description:
      "Logs authentication events over SSH, capturing successful and failed login attempts, user activity, and other security-related events for SSH sessions.",
    content:
      "2023-08-01 12:00:00 sshd[12345]: Accepted publickey for root from 127.0.0.1 port 22 ssh2: RSA SHA256:AbcDeFghIjklMnopQrStuVwxYz",
  },
]
