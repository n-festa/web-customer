const path = require("path");
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    distDir: "dist",
    env: {
        API_URL: process.env.NEXT_PUBLIC_URL_SERVICE,
        GEO_GOONG_API_KEY: process.env.GEO_GOONG_API_KEY,
        CAPTCHA_KEY: process.env.CAPTCHA_KEY,
    },
};

module.exports = withNextIntl(nextConfig);
