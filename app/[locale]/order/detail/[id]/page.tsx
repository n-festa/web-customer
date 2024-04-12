"use client";
import Empty from "@/components/molecules/Empty";
import GroupWrapper from "@/components/pages/confirm/GroupWrapper";
import CartTotalInfo from "@/components/pages/tracking/CartTotalInfo";
import GroupStepperProgress from "@/components/pages/tracking/GroupStepperProgress";
import useOrderDetail from "@/hooks/useOrderDetail";
import useRenderText from "@/hooks/useRenderText";
import { ddMMyyyy } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import { formatPhoneNumber } from "@/utils/functions";
import { Avatar, Box, Flex, HStack, Image, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const OrderDetail = () => {
    const { renderTxt } = useRenderText();
    const t = useTranslations("ORDER_DETAIL");
    const { orderDetail, addressString, isSimpleScreen, isLoading, error, orderStatusLog } = useOrderDetail();
    const showIframe = useBreakpointValue({
        base: false,
        md: true,
    });
    const driverInfo = useMemo(() => {
        const list: string[] = [];
        orderDetail?.driver?.vehicle && list.push(orderDetail?.driver?.vehicle);
        orderDetail?.driver?.license_plates && list.push(orderDetail?.driver?.license_plates);

        return list.join(" | ");
    }, [orderDetail?.driver?.license_plates, orderDetail?.driver?.vehicle]);

    if (error)
        return (
            <Box bg="white" h="100%" w="100%">
                <Empty />
            </Box>
        );
    const isCenterDisplay = !showIframe || isSimpleScreen || !orderDetail?.tracking_url;

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
            <GroupStepperProgress
                expectedTime={orderDetail?.expected_arrival_time}
                isLoading={isLoading}
                orderStatus={orderDetail?.order_status_log ?? []}
            />
            <Flex
                gap="1.6rem"
                flex={1}
                alignItems={{
                    base: isCenterDisplay ? "center" : undefined,
                    lg: undefined,
                }}
                justifyContent={{
                    base: undefined,
                    lg: isCenterDisplay ? "center" : undefined,
                }}
                flexDir={{ base: "column", lg: "row" }}
            >
                {showIframe && !isSimpleScreen && orderDetail?.tracking_url && (
                    <iframe
                        style={{ flex: 1 }}
                        id="tracking-map"
                        title="Tracking Map Frame"
                        width="787"
                        height="600"
                        src={orderDetail?.tracking_url}
                    />
                )}
                <Flex flexDir="column" w="47.7rem" h="100%" gap="1rem">
                    {orderDetail && (
                        <GroupWrapper titleFontSize="2rem" title={t("ORDER")}>
                            <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                                <Text>{`ID: #${orderDetail?.order_id}`}</Text>
                                {orderStatusLog?.[orderStatusLog?.length - 1] && (
                                    <Text>
                                        {t("ORDER_DATE", {
                                            time: formatDate(
                                                Number(orderStatusLog?.[orderStatusLog?.length - 1].logged_at),
                                                ddMMyyyy,
                                            ),
                                        })}
                                    </Text>
                                )}
                            </VStack>
                        </GroupWrapper>
                    )}
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
                                        <Text whiteSpace="pre-line">{`${formatPhoneNumber(orderDetail.driver.phone_number)}\r\n${driverInfo}`}</Text>
                                    </VStack>
                                </Flex>
                                <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                                    <Text fontWeight="600">{t("FOR_DRIVER_NOTE")}</Text>
                                    {orderDetail.driver_note && <Text>{orderDetail.driver_note}</Text>}
                                </VStack>
                            </VStack>
                        </GroupWrapper>
                    )}
                    {orderDetail?.address && (
                        <GroupWrapper titleFontSize="2rem" title={t("DELIVER_TO")}>
                            <HStack mt="0.8rem" spacing="1.2rem" fontSize="1.6rem">
                                <Image src="/images/icons/marker-pin-02.svg" w="4rem" h="4rem" alt="pin" />
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
                            <Text>{t(orderDetail?.cutlery_fee ? "HAVING_EATING_UTENSILS" : "NO_UTENSILS_NEEDED")}</Text>
                        </VStack>
                    </GroupWrapper>
                    {orderDetail?.payment_method && (
                        <GroupWrapper titleFontSize="2rem" title={t("PAYMENT_METHOD")}>
                            <Text lineHeight="4rem" fontSize="1.6rem" mt="0.8rem">
                                {`${orderDetail.payment_method.name} -
                                ${renderTxt(orderDetail?.payment_status_history?.[0]?.name)}`}
                            </Text>
                        </GroupWrapper>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default OrderDetail;
