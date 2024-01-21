const path = require("path");

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    distDir: "dist",
};
