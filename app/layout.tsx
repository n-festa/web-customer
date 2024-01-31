import "@/assets/styles/index.scss";
import { quicksand } from "@/theme/fonts";
import { ColorModeScript, Flex, theme } from "@chakra-ui/react";
import { Viewport } from "next";
import React from "react";
import { Providers } from "./providers";

import CartModal from "@/components/modal/CartModal";
import DialogWrapper from "@/components/modal/dialog/DialogWrapper";
import Footer from "@/components/organism/footer";
import Header from "@/components/organism/header";
import "../assets/css/bootstrap.min.css";
import "../assets/css/global.css";
import "../assets/css/style.css";

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

export default async function RootLayout({ children }: LayoutProps) {
    return (
        <html suppressHydrationWarning>
            <body suppressHydrationWarning className={`${quicksand.className}`}>
                <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
                <Providers>
                    <Flex h="100%" w="100%" overflow="auto" flexDir="column">
                        <Header />
                        <Flex flex={1} w="100%" pt="8rem">
                            {children}
                        </Flex>
                        <Footer />
                        <CartModal />
                        <DialogWrapper />
                    </Flex>
                </Providers>
            </body>
        </html>
    );
}
