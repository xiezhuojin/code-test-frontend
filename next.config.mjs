/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/weather",
        destination: "http://172.17.0.4:5000/api/weather"
      }
    ];
  },
};

export default nextConfig;
