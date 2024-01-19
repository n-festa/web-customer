"use client";

import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
