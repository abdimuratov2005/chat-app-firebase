import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
