"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import Cart from "@/components/organism/Cart";
import Feedback from "@/components/pages/detail/Feedback";
import MenuToday from "@/components/pages/detail/MenuToday";
import RestaurantGallery from "@/components/pages/detail/RestautantGallery";
import useRestaurantDetail from "@/hooks/useRestaurantDetail";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";

const RestautantDetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurantInfo } = useRestaurantDetail();

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
                    <RestaurantGallery restaurantInfo={restaurantInfo} />
                    <Feedback
                        reviews={restaurantInfo?.reviews ?? []}
                        title="Khách hàng nhận xét"
                        bg="#F4F9EC"
                        p="1.6rem 3.2rem"
                        borderRadius={"1.6rem"}
                        defaultPerpage={2}
                    />
                    <MenuToday restaurantInfo={restaurantInfo} />
                </Flex>
                <Box display={{ base: "none", lg: "block" }}>
                    <Cart
                        h="calc(100dvh - 8.8rem)"
                        position="fixed"
                        borderTop="none"
                        border="1px solid var(--gray-300)"
                        w={{ xl: "42.6rem", base: "35rem" }}
                        restaurant_id={Number(restaurantId)}
                    />
                </Box>
            </HStack>
        </Flex>
    );
};
export default RestautantDetailPage;
