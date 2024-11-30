import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://localhost:4200/api/:path*',
			},
		]
	}
};

export default nextConfig;