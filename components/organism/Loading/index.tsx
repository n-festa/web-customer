"use client";
import { RootState } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { Center, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export default function Loading({ isLoading }: { isLoading?: boolean }) {
    const globalLoading = useAppSelector((state: RootState) => state.app.globalLoading);
    const loading = globalLoading || isLoading;
    useEffect(() => {
        if (loading) {
            document.body?.classList.add("disable-mouse-event");
        } else {
            document.body?.classList.remove("disable-mouse-event");
        }
    }, [loading]);

    return loading ? (
        <Center zIndex={9999} bg="rgba(255,255,255,0.5)" position="fixed" h="100%" top={0} left={0} right={0}>
            {loading && <Spinner thickness="0.5rem" w="6.5rem" h="6.5rem" color="var(--primary-color)" />}
        </Center>
    ) : (
        <></>
    );
}
