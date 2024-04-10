import NumbericStepper from "@/components/molecules/NumbericStepper";
import useUpdateCart from "@/hooks/useUpdateCart";
import { useAppSelector } from "@/store/hooks";
import { CartItem } from "@/types/cart";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { DEFAULT_ORIGINAL_VALUE, OtherCustomization, TasteCustomization } from "@/utils/constants";
import { parseStringToObj } from "@/utils/functions";
import { Button, Flex, HStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { RefObject, useEffect, useMemo, useState } from "react";

interface Props {
    quantity?: number;
    price?: number;
    restaurantId?: number;
    availableQuantity?: number;
    loading?: boolean;
    formRef?: RefObject<HTMLFormElement>;
    activeSKU?: SKUsDto;
    menuItemID?: number;
}

const OrderFooter = ({
    loading,
    quantity = 1,
    availableQuantity = 99,
    price = 0,
    formRef,
    restaurantId,
    activeSKU,
    menuItemID,
}: Props) => {
    const t = useTranslations("PRODUCT_DETAIL");
    const [state, setState] = useState(quantity);
    const useInfo = useAppSelector((state) => state.userInfo.userInfo?.customer_id ?? -1);
    const { handleUpdateCart, cartSync: cart } = useUpdateCart();
    useEffect(() => {
        if (quantity !== state) {
            setState(quantity);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    const totalPrice = useMemo(() => {
        return state * price;
    }, [state, price]);

    const totalRemainQuanity = useMemo(() => {
        const currentCartItemAvailable = cart?.cart_info?.reduce((prevValue, item) => {
            if (item.menu_item_id === menuItemID) {
                return prevValue + item.qty_ordered;
            }
            return prevValue;
        }, 0);
        return availableQuantity - (currentCartItemAvailable ?? 0);
    }, [availableQuantity, cart?.cart_info, menuItemID]);

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
            packaging_id: foodValueSetting.package,
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
                        if (foodValueSetting[item] !== DEFAULT_ORIGINAL_VALUE) {
                            cartItem = {
                                ...cartItem,
                                advanced_taste_customization_obj: [
                                    ...parseStringToObj(cartItem.advanced_taste_customization_obj),
                                    {
                                        option_id: split[1],
                                        value_id: foodValueSetting[item],
                                    },
                                ],
                            };
                        }
                        break;
                    case OtherCustomization:
                        if (foodValueSetting[item])
                            cartItem = {
                                ...cartItem,
                                basic_taste_customization_obj: [
                                    ...parseStringToObj(cartItem.basic_taste_customization_obj),
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
                        isDisabled: !loading && totalRemainQuanity ? undefined : true,
                        max: totalRemainQuanity,
                    }}
                />
                <Button
                    h="5.4rem"
                    isLoading={loading}
                    borderRadius="2.4rem"
                    isDisabled={!totalRemainQuanity}
                    variant={"btnAddToCart"}
                    _loading={{
                        _hover: {
                            bg: "var(--primary-color)",
                        },
                    }}
                    _hover={{
                        _disabled: {},
                    }}
                    onClick={onUpdateCart}
                >
                    {t("ADD_TO_CART", { money: totalPrice.toLocaleString() })}
                </Button>
            </HStack>
        </Flex>
    );
};

export default OrderFooter;
