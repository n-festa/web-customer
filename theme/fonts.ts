import localFont from "next/font/local";

const svnGilroy = localFont({
    src: [
        {
            path: "../assets/fonts/SVNGilroyBold.woff",
            weight: "700",
        },
        {
            path: "../assets/fonts/SVNGilroyLight.woff",
            weight: "300",
        },
    ],
    variable: "--font-svn-gilroy",
});

export { svnGilroy };
