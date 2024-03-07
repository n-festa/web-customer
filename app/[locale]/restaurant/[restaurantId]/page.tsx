"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import Cart from "@/components/organism/Cart";
import Feedback from "@/components/pages/detail/Feedback";
import MenuToday from "@/components/pages/detail/MenuToday";
import RestaurantGallery from "@/components/pages/detail/RestautantGallery";
import useParams from "@/hooks/useParams";
import useRestaurantDetail from "@/hooks/useRestaurantDetail";
import { isNullOrEmpty } from "@/utils/functions";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const RestaurantDetailPage = () => {
    const t = useTranslations();
    const { restaurantId } = useNextParams();
    const router = useRouter();
    const path = usePathname();
    const {
        params: { des },
    } = useParams<{ des?: string }>({ des: undefined });
    const { restaurantInfo, isLoading } = useRestaurantDetail();

    useEffect(() => {
        if (!isNullOrEmpty(des)) {
            router.replace(path);
            setTimeout(() => {
                router.push(des);
            }, 800);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [des, router]);

    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="white" w="100%" h="100%">
            <HStack w="100%" justifyContent={"flex-start"} alignItems={"flex-start"} spacing={"2rem"} px="4rem">
                <Flex
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                    py="2rem"
                    w={{ xl: "calc(100% - 42.6rem)", lg: "calc(100% - 42.6rem)", base: "100%" }}
                    boxSizing="border-box"
                >
                    <BackButton label={t("COMMON.BACK_PAGE")} />
                    <RestaurantGallery restaurantInfo={restaurantInfo} isLoading={isLoading} />

                    <Feedback
                        reviews={restaurantInfo?.reviews ?? []}
                        title={t("RESTAURANT.COMMENT_CUSTOMER")}
                        bg="#F4F9EC"
                        p="1.6rem 3.2rem"
                        borderRadius={"1.6rem"}
                        isLoading={isLoading}
                    />
                    <MenuToday restaurantInfo={restaurantInfo} isLoading={isLoading} />
                </Flex>
                <Box display={{ base: "none", lg: "block" }}>
                    <Cart
                        h="calc(100dvh - 8.8rem)"
                        position="fixed"
                        borderTop="none"
                        minW="fit-content"
                        border="1px solid var(--gray-300)"
                        w={{ xl: "42.6rem", base: "35rem" }}
                        restaurant_id={Number(restaurantId)}
                        ignoreAuthError={true}
                    />
                </Box>
            </HStack>
        </Flex>
    );
};
export default RestaurantDetailPage;
