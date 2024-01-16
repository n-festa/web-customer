import "@/assets/styles/index.scss";
import Header from "@/components/header";
import { svnGilroy } from "@/theme/fonts";
import { ColorModeScript, Flex, theme } from "@chakra-ui/react";
import clsx from "clsx";
import { Viewport } from "next";
import { Inter, Poppins, Quicksand } from "next/font/google";
import React from "react";
import { Providers } from "./providers";

export const metadata = {
    icons: {
        icon: [{ url: "/images/logo.ico", href: "/images/logo.ico", type: "image/x-icon" }],
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

interface LayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}
const inter = Inter({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });
const quicksand = Quicksand({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["500"],
});

export default async function RootLayout({ children }: LayoutProps) {
    return (
        <html suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={clsx(inter.className, poppins.className, svnGilroy.className, quicksand.className)}
            >
                <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
                <Providers>
                    <Flex h="100%" w="100%" overflow="auto" flexDir="column">
                        <Header />
                        <Flex flex={1} w="100%" pt="8rem">
                            {children}
                        </Flex>
                    </Flex>
                </Providers>
            </body>
        </html>
    );
}
