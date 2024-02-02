"use client";
import { useState } from "react";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { TabReview } from "@/utils/constants";
import TabItem from "@/components/pages/review/TabItem";
import ReviewQuick from "@/components/pages/review/ReviewQuick";
import ReviewDetail from "@/components/pages/review/ReviewDetail";

const Review = () => {
    const [tab, setTab] = useState<number>(TabReview.quick);
    const handleTab = (numberTab: number) => {
        setTab(numberTab);
    };
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
                        Đánh giá dịch vụ
                    </Heading>
                    <Flex
                        fontSize="1.6rem"
                        fontWeight="400"
                        gap="1.6rem"
                        color="var(--base-black)"
                        justifyContent="center"
                        mb="2rem"
                    >
                        <Text>Đơn hàng: #1234567</Text>
                        <Text>-</Text>
                        <Text>Ngày: 26/07/2023</Text>
                    </Flex>
                    <Flex gap="2rem" w="100%" justifyContent="start" borderBottom="1px solid var(--gray-300)">
                        <TabItem
                            active={tab === TabReview.quick}
                            content="Đánh giá nhanh"
                            onClick={() => handleTab(TabReview.quick)}
                        />
                        <TabItem
                            active={tab === TabReview.detail}
                            content="Đánh giá chi tiết"
                            onClick={() => handleTab(TabReview.detail)}
                        />
                    </Flex>
                    <Box mt="2rem">{tab === TabReview.quick ? <ReviewQuick /> : <ReviewDetail />}</Box>
                </Box>
            </Flex>
        </Flex>
    );
};

export default Review;
