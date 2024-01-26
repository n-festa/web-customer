"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import OrderFooter from "@/components/organism/order/OrderFooter";
import Feedback from "@/components/pages/detail/Feedback";
import FoodInRestaurant from "@/components/pages/detail/FoodInRestaurant";
import ProductGallery from "@/components/pages/detail/ProductGallery";
import ServingSize from "@/components/pages/detail/ServingSize";
import SideDishes from "@/components/pages/detail/SideDishes";
import SimilarDishes from "@/components/pages/detail/SimilarDishes";
import { Flex } from "@chakra-ui/react";

const ProductDetailPage = () => {
    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="white" w="100%" h="100%">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="6.7rem" w="100%">
                <BackButton label="Quay lại trang trước" />
                <ProductGallery />
                <ServingSize />
                <SideDishes />
                <FoodInRestaurant />
                <SimilarDishes />
                <Feedback />
                <OrderFooter
                    quantity={1}
                    price={80000}
                    onUpdateCart={(_quantity: number) => {
                        //
                    }}
                />
            </Flex>
        </Flex>
    );
};
export default ProductDetailPage;
