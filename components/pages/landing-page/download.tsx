import { Flex, HStack, Img, Text, VStack } from "@chakra-ui/react";
import MobileMock from "./mobile_mock";
import { useTranslations } from "next-intl";

const Download = () => {
    const t = useTranslations("HOME.DOWNLOAD_APP");
    return (
        <Flex id="download-section" scrollMarginTop="8rem">
            <Flex
                justifyContent={{
                    base: "center",
                    lg: "space-between",
                }}
                h="59.2rem"
                w="100%"
                overflow="hidden"
                bg="var(--color-darkslategray-100)"
            >
                <VStack
                    position="relative"
                    alignItems="flex-start"
                    py="9.6rem"
                    pl="11.2rem"
                    spacing="2.rem"
                    className=""
                    pr="11.4rem"
                >
                    <Text
                        zIndex={1}
                        fontSize="4.8rem"
                        fontWeight={600}
                        letterSpacing="-0.02em"
                        color="var(--primary-button-text-color)"
                    >
                        {t("TITLE")}
                    </Text>
                    <Text zIndex={1} maxW="57.6rem" fontSize="2rem" lineHeight="3rem" color="white">
                        {t("DESCRIPTION")}
                    </Text>
                    <HStack zIndex={1} spacing="1.2rem" mt="4.8rem">
                        <Img cursor="pointer" className="" alt="" src="/images/mobile-app-store-badge.svg" />
                        <Img cursor="pointer" className="" alt="" src="/images/mobile-app-store-badge1.svg" />
                    </HStack>
                    <Img mt="2.5rem" w="42.4rem" h="42.4rem" alt="" src="/images/foodbox-2-1@2x.png" />
                    <Img
                        zIndex={0}
                        w="23rem"
                        h="21.8rem"
                        position="absolute"
                        bottom="7.8rem"
                        right="0"
                        alt=""
                        src="/images/foodbox-5-1@2x.png"
                    />
                </VStack>
                <Flex
                    display={{
                        base: "none",
                        lg: "flex",
                    }}
                    w="fit-content"
                    position="relative"
                    h="40rem"
                    mt="7.6rem"
                    mr="9.5rem"
                >
                    <MobileMock />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Download;
