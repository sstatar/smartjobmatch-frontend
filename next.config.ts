import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
    	return [
      	    {
        	source: '/',          // The initial path
        	destination: '/login', // The new default page
        	permanent: true,      // Makes the redirect permanent (HTTP 301)
      	    },
    	];
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "**",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    turbopack: {
        rules: {
            "*.svg": {
                loaders: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            icon: true,
                            svgo: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: "removeViewBox",
                                        active: false,
                                    },
                                    {
                                        name: "removeDimensions",
                                        active: true,
                                    },
                                ],
                            },
                        },
                    },
                ],
                as: "*.js",
            },
        },
    },
};

export default nextConfig;
