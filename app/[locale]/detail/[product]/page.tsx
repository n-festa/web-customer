"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import OrderFooter from "@/components/organism/order/OrderFooter";
import Feedback from "@/components/pages/detail/Feedback";
import FoodInRestaurant from "@/components/pages/detail/FoodInRestaurant";
import ProductGallery from "@/components/pages/detail/ProductGallery";
import ServingSize from "@/components/pages/detail/ServingSize";
import SideDishes from "@/components/pages/detail/SideDishes";
import SimilarDishes from "@/components/pages/detail/SimilarDishes";
import useFoodDetail from "@/hooks/useFoodDetail";
import { useAppSelector } from "@/store/hooks";
import { Flex } from "@chakra-ui/react";
import { Suspense } from "react";

const ProductDetailPage = () => {
    const { isLoading, foodInfo, formRef, activeSKU, handleChangePortions, portions } = useFoodDetail();
    const loading = useAppSelector((state) => state.app.loading);

    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="white" w="100%" h="100%">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="6.7rem" w="100%">
                <BackButton label="Quay lại trang trước" />
                <ProductGallery info={foodInfo.info} activeSKU={activeSKU} isLoading={isLoading} />
                <ServingSize
                    info={foodInfo.info}
                    ref={formRef}
                    isLoading={isLoading}
                    portions={portions}
                    onChangePortion={handleChangePortions}
                />
                <SideDishes />
                <FoodInRestaurant />
                <SimilarDishes />
                <Feedback reviews={foodInfo.info?.reviews ?? []} isLoading={isLoading} />
                <Suspense>
                    <OrderFooter
                        loading={loading}
                        quantity={1}
                        price={activeSKU?.price_after_discount}
                        restaurantId={foodInfo.info?.restaurant_id}
                        formRef={formRef}
                        activeSKU={activeSKU}
                    />
                </Suspense>
            </Flex>
        </Flex>
    );
};
export default ProductDetailPage;
