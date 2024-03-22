import CartItem from "@/components/organism/CartItem";
import useDeleteCartItem from "@/hooks/useDeleteCartItem";
import useRenderText from "@/hooks/useRenderText";
import useUpdateCart from "@/hooks/useUpdateCart";
import { Cart } from "@/types/cart";
import { formatMoney, genCartNote } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Button, Flex, FlexProps, Image, Text, VStack } from "@chakra-ui/react";
import { CancelTokenSource } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
let _cts: CancelTokenSource | null = null;

const PaymentGroup = ({
    applicationFee,
    cart,
    cutleryFee,
    totalPrice,
    totalDiscount,
    onConfirm,
    finalPrice,
    deliveryFee,
    packageFee,
    isDisableOrder,
    isLoading,
    ...props
}: FlexProps & {
    cutleryFee?: number;
    applicationFee?: number;
    cart?: Cart;
    totalDiscount?: number;
    totalPrice?: number;
    finalPrice?: number;
    packageFee?: number;
    isDisableOrder?: boolean;
    isLoading?: boolean;
    deliveryFee?: { deliveryFee?: number; distance?: number };
    onConfirm: () => void;
}) => {
    const t = useTranslations("CONFIRM_ORDER.PAYMENT_GROUP");
    const { renderTxt } = useRenderText();
    const router = useRouter();
    const { handleChangeCartQuantity, maxQtyValues, handleChangeQtyRaw } = useUpdateCart();
    const { handleDeleteCartItem } = useDeleteCartItem();

    useEffect(() => {
        return () => {
            _cts?.cancel();
            _cts = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Flex
            color="black"
            position="relative"
            flexDir="column"
            borderRadius="0"
            p="2.4rem .8rem 2.4rem .8rem"
            w="44.5rem"
            bg="white"
            h="fit-content"
            {...props}
        >
            <VStack borderBottom="1px solid var(--gray-300)" pb="1.6rem" spacing="0.8rem" color="black">
                <Text fontSize="2.4rem" textAlign="center" fontWeight="600">
                    {t("PAYMENT")}
                </Text>
            </VStack>
            <Flex flexDir="column" flex={1}>
                <Flex
                    cursor="pointer"
                    onClick={() => {
                        router.push(routes.RestaurantDetail + `/${cart?.restaurant_id}`);
                    }}
                    alignItems="center"
                    px="0.8rem"
                    bg="var(--gray-100)"
                    h="5.6rem"
                    gap="1.2rem"
                >
                    <Image w="4rem" h="4rem" src="/images/chef_avatar.svg" alt="restaurant-icon"></Image>
                    <Text fontWeight="bold" fontSize="1.6rem" color="var(--color-mediumslateblue)">
                        {renderTxt(cart?.restaurant_name)}
                    </Text>
                </Flex>
                <VStack flex={1} overflow="auto" mt="0.8rem" spacing="0.8rem">
                    {cart?.cart_info?.map((item) => (
                        <CartItem
                            restaurantId={cart.restaurant_id}
                            id={item.menu_item_id}
                            key={item.item_id}
                            image={item.item_img ?? ""}
                            name={renderTxt(item.item_name) ?? ""}
                            note={genCartNote(item)}
                            price={item.price?.toLocaleString()}
                            nowPrice={item.price_after_discount?.toLocaleString()}
                            quantity={item.qty_ordered}
                            onChangeValue={(value) => {
                                handleChangeQtyRaw(item.item_id, item.menu_item_id, value);
                                handleChangeCartQuantity(item.item_id, value, _cts);
                            }}
                            onDeleteCartItem={() => {
                                if (item.item_id != undefined && cart.customer_id != undefined)
                                    handleDeleteCartItem(item.item_id, cart.customer_id);
                            }}
                            numberInputProps={{
                                value: maxQtyValues[String(item.menu_item_id)]?.items?.[String(item.item_id)].value,
                                max: maxQtyValues[String(item.menu_item_id)]?.items?.[String(item.item_id)].max,
                            }}
                        />
                    ))}
                </VStack>
            </Flex>
            <VStack
                w="100%"
                mt="0.8rem"
                spacing="0.4rem"
                px="1.6rem"
                alignItems="flex-start"
                pb="1.2rem"
                borderBottom="1px solid var(--gray-300)"
            >
                <Text fontSize="1.6rem" fontWeight={700}>
                    {t("PAYMENT_INFO")}
                </Text>
                <Flex w="100%" justifyContent="space-between">
                    <Text fontSize="1.4rem">{t("TOTAL_ITEMS")}</Text>
                    <Text fontSize="1.4rem"> {formatMoney(totalPrice)}</Text>
                </Flex>
                <Flex w="100%" justifyContent="space-between">
                    <Text fontSize="1.4rem">{t("PACKING_FEE")}</Text>
                    <Text fontSize="1.4rem"> {formatMoney(packageFee)}</Text>
                </Flex>
                {cutleryFee && (
                    <Flex w="100%" justifyContent="space-between">
                        <Text fontSize="1.4rem">{t("UTENSILS")}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(cutleryFee)}</Text>
                    </Flex>
                )}
                {deliveryFee && (
                    <Flex pt="0.4rem" w="100%" justifyContent="space-between" borderTop="var(--divider)">
                        <Text fontSize="1.4rem">{t("DELIVERY_FEE", { distance: deliveryFee?.distance ?? "-" })}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(deliveryFee?.deliveryFee)}</Text>
                    </Flex>
                )}
                {applicationFee && (
                    <Flex w="100%" justifyContent="space-between">
                        <Text fontSize="1.4rem">{t("PLATFORM_FEE")}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(applicationFee)}</Text>
                    </Flex>
                )}
                {totalDiscount && (
                    <Flex pt="0.4rem" w="100%" justifyContent="space-between" borderTop="var(--divider)">
                        <Text fontSize="1.4rem">{t("PROMOTION")}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(-totalDiscount)}</Text>
                    </Flex>
                )}
            </VStack>
            <Flex p="1.6rem" h="13.6rem" flexDir="column" gap="2.4rem">
                <Flex justifyContent="space-between">
                    <Text fontSize="2rem" fontWeight={600}>
                        {t("TOTAL_PAYMENT")}
                    </Text>
                    <Text color="var(--gray-900)" fontSize="2.4rem" fontWeight="600">
                        {formatMoney(finalPrice)}
                    </Text>
                </Flex>
                <Button
                    isLoading={isLoading}
                    isDisabled={isDisableOrder}
                    h="4.8rem"
                    onClick={onConfirm}
                    borderRadius="2.4rem"
                >
                    {t("PLACE_ORDER")}
                </Button>
            </Flex>
        </Flex>
    );
};

export default PaymentGroup;
