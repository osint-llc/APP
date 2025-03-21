import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/servers/:path",
        destination: "/servers/:path/sites",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
