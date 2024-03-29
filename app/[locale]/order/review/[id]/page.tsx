"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import ReviewDetail from "@/components/pages/review/ReviewDetail";
import ReviewQuick from "@/components/pages/review/ReviewQuick";
import { Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const Review = () => {
    const t = useTranslations("REVIEW");
    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="white" w="100%" h="100%">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="6.7rem" w="100%">
                <BackButton label="Quay lại trang trước" />
                <Box maxW="116.6rem" w="100%" m="0 auto">
                    <Heading
                        as="h2"
                        fontSize="3rem"
                        fontWeight="bold"
                        color="var(--base-black)"
                        mb="1rem"
                        textAlign="center"
                    >
                        {t("TITLE")}
                    </Heading>
                    <Flex
                        fontSize="1.6rem"
                        fontWeight="400"
                        gap="1.6rem"
                        color="var(--base-black)"
                        justifyContent="center"
                        mb="2rem"
                    >
                        <Text>{t("ORDER_NUMBER", { number: "#1234567" })}</Text>
                        <Text>-</Text>
                        <Text>{t("ORDER_DATE", { time: "26/07/2023" })}</Text>
                    </Flex>
                    <Tabs>
                        <TabList>
                            <Tab
                                color="var(--gray-500)"
                                fontSize="1.6rem"
                                fontWeight="600"
                                _selected={{ borderColor: "#00322A", color: "var(--gray-700)" }}
                            >
                                {t("QUICK_REVIEW")}
                            </Tab>
                            <Tab
                                color="var(--gray-500)"
                                fontSize="1.6rem"
                                fontWeight="600"
                                _selected={{ borderColor: "#00322A", color: "var(--gray-700)" }}
                            >
                                {t("DETAILED_REVIEW")}
                            </Tab>
                        </TabList>
                        <TabPanels mt="2rem">
                            <TabPanel>
                                <ReviewQuick />
                            </TabPanel>
                            <TabPanel>
                                <ReviewDetail />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Review;
