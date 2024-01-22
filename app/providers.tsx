"use client";

import theme from "@/theme";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { store } from "@/store";

export function Providers({ children }: PropsWithChildren) {
    return (
        <Provider store={store}>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>;
        </Provider>
    );
}
