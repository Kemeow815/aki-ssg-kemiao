import { config } from "@/data/site-config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	assetPrefix: config.optimize.cdn_prefix,
	experimental: {
		reactCompiler: true,
	},
};

export default nextConfig;
