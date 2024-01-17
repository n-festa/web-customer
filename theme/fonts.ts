import { Inter, Poppins, Quicksand } from "next/font/google";
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

export const inter = Inter({ preload: true, weight: ["400", "500", "600", "700"], subsets: ["vietnamese"] });

export const quicksand = Quicksand({ preload: true, weight: ["400", "500", "600", "700"], subsets: ["vietnamese"] });

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["500"],
});

export { svnGilroy };
