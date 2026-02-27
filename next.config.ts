import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
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
