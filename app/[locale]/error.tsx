"use client"; // Error components must be Client Components

import { useAppDispatch } from "@/store/hooks";
import { setError } from "@/store/reducers/appSlice";
import { Button, Center, VStack } from "@chakra-ui/react";
import { BugIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error?: Error & { digest?: string }; reset?: () => void }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const t = useTranslations("COMMON.ERROR");
    useEffect(() => {
        // Log the error to an error reporting service
        console.log(error?.message);
        dispatch(setError(error));
        return () => {
            dispatch(setError(undefined));
        };
    }, [dispatch, error]);

    return (
        <Center w="100%" h="100%">
            <VStack spacing="1.5rem">
                <BugIcon height="5rem" width="5rem" />
                <h1>{t("ERROR_TITLE")}</h1>
                <Button p="2rem" borderRadius="0.8rem" onClick={() => router.push("/")}>
                    {t("BACK_TO_HOME")}
                </Button>
            </VStack>
        </Center>
    );
}
