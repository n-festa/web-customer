import NumbericStepper from "@/components/molecules/NumbericStepper";
import useUpdateCart from "@/hooks/useUpdateCart";
import { useAppSelector } from "@/store/hooks";
import { CartItem } from "@/types/cart";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { OtherCustomization, TasteCustomization } from "@/utils/constants";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { RefObject, useEffect, useMemo, useState } from "react";

interface Props {
    quantity?: number;
    price?: number;
    restaurantId?: number;
    availableQuantity?: number;
    loading?: boolean;
    formRef?: RefObject<HTMLFormElement>;
    activeSKU?: SKUsDto;
}

const OrderFooter = ({
    loading,
    quantity = 1,
    availableQuantity = 99,
    price = 0,
    formRef,
    restaurantId,
    activeSKU,
}: Props) => {
    const [state, setState] = useState(quantity);
    const useInfo = useAppSelector((state) => state.userInfo.userInfo?.customer_id ?? -1);
    const { handleUpdateCart } = useUpdateCart();
    useEffect(() => {
        if (quantity !== state) {
            setState(quantity);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    const totalPrice = useMemo(() => {
        return state * price;
    }, [state, price]);

    const onUpdateCart = () => {
        const foodValueSetting = formRef?.current?.values;

        let cartItem: CartItem = {
            item_id: foodValueSetting.item_id,
            sku_id: activeSKU?.sku_id,
            customer_id: useInfo,
            qty_ordered: state,
            notes: "",
            advanced_taste_customization_obj: [],
            basic_taste_customization_obj: [],
            restaurant_id: restaurantId,
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
    };
    return (
        <Flex
            w="100%"
            justifyContent={"center"}
            bg="#FAFFDD"
            position={"fixed"}
            left={"0"}
            bottom="0"
            right="0"
            py="1.6rem"
            zIndex={10}
        >
            <HStack spacing={"2.4rem"}>
                <NumbericStepper
                    defaultValue={quantity}
                    onChangeValue={setState}
                    numberInputProps={{
                        min: 1,
                        max: availableQuantity,
                    }}
                />
                <Button
                    h="5.4rem"
                    isLoading={loading}
                    borderRadius="2.4rem"
                    variant={"btnAddToCart"}
                    _loading={{
                        _hover: {
                            bg: "var(--primary-color)",
                        },
                    }}
                    onClick={onUpdateCart}
                >
                    Thêm vào giỏ hàng - {totalPrice.toLocaleString()}VND
                </Button>
            </HStack>
        </Flex>
    );
};

export default OrderFooter;
