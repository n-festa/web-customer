"use client";
import { persistor, store } from "@/store";
import theme from "@/theme";
import { requestGEOPermission } from "@/utils/functions";
import { ChakraProvider } from "@chakra-ui/react";
import React, { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import { PersistGate } from "redux-persist/integration/react";

export const locationRef: React.MutableRefObject<{ lng: number; lat: number } | null> = React.createRef<{
    lng: number;
    lat: number;
}>();

export const apiKeyRef: React.MutableRefObject<string | null> = React.createRef<string>();
export function Providers({ children }: PropsWithChildren) {
    useEffect(() => {
        //Update Geo Location
        requestGEOPermission();
    }, []);
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RecoilRoot>
                    <RecoilNexus />
                    <ChakraProvider theme={theme}>{children}</ChakraProvider>;
                </RecoilRoot>
            </PersistGate>
        </Provider>
    );
}
