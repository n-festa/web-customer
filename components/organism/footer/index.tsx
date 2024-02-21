"use client";
import { routes } from "@/utils/routes";
import { Flex, HStack, Img, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from "use-intl";

const footerAvailable = [
    routes.Home,
    routes.Otp,
    routes.RegistrationSuccess,
    routes.SignIn,
    routes.AdditionalSignUpInfo,
];
const Footer = () => {
    const t = useTranslations("FOOTER");
    const pathname = usePathname();

    const showFooter = useMemo(() => {
        return footerAvailable.some((item) => pathname.includes(item));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);
    if (!showFooter) return <></>;

    return (
        <Flex
            flexDir="column"
            alignItems="center"
            px={{ base: "1rem", md: "3rem" }}
            justifyContent="center"
            id="footer-section"
        >
            <Flex w="100%" flexDir={{ base: "column", lg: "row" }} mb="4.8rem" mt="6.4rem" justify={"space-evenly"}>
                <VStack alignItems="flex-start" spacing="3.2rem">
                    <Img className="" alt="" src="/images/fictional-company-logo1.svg" />
                    <Text
                        fontSize="1.6rem"
                        className="supporting-text-1"
                        lineHeight="2.4rem"
                        fontWeight={500}
                        maxWidth={{ base: "100%", lg: "32rem" }}
                        mb={{ base: "2rem", lg: "unset" }}
                        mr="1rem"
                    >
                        {t("DESCRIPTION")}
                    </Text>
                </VStack>
                <Flex justifyContent="space-evenly" flex={1}>
                    <VStack
                        px={{ base: "1rem", md: "1.6rem" }}
                        alignItems="flex-start"
                        borderLeft={{ base: "none", lg: "1px solid var(--primary-100)" }}
                        spacing="1.6rem"
                    >
                        <Text
                            wordBreak="keep-all"
                            fontSize="1.4rem"
                            fontWeight={600}
                            lineHeight="2rem"
                            color="var(--primary-100)"
                        >
                            {t("CONTACT.TITLE")}
                        </Text>
                        <VStack
                            alignItems="flex-start"
                            className="footer-links"
                            fontSize={{ base: "1.3rem", md: "1.6rem" }}
                        >
                            <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                info@gmail.com
                            </Text>
                            <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                0988 989 989
                            </Text>
                            <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("CONTACT.ADDRESS1")}
                            </Text>
                            <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("CONTACT.ADDRESS2")}
                            </Text>
                        </VStack>
                    </VStack>
                    <VStack
                        px={{ base: "1rem", md: "1.6rem" }}
                        alignItems="flex-start"
                        borderLeft="1px solid var(--primary-100)"
                        spacing="1.6rem"
                    >
                        <Text
                            wordBreak="keep-all"
                            fontSize="1.4rem"
                            fontWeight={600}
                            lineHeight="2rem"
                            whiteSpace="nowrap"
                            color="var(--primary-100)"
                        >
                            {t("ABOUT_US.TITLE")}
                        </Text>
                        <VStack
                            alignItems="flex-start"
                            className="footer-links"
                            fontSize={{ base: "1.3rem", md: "1.6rem" }}
                        >
                            <Text as={Link} href="#" variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("ABOUT_US.TEAM")}
                            </Text>
                            <Text as={Link} href="#" variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("ABOUT_US.CAREERS")}
                            </Text>
                            <Text as={Link} href="#" variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("ABOUT_US.NEWS")}
                            </Text>
                        </VStack>
                    </VStack>
                    <VStack
                        px={{ base: "1rem", md: "1.6rem" }}
                        alignItems="flex-start"
                        borderLeft="1px solid var(--primary-100)"
                        spacing="1.6rem"
                    >
                        <Text
                            fontSize="1.4rem"
                            whiteSpace="nowrap"
                            fontWeight={600}
                            lineHeight="2rem"
                            color="var(--primary-100)"
                        >
                            {t("LOCATIONS.TITLE")}
                        </Text>
                        <VStack
                            alignItems="flex-start"
                            className="footer-links"
                            fontSize={{ base: "1.3rem", md: "1.6rem" }}
                        >
                            <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("LOCATIONS.DISTRICT_1")}
                            </Text>
                            <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("LOCATIONS.DISTRICT_2")}
                            </Text>
                            <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("LOCATIONS.DISTRICT_3")}
                            </Text>
                            <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("LOCATIONS.DISTRICT_4")}
                            </Text>
                            <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("LOCATIONS.BINH_TAN")}
                            </Text>
                            <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                {t("LOCATIONS.PHU_NHUAN")}
                            </Text>
                        </VStack>
                    </VStack>
                    <VStack
                        px={{ base: "1rem", md: "1.6rem" }}
                        alignItems="flex-start"
                        borderLeft="1px solid var(--primary-100)"
                        spacing="1.6rem"
                    >
                        <Text
                            wordBreak="keep-all"
                            fontSize="1.4rem"
                            fontWeight={600}
                            lineHeight="2rem"
                            whiteSpace="nowrap"
                            color="var(--primary-100)"
                        >
                            {t("FOLLOW.TITLE")}
                        </Text>
                        <VStack
                            alignItems="flex-start"
                            className="footer-links"
                            fontSize={{ base: "1.3rem", md: "1.6rem" }}
                        >
                            <HStack as={Link} href="#">
                                <Img className="social-image" alt="" src="/images/instagram.svg" />
                                <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                    Instagram
                                </Text>
                            </HStack>
                            <HStack as={Link} href="#">
                                <Img className="social-image" alt="" src="/images/facebook.svg" />
                                <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                    Facebook
                                </Text>
                            </HStack>
                            <HStack as={Link} href="#">
                                <Img className="social-image" alt="" src="/images/linkedin.svg" />
                                <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                    Linkedin
                                </Text>
                            </HStack>
                            <HStack as={Link} href="#">
                                <Img className="social-image" alt="" src="/images/246x0w-1@2x.png" />
                                <Text variant="hoverWhite" fontWeight="600" wordBreak="keep-all">
                                    Zalo
                                </Text>
                            </HStack>
                        </VStack>
                    </VStack>
                </Flex>
            </Flex>
            <Text fontSize="1.6rem" alignSelf={{ base: "unset", lg: "flex-start" }} color="var(--gray-500)" my="1.6rem">
                {t("FOLLOW.COPYRIGHT")}
            </Text>
        </Flex>
    );
};

export default Footer;
