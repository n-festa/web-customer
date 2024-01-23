const path = require("path");

module.exports = {
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
    },
};
