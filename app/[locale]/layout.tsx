import "@/assets/styles/index.scss";
import CartModal from "@/components/modal/CartModal";
import DialogWrapper from "@/components/modal/dialog/DialogWrapper";
import Loading from "@/components/organism/Loading";
import Footer from "@/components/organism/footer";
import Header from "@/components/organism/header";
import { quicksand } from "@/theme/fonts";
import { Box, ColorModeScript, Flex, theme } from "@chakra-ui/react";
import { Viewport } from "next";
import { useMessages } from "next-intl";
import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/global.css";
import "../../assets/css/style.css";
import ProviderInlt from "./providerInlt";
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

export default function RootLayout({ children, params: { locale } }: LayoutProps) {
    const messages = useMessages();

    return (
        <html suppressHydrationWarning lang={locale}>
            <body suppressHydrationWarning className={`${quicksand.className}`}>
                <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
                <ProviderInlt locale={locale} messages={messages}>
                    <Providers>
                        <Flex
                            pos="absolute"
                            h="calc(100% - 8rem)"
                            w="100%"
                            top="8rem"
                            bg="var(--main-bg-color)"
                            overflow="overlay"
                            flexDir="column"
                        >
                            <Header />
                            <Box flex={1}>{children}</Box>
                            <Footer />
                            <CartModal />
                            <DialogWrapper />
                            <Loading />
                        </Flex>
                    </Providers>
                </ProviderInlt>
            </body>
        </html>
    );
}
