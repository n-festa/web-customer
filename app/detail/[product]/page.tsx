"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import OrderFooter from "@/components/organism/order/OrderFooter";
import Feedback from "@/components/pages/detail/Feedback";
import FoodInRestaurant from "@/components/pages/detail/FoodInRestaurant";
import ProductGallery from "@/components/pages/detail/ProductGallery";
import ServingSize from "@/components/pages/detail/ServingSize";
import SideDishes from "@/components/pages/detail/SideDishes";
import SimilarDishes from "@/components/pages/detail/SimilarDishes";
import { cartState } from "@/recoil/recoilState";
import { Flex } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

const ProductDetailPage = () => {
    const setCart = useSetRecoilState(cartState);
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
                    quantity={0}
                    price={80000}
                    onUpdateCart={(_quantity: number) => {
                        //TODO: TEMP
                        setCart((cur) => ({
                            ...cur,
                            quickCart: {
                                customer_id: "quickCart",
                                cart_info: [
                                    {
                                        item_id: 24,
                                        customer_id: 7,
                                        sku_id: 1,
                                        qty_ordered: _quantity,
                                        advanced_taste_customization: "nhiều cay",
                                        basic_taste_customization: "Không hành",
                                        portion_customization: "Ức Gà 200g",
                                        advanced_taste_customization_obj: [{ option_id: "3", value_id: "8" }],
                                        basic_taste_customization_obj: [{ no_adding_id: "no_onion" }],
                                        notes: "",
                                        restaurant_id: 1,
                                        created_at: "2024-01-19T12:05:10.000Z",
                                    },
                                ],
                            },
                        }));
                    }}
                />
            </Flex>
        </Flex>
    );
};
export default ProductDetailPage;
