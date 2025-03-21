import { Providers } from "@/components/providers"
import { siteConfig } from "@/resources/site-config"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Toast } from "ui"

import "./globals.css"
import "./t5.css"

const fontSans = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter-sans",
  weight: "300 800",
})
const fontMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "300 700",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Deployment App" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <Toast />
          {children}
        </Providers>
      </body>
    </html>
  )
}
