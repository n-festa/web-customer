import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";

const withNextIntl = createNextIntlPlugin();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default withNextIntl(nextConfig);
