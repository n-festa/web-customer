import CartItem from "@/components/organism/CartItem";
import useRenderText from "@/hooks/useRenderText";
import { OrderItem, Restaurant } from "@/types/order";
import { formatMoney, genCartNote } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const CartTotalInfo = ({
    restaurantInfo,
    orderItems,
    orderTotal,
    deliveryFee,
    appFee,
    cutleryFee,
    promotion,
    packagingFee,
}: {
    restaurantInfo?: Restaurant;
    orderItems?: OrderItem[];
    orderTotal?: number | string;
    deliveryFee?: number | string;
    appFee?: number | string;
    deliveryDistance?: number | string;
    cutleryFee?: number | string;
    promotion?: number | string;
    packagingFee?: number | string;
}) => {
    const router = useRouter();
    const t = useTranslations("CONFIRM_ORDER.PAYMENT_GROUP");
    const { renderTxt } = useRenderText();

    const totalSumByItems = useMemo(() => {
        return orderItems?.reduce((prev, item) => (prev += (item.price ?? 0) * (item.qty_ordered ?? 0)), 0);
    }, [orderItems]);
    return (
        <Flex color="black" position="relative" flexDir="column" borderRadius="0" p="0.8rem" bg="white" h="fit-content">
            <Flex flexDir="column" flex={1}>
                <Flex
                    cursor="pointer"
                    onClick={() => {
                        router.push(routes.RestaurantDetail + `/${restaurantInfo?.restaurant_id}`);
                    }}
                    alignItems="center"
                    px="0.8rem"
                    bg="var(--gray-100)"
                    h="5.6rem"
                    gap="1.2rem"
                >
                    <Image w="4rem" h="4rem" src={restaurantInfo?.restaurant_logo_img} alt="restaurant-icon"></Image>
                    <Text fontWeight="bold" fontSize="1.6rem" color="var(--color-mediumslateblue)">
                        {renderTxt(restaurantInfo?.restaurant_name)}
                    </Text>
                </Flex>
                <VStack flex={1} overflow="auto" mt="0.8rem" spacing="0.8rem">
                    {orderItems?.map((item, index) => (
                        <CartItem
                            key={`orderItem${index}`}
                            image={item.item_img}
                            name={renderTxt(item.item_name)}
                            note={genCartNote(item)}
                            price={item.price?.toLocaleString()}
                            nowPrice={item.price?.toLocaleString()}
                            numberInputProps={{ isDisabled: true }}
                            quantity={item.qty_ordered}
                            hideNumberInput
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
                    <Text fontSize="1.4rem"> {formatMoney(totalSumByItems)}</Text>
                </Flex>
                {packagingFee && (
                    <Flex w="100%" justifyContent="space-between">
                        <Text fontSize="1.4rem">{t("PACKING_FEE")}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(packagingFee)}</Text>
                    </Flex>
                )}
                {cutleryFee && (
                    <Flex w="100%" justifyContent="space-between" borderBottom="var(--divider)">
                        <Text fontSize="1.4rem">{t("UTENSILS")}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(cutleryFee)}</Text>
                    </Flex>
                )}
                {deliveryFee && (
                    <Flex pt="0.4rem" w="100%" borderTop="var(--divider)" justifyContent="space-between">
                        <Text fontSize="1.4rem">{t("DELIVERY_FEE")}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(deliveryFee)}</Text>
                    </Flex>
                )}
                {appFee && (
                    <Flex w="100%" pb="0.4rem" justifyContent="space-between">
                        <Text fontSize="1.4rem">{t("PLATFORM_FEE")}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(appFee)}</Text>
                    </Flex>
                )}
                {promotion && (
                    <Flex w="100%" justifyContent="space-between" borderTop="var(--divider)">
                        <Text fontSize="1.4rem">{t("PROMOTION")}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(-Number(promotion))}</Text>
                    </Flex>
                )}
            </VStack>
            <Flex p="1.6rem" flexDir="column" gap="2.4rem">
                <Flex justifyContent="space-between">
                    <Text fontSize="2rem" fontWeight={600}>
                        {t("TOTAL_PAYMENT")}
                    </Text>
                    <Text color="var(--gray-900)" fontSize="2.4rem" fontWeight="600">
                        {formatMoney(orderTotal)}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CartTotalInfo;
