"use client";
import SearchLocation from "@/components/molecules/SearchLocation";
import { useAppSelector } from "@/store/hooks";
import { Flex, Img, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
const Banner = () => {
    const t = useTranslations("HOME.BANNER");
    const address = useAppSelector((state) => state.userInfo?.userInfo?.address ?? "");
    return (
        <Flex
            p="4rem"
            bg="var(--primary-color)"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            fontSize="6rem"
            color="white"
        >
            <Flex
                flexDir={{
                    base: "column-reverse",
                    md: "row",
                }}
                maxW="1240px"
                alignItems="center"
            >
                <Flex flexDir="column" flex={1}>
                    <Flex fontWeight="bold" flexDir="column">
                        <Text lineHeight="7.4rem" color="var(--sub-text-color)" className="mb-0">
                            {t("TITLE.0")}
                        </Text>
                        <Text lineHeight="7.4rem" color="var(--icterine-500)">
                            {t("TITLE.1")}
                        </Text>
                        <Text lineHeight="7.4rem" color="var(--sub-text-color)">
                            {t("TITLE.2")}
                        </Text>
                        <Text my="3rem" fontSize="1.8rem" lineHeight="2.4rem">
                            {t("DESCRIPTION")}
                        </Text>
                    </Flex>
                    <SearchLocation initValue={address} />
                </Flex>
                <Flex flex={1} ml="-2rem">
                    <Img maxW="100%" h="auto" src="images/banner.png" />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Banner;
