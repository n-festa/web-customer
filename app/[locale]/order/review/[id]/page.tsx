"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import ReviewDetail from "@/components/pages/review/ReviewDetail";
import ReviewQuick from "@/components/pages/review/ReviewQuick";
import usePostReview from "@/hooks/usePostReview";
import { ddMMyyyy } from "@/utils/constants";
import { Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { formatDate } from "date-fns";
import { useTranslations } from "next-intl";

const Review = () => {
    const t = useTranslations("REVIEW");
    const {
        handleChangeOrder,
        handleChangeDriver,
        handleOrderQuick,
        handleSubmit,
        setRemarkQuick,
        driver,
        orders,
        remarkQuick,
        reviewForm,
        missingReviews,
    } = usePostReview();
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
                        <Text>{t("ORDER_NUMBER", { number: `#${reviewForm?.order_id || 0}` })}</Text>
                        <Text>-</Text>
                        <Text>
                            {t("ORDER_DATE", {
                                time: formatDate(new Date(Number(reviewForm?.order_date || "")), ddMMyyyy),
                            })}
                        </Text>
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
                        <TabPanels>
                            <TabPanel>
                                <ReviewQuick
                                    remarkQuick={remarkQuick}
                                    setRemarkQuick={setRemarkQuick}
                                    onChangeOrderQuick={handleOrderQuick}
                                    onSubmit={handleSubmit}
                                    missingReviews={missingReviews}
                                />
                            </TabPanel>
                            <TabPanel mt="2rem">
                                <ReviewDetail
                                    missingReviews={missingReviews}
                                    driver={driver}
                                    orders={orders}
                                    onChangeOrders={handleChangeOrder}
                                    onChangeDriver={handleChangeDriver}
                                    onSubmit={handleSubmit}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Review;
