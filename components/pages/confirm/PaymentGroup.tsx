import CartItem from "@/components/organism/CartItem";
import useRenderText from "@/hooks/useRenderText";
import { Cart } from "@/types/cart";
import { formatMoney, genCartNote } from "@/utils/functions";
import { Button, Flex, FlexProps, Image, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const PaymentGroup = ({
    applicationFee,
    cart,
    cutleryFee,
    totalPrice,
    handleChangeCartQuantity,
    ...props
}: FlexProps & {
    cutleryFee?: number;
    applicationFee?: number;
    cart?: Cart;
    totalPrice?: number;
    onConfirm: () => void;
    handleChangeCartQuantity: (id?: number, value?: number) => void;
}) => {
    const t = useTranslations("CONFIRM_ORDER.PAYMENT_GROUP");
    const { renderTxt } = useRenderText();

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
                <Flex alignItems="center" px="0.8rem" bg="var(--gray-100)" h="5.6rem" gap="1.2rem">
                    <Image w="4rem" h="4rem" src="/images/chef_avatar.svg" alt="restaurant-icon"></Image>
                    <Text fontWeight="bold" fontSize="1.6rem" color="var(--color-mediumslateblue)">
                        {"The Chef Town"}
                    </Text>
                </Flex>
                <VStack flex={1} overflow="auto" mt="0.8rem" spacing="0.8rem">
                    {cart?.cart_info?.map((item) => (
                        <CartItem
                            key={item.item_id}
                            image={item.item_img ?? ""}
                            name={renderTxt(item.item_name) ?? ""}
                            note={genCartNote(item)}
                            price={item.price?.toLocaleString()}
                            nowPrice={item.price_after_discount?.toLocaleString()}
                            quantity={item.qty_ordered}
                            onChangeValue={(value) => {
                                handleChangeCartQuantity(item.item_id, value);
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
                    <Text fontSize="1.4rem"> {formatMoney(9000)}</Text>
                </Flex>
                {cutleryFee && (
                    <Flex pb="0.4rem" w="100%" justifyContent="space-between" borderBottom="var(--divider)">
                        <Text fontSize="1.4rem">{t("UTENSILS")}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(cutleryFee)}</Text>
                    </Flex>
                )}
                <Flex w="100%" justifyContent="space-between">
                    <Text fontSize="1.4rem">{t("DELIVERY_FEE")}</Text>
                    <Text fontSize="1.4rem"> {formatMoney(10000)}</Text>
                </Flex>
                {applicationFee && (
                    <Flex w="100%" pb="0.4rem" justifyContent="space-between" borderBottom="var(--divider)">
                        <Text fontSize="1.4rem">{t("PLATFORM_FEE")}</Text>
                        <Text fontSize="1.4rem"> {formatMoney(applicationFee)}</Text>
                    </Flex>
                )}
                <Flex w="100%" justifyContent="space-between">
                    <Text fontSize="1.4rem">{t("PROMOTION")}</Text>
                    <Text fontSize="1.4rem"> {formatMoney(-2000)}</Text>
                </Flex>
            </VStack>
            <Flex p="1.6rem" h="13.6rem" flexDir="column" gap="2.4rem">
                <Flex justifyContent="space-between">
                    <Text fontSize="2rem" fontWeight={600}>
                        {t("TOTAL_PAYMENT")}
                    </Text>
                    <Text color="var(--gray-900)" fontSize="2.4rem" fontWeight="600">
                        {formatMoney(160000)}
                    </Text>
                </Flex>
                <Button h="4.8rem" onClick={props.onConfirm} borderRadius="2.4rem">
                    {t("PLACE_ORDER")}
                </Button>
            </Flex>
        </Flex>
    );
};

export default PaymentGroup;
