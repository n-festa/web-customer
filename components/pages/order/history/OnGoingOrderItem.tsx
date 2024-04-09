"use client";
import GroupWrapper from "@/components/pages/confirm/GroupWrapper";
import useRenderText from "@/hooks/useRenderText";
import { OnGoingOrder } from "@/types/response/OnGoingOrderResponse";
import { OrderStatusLogTypeColor, ddMMyyyy } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import { formatMoney } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Button, Flex, HStack, Img, Stack, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
    orderInfo?: OnGoingOrder;
}

const OnGoingOrderItem = ({ orderInfo }: Props) => {
    const t = useTranslations("ORDER_HISTORY.HISTORY_ITEM");
    const tMileston = useTranslations("ORDER_DETAIL.ORDER_CONFIRMATION.MD");
    const { renderTxt } = useRenderText();
    const router = useRouter();

    const handleViewDetail = () => {
        router.push(`${routes.OrderDetail}/${orderInfo?.order_id}`);
    };

    const { restaurantInfo, orderItems } = useMemo(() => {
        return {
            restaurantInfo: orderInfo?.restaurant_info,
            orderItems: orderInfo?.order_items ?? [],
        };
    }, [orderInfo]);

    const specialText = useMemo(() => {
        if (restaurantInfo && restaurantInfo.specialty.length > 0) {
            return renderTxt(restaurantInfo.specialty);
        }
        return undefined;
    }, [renderTxt, restaurantInfo]);

    const orderItemsText = useMemo(() => {
        if (orderItems.length > 0) {
            return orderItems.map((el) => `${renderTxt(el.item_name)} x${el.qty_ordered}`).join(" ");
        }
        return undefined;
    }, [renderTxt, orderItems]);

    const statusList = useMemo(() => {
        return orderInfo?.order_status_log.sort((prev, curr) => {
            return Number(prev.logged_at) - Number(curr.logged_at);
        });
    }, [orderInfo?.order_status_log]);

    const orderStatusLog = useMemo(() => {
        if (statusList && statusList.length > 0) {
            const currentStatus = statusList?.reduce(
                (prev, curr) => (curr.milestone ? curr.milestone : prev),
                statusList[0].milestone,
            );

            if (currentStatus) {
                return {
                    status: tMileston(`${currentStatus?.toLocaleUpperCase()}`),
                    color: OrderStatusLogTypeColor[currentStatus ?? "UNKNOWN"],
                    dateTime: statusList[statusList?.length - 1].logged_at,
                };
            }
            return {
                dateTime: statusList[statusList?.length - 1].logged_at,
            };
        }
        return;
    }, [statusList, tMileston]);

    return (
        <GroupWrapper
            title={
                <HStack
                    fontSize={"1.8rem"}
                    lineHeight={"2rem"}
                    w="100%"
                    justifyContent={"space-between"}
                    p="1.6rem"
                    py-="0.8rem"
                >
                    <HStack>
                        <Text>{t("ORDER")}</Text>
                        <Text fontWeight={"bold"}>#{orderInfo?.order_id}</Text>
                    </HStack>
                    <Text fontSize="1.4rem" color="black">
                        {t("ORDER_DATE", {
                            time:
                                orderStatusLog && orderStatusLog.dateTime
                                    ? formatDate(Number(orderStatusLog.dateTime), ddMMyyyy)
                                    : "-",
                        })}
                    </Text>
                </HStack>
            }
            py="1.6rem"
            contentProps={{
                flexDirection: "column",
            }}
            px="0"
        >
            <Flex
                borderTop={"1px solid var(--gray-200)"}
                borderBottom={"1px solid var(--gray-200)"}
                justifyContent="space-between"
                p="1.6rem 2.4rem"
            >
                <VStack w="100%">
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        w="100%"
                        justifyContent={"start"}
                        alignItems={"flex-start"}
                        spacing={"1.6rem"}
                    >
                        <Img src={restaurantInfo?.restaurant_logo_img} boxSize="6.2rem" />
                        <VStack flex="1" alignItems={"flex-start"}>
                            <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="1.6rem">
                                {renderTxt(restaurantInfo?.restaurant_name)}
                            </Text>
                            <Text as="span" color="var(--gray-600)" fontSize={"1.2rem"} fontWeight={"400"}>
                                {specialText}
                            </Text>

                            <Text as="span" fontSize="1.6rem" lineHeight="2rem" color="black">
                                {orderItemsText}
                            </Text>
                        </VStack>
                    </Stack>
                </VStack>
                <Text fontSize="1.6rem" fontWeight="bold" color="var(--gray-900)" whiteSpace="nowrap">
                    {formatMoney(orderInfo?.order_total)}
                </Text>
            </Flex>
            <Stack
                direction={{ base: "column", md: "row" }}
                w="100%"
                p="1.6rem"
                pb="0"
                justifyContent={{
                    base: "flex-start",
                    md: "space-between",
                }}
            >
                {orderStatusLog && (
                    <Text variant={"cancelStatus"} color={orderStatusLog.color}>
                        {orderStatusLog.status}
                    </Text>
                )}
                <HStack spacing={"1rem"} flex={1} justifyContent={"flex-end"}>
                    <Button variant={"outlineWhite"} onClick={handleViewDetail}>
                        <Text>{t("VIEW_DETAILS")}</Text>
                    </Button>
                </HStack>
            </Stack>
        </GroupWrapper>
    );
};

export default OnGoingOrderItem;
