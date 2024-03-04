"use client";
import GroupWrapper from "@/components/pages/confirm/GroupWrapper";
import CartTotalInfo from "@/components/pages/tracking/CartTotalInfo";
import GroupStepperProgress from "@/components/pages/tracking/GroupStepperProgress";
import useOrderDetail from "@/hooks/useOrderDetail";
import { ddMMyyyy } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import { formatPhoneNumber } from "@/utils/functions";
import { Avatar, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
// 3rd-party easing functions
const OrderDetail = () => {
    const t = useTranslations("ORDER_DETAIL");
    const { orderDetail, addressString } = useOrderDetail();

    return (
        <Flex
            position="relative"
            bg="var(--gray-100)"
            py="1rem"
            px="4rem"
            h="100%"
            w="100%"
            flex={1}
            flexDir="column"
            overflow="hidden"
        >
            <GroupStepperProgress />
            <Flex gap="1.6rem" flex={1} flexDir={{ base: "column", lg: "row" }}>
                <iframe
                    style={{ flex: 1 }}
                    id="tracking-map"
                    title="Tracking Map Frame"
                    width="787"
                    height="600"
                    src="https://cloudstg.ahamove.com/share-order/23ERRXVR/84905005248"
                />
                <Flex flexDir="column" w="47.7rem" h="100%" gap="1rem">
                    <GroupWrapper titleFontSize="2rem" title={t("ORDER")}>
                        <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                            <Text>{`ID: #${orderDetail?.order_id}`}</Text>
                            <Text>{t("ORDER_DATE", { time: formatDate(new Date(), ddMMyyyy) })}</Text>
                        </VStack>
                    </GroupWrapper>
                    {orderDetail?.driver && (
                        <GroupWrapper titleFontSize="2rem" title={t("DRIVER")}>
                            <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                                <Flex alignItems="center">
                                    <Avatar
                                        w="6.4rem"
                                        h="6.4rem"
                                        src={orderDetail.driver.profile_image ?? "/images/Avatar.svg"}
                                        mr="1.6rem"
                                    />
                                    <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                                        <Text fontWeight="600">{orderDetail.driver.name}</Text>
                                        <Text whiteSpace="pre-line">{`${formatPhoneNumber(orderDetail.driver.phone_number)}\r\n${orderDetail.driver.vehicle} | ${orderDetail.driver.license_plates}`}</Text>
                                    </VStack>
                                </Flex>
                                <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                                    <Text fontWeight="600">{t("FOR_DRIVER_NOTE")}</Text>
                                    <Text>{orderDetail.driver_note}</Text>
                                </VStack>
                            </VStack>
                        </GroupWrapper>
                    )}
                    {orderDetail?.address && (
                        <GroupWrapper titleFontSize="2rem" title={t("DELIVER_TO")}>
                            <HStack mt="0.8rem" spacing="1.2rem" fontSize="1.6rem">
                                <Image src="/images/icons/marker-pin-02.svg" w="4rem" h="4rem" alt="pin" />
                                {/* "22 Nguyễn Đình Thi, phường Phước Long B, thành phố Thủ Đức, thành phố Hồ Chí Minh" */}
                                <Text fontWeight="500">{addressString}</Text>
                            </HStack>
                        </GroupWrapper>
                    )}
                    <CartTotalInfo
                        appFee={orderDetail?.app_fee}
                        orderTotal={orderDetail?.order_total}
                        deliveryFee={orderDetail?.delivery_fee}
                        orderItems={orderDetail?.order_items}
                        restaurantInfo={orderDetail?.restaurant}
                        packagingFee={orderDetail?.packaging_fee}
                        cutleryFee={orderDetail?.cutlery_fee}
                        promotion={orderDetail?.coupon_value}
                    />
                    <GroupWrapper titleFontSize="2rem" title={t("PACKAGING")}>
                        <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                            <Text>{t("SUGARCANE_BOX")}</Text>
                            <Text>{t("NO_UTENSILS_NEEDED")}</Text>
                        </VStack>
                    </GroupWrapper>
                    <GroupWrapper titleFontSize="2rem" title={t("PAYMENT_METHOD")}>
                        <Text lineHeight="4rem" fontSize="1.6rem" mt="0.8rem">
                            {t("PAID_WITH_MOMO")}
                        </Text>
                    </GroupWrapper>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default OrderDetail;
