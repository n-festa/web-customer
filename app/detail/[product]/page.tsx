"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import OrderFooter from "@/components/organism/order/OrderFooter";
import Feedback from "@/components/pages/detail/Feedback";
import FoodInRestaurant from "@/components/pages/detail/FoodInRestaurant";
import ProductGallery from "@/components/pages/detail/ProductGallery";
import ServingSize from "@/components/pages/detail/ServingSize";
import SideDishes from "@/components/pages/detail/SideDishes";
import SimilarDishes from "@/components/pages/detail/SimilarDishes";
import useFoodDetail from "@/hooks/useFoodDetail";
import useUpdateCart from "@/hooks/useUpdateCart";
import { RootState } from "@/store";
import { CartItem } from "@/types/cart";
import { OtherCustomization, PortionCustomization, TasteCustomization } from "@/utils/constants";
import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
    const { isLoading, foodInfo, formRef } = useFoodDetail();
    const useInfo = useSelector((state: RootState) => state.userInfo.userInfo?.customer_id ?? -1);
    const { handleUpdateCart } = useUpdateCart();

    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="white" w="100%" h="100%">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="6.7rem" w="100%">
                <BackButton label="Quay lại trang trước" />
                {isLoading ? (
                    <>
                        <SkeletonBox isLoaded={false} />
                        <SkeletonBox isLoaded={false} />
                    </>
                ) : (
                    <>
                        <ProductGallery info={foodInfo.info} listSKUs={foodInfo.listSKUs} />
                        <ServingSize info={foodInfo.info} listSKUs={foodInfo.listSKUs} ref={formRef} />
                    </>
                )}

                <SideDishes />
                <FoodInRestaurant />
                <SimilarDishes />
                <Feedback />
                <OrderFooter
                    quantity={0}
                    price={80000}
                    onUpdateCart={(_quantity: number) => {
                        const foodValueSetting = formRef.current?.values;

                        let cartItem: CartItem = {
                            item_id: foodValueSetting.item_id,
                            sku_id: foodValueSetting.sku_id,
                            customer_id: useInfo,
                            qty_ordered: _quantity,
                            notes: "",
                            advanced_portion_customization_obj: [],
                            advanced_taste_customization_obj: [],
                            basic_taste_customization_obj: [],
                            restaurant_id: foodInfo.info?.restaurant_id,
                        };

                        Object.keys(foodValueSetting).forEach((item) => {
                            const split = item.split("-");
                            if (split.length <= 1) {
                                cartItem = {
                                    ...cartItem,
                                    [item]: foodValueSetting[item],
                                };
                            } else {
                                switch (split[0]) {
                                    case PortionCustomization:
                                        cartItem = {
                                            ...cartItem,
                                            advanced_portion_customization_obj: [
                                                ...(cartItem.advanced_portion_customization_obj ?? []),
                                                {
                                                    option_id: split[1],
                                                    value_id: foodValueSetting[item],
                                                },
                                            ],
                                        };
                                        break;
                                    case TasteCustomization:
                                        cartItem = {
                                            ...cartItem,
                                            advanced_taste_customization_obj: [
                                                ...cartItem.advanced_taste_customization_obj,
                                                {
                                                    option_id: split[1],
                                                    value_id: foodValueSetting[item],
                                                },
                                            ],
                                        };
                                        break;
                                    case OtherCustomization:
                                        if (foodValueSetting[item])
                                            cartItem = {
                                                ...cartItem,
                                                basic_taste_customization_obj: [
                                                    ...cartItem.basic_taste_customization_obj,
                                                    {
                                                        no_adding_id: split[1],
                                                    },
                                                ],
                                            };
                                        break;
                                }
                            }
                        });
                        handleUpdateCart(cartItem);
                    }}
                />
            </Flex>
        </Flex>
    );
};
export default ProductDetailPage;
