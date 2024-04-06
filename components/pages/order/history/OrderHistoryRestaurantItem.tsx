"use client";
import GroupWrapper from "@/components/pages/confirm/GroupWrapper";
import { GroupStars } from "@/components/pages/landing-page/testimonial";
import useRenderText from "@/hooks/useRenderText";
import { OrderStatusLogType, PaymentMethod } from "@/types/enum";
import { OrderItem } from "@/types/order";
import { HistoricalOrderByRestaurant } from "@/types/response/GetHistoryOrderResponse";
import { RestaurantInfo } from "@/types/response/base";
import { ddMMyyyy } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import { getOrderStatusLog, isNullOrEmpty } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Button, HStack, Img, Stack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
    orderInfo?: HistoricalOrderByRestaurant;
    handleReorder: (orderItems?: OrderItem[], restaurant?: RestaurantInfo) => void;
}

const OrderHistoryRestaurantItem = ({ orderInfo, handleReorder }: Props) => {
    const t = useTranslations("ORDER_HISTORY.HISTORY_ITEM");
    const tMileston = useTranslations("ORDER_DETAIL.ORDER_CONFIRMATION.MD");
    const { renderTxt } = useRenderText();
    const router = useRouter();

    const handleViewDetail = () => {
        router.push(`${routes.OrderDetail}/${orderInfo?.order_id}`);
    };

    const handleViewRating = () => {
        router.push(`${routes.orderReview}/${orderInfo?.order_id}`);
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
        return getOrderStatusLog(statusList ?? [], tMileston);
    }, [statusList, tMileston]);

    return (
        <GroupWrapper
            title={
                <HStack
                    fontSize={"1.8rem"}
                    lineHeight={"2rem"}
                    w="100%"
                    justifyContent={"space-between"}
                    borderBottom={"1px solid var(--gray-200)"}
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
        >
            <VStack w="100%" p="1.6rem 2.4rem" borderBottom={"1px solid var(--gray-200)"}>
                <Stack
                    direction={{ base: "column", md: "row" }}
                    w="100%"
                    justifyContent={"start"}
                    alignItems={"flex-start"}
                    spacing={"1.6rem"}
                >
                    <Img src={restaurantInfo?.restaurant_logo_img} boxSize="6.2rem" />
                    <VStack flex="1" alignItems={"flex-start"}>
                        <HStack w="100%" alignItems={"center"} justifyContent={"space-between"}>
                            <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="1.6rem">
                                {renderTxt(restaurantInfo?.restaurant_name)}
                            </Text>
                            <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="1.6rem">
                                {orderInfo?.order_total?.toLocaleString()}đ
                            </Text>
                        </HStack>
                        <Text as="span" color="var(--gray-600)" fontSize={"1.2rem"} fontWeight={"400"}>
                            {specialText}
                        </Text>

                        <Text as="span" fontSize="1.6rem" lineHeight="2rem" color="black">
                            {orderItemsText}
                        </Text>
                        {orderInfo?.payment_method && (
                            <HStack>
                                <Text as="span" fontSize="1.6rem" lineHeight="2rem" color="black">
                                    {t("PAYMENT_METHOD", { method: orderInfo?.payment_method?.name ?? "-" })}
                                </Text>
                                <Img
                                    src={
                                        orderInfo?.payment_method.id === PaymentMethod.Momo
                                            ? "/images/icons/payment_momo.svg"
                                            : "/images/icons/payment_cash.svg"
                                    }
                                />
                            </HStack>
                        )}
                    </VStack>
                </Stack>
            </VStack>
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
                <Wrap alignItems={"center"} spacing={{ base: "1rem", md: "2.4rem" }} justify={"flex-start"}>
                    {orderStatusLog && (
                        <WrapItem>
                            <Text variant={"cancelStatus"} color={orderStatusLog?.color}>
                                {orderStatusLog?.status}
                            </Text>
                        </WrapItem>
                    )}

                    {orderInfo?.order_score && (
                        <WrapItem>
                            <GroupStars star={orderInfo?.order_score} h="100%" />
                        </WrapItem>
                    )}
                </Wrap>
                <HStack spacing={"1rem"} flex={1} justifyContent={"flex-end"}>
                    {isNullOrEmpty(orderInfo?.order_score) &&
                        orderStatusLog?.statusRaw === OrderStatusLogType.COMPLETED && (
                            <Button variant={"btnRating"} onClick={handleViewRating}>
                                <Text>{t("RATING")}</Text>
                            </Button>
                        )}
                    <Button
                        variant={"outlineWhite"}
                        onClick={() => handleReorder(orderInfo?.order_items, orderInfo?.restaurant_info)}
                    >
                        <Text>{t("REORDER")}</Text>
                    </Button>
                    <Button variant={"outlineWhite"} onClick={handleViewDetail}>
                        <Text>{t("VIEW_DETAILS")}</Text>
                    </Button>
                </HStack>
            </Stack>
        </GroupWrapper>
    );
};

export default OrderHistoryRestaurantItem;
