/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/login",
      permanent: false,
    },
  ],
};

export default nextConfig;
