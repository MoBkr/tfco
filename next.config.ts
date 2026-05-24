import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/samnan",          destination: "/samnan/index.html" },
      { source: "/ecit",            destination: "/ecit/index.html" },
      { source: "/ezz-solutions",   destination: "/ezz-solutions/index.html" },
      { source: "/uniford",         destination: "/uniford/index.html" },
      { source: "/samnan-workflow", destination: "/samnan-workflow.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",         value: "SAMEORIGIN" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
