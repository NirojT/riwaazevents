import type { NextConfig } from "next";

type RemotePatterns = NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]>;

/** The file server's host, so photos uploaded through the CMS are optimised like the site's own. */
const fileServer = (): RemotePatterns => {
  const url = process.env.NEXT_PUBLIC_FILE_URL;
  if (!url) return [];
  const { protocol, hostname, port } = new URL(url);
  return [{ protocol: protocol.replace(":", "") as "http" | "https", hostname, port, pathname: "/**" }];
};

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,

  allowedDevOrigins: ["192.168.1.73"],

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...fileServer(),
    ],
  },

  async redirects() {
    return [
      {
        source: "/event",
        destination: "/events",
        permanent: true,
      },
      {
        source: "/Aboutus",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
