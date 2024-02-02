"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import Cart from "@/components/organism/Cart";
import Feedback from "@/components/pages/detail/Feedback";
import MenuToday from "@/components/pages/detail/MenuToday";
import RestaurantGallery from "@/components/pages/detail/RestautantGallery";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";

const RestautantDetailPage = () => {
    const { detail } = useParams();

    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="white" w="100%" h="100%">
            <HStack w="100%" justifyContent={"flex-start"} alignItems={"flex-start"} spacing={"2rem"} px="4rem">
                <Flex
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                    py="2rem"
                    w={{ xl: "calc(100% - 42.6rem)", lg: "calc(100% - 35rem)", base: "100%" }}
                    boxSizing="border-box"
                >
                    <BackButton label="Quay lại trang trước" />
                    <RestaurantGallery />
                    <Feedback
                        reviews={[
                            {
                                food_rating_id: 1,
                                score: 5,
                                remarks: "“ Đồ ăn tươi, rất hợp khẩu vị mình.”",
                                isShowAuthor: true,
                            },
                            {
                                food_rating_id: 1,
                                score: 5,
                                remarks: "“ Đóng gói đẹp, thức ăn rất tươi.”",
                            },
                            {
                                food_rating_id: 1,
                                score: 5,
                                remarks: "“ Đóng gói đẹp, thức ăn rất tươi.”",
                            },
                            {
                                food_rating_id: 1,
                                score: 5,
                                remarks: "“ Đóng gói đẹp, thức ăn rất tươi.”",
                            },
                            {
                                food_rating_id: 1,
                                score: 5,
                                remarks: "“ Đóng gói đẹp, thức ăn rất tươi.”",
                            },
                        ]}
                        title="Khách hàng nhận xét"
                        bg="#F4F9EC"
                        p="1.6rem 3.2rem"
                        borderRadius={"1.6rem"}
                        defaultPerpage={2}
                    />
                    <MenuToday />
                </Flex>
                <Box display={{ base: "none", lg: "block" }}>
                    <Cart
                        h="calc(100dvh - 8.8rem)"
                        position="fixed"
                        borderTop="none"
                        border="1px solid var(--gray-300)"
                        w={{ xl: "42.6rem", base: "35rem" }}
                        restaurant_id={Number(detail)}
                    />
                </Box>
            </HStack>
        </Flex>
    );
};
export default RestautantDetailPage;
