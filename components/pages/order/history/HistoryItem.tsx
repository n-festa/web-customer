"use client";
import GroupWrapper from "@/components/pages/confirm/GroupWrapper";
import { GroupStars } from "@/components/pages/landing-page/testimonial";
import useRenderText from "@/hooks/useRenderText";
import { OrderStatus, OrderStatusLogType } from "@/types/enum";
import { OrderItem } from "@/types/order";
import { HistoricalOrderByFood } from "@/types/response/GetHistoryOrderResponse";
import { RestaurantInfo } from "@/types/response/base";
import { ddMMyyyy } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import { formatMoney, getOrderStatusLog, isNullOrEmpty } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Button, Flex, HStack, Img, Stack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
    orderStatus?: OrderStatus;
    orderInfo?: HistoricalOrderByFood;
    handleReorder: (
        orderItems?: (OrderItem | HistoricalOrderByFood | undefined)[],
        restaurant?: RestaurantInfo,
    ) => void;
}

const HistoryItem = ({ orderInfo, handleReorder }: Props) => {
    const t = useTranslations("ORDER_HISTORY.HISTORY_ITEM");
    const tMileston = useTranslations("ORDER_DETAIL.ORDER_CONFIRMATION.MD");
    const router = useRouter();
    const { renderTxt } = useRenderText();

    const orderStatusLog = useMemo(() => {
        return getOrderStatusLog(orderInfo?.order_status_log ?? [], tMileston);
    }, [orderInfo?.order_status_log, tMileston]);

    const handleViewDetail = () => {
        router.push(`${routes.OrderDetail}/${orderInfo?.order_id}`);
    };

    const handleViewRating = () => {
        router.push(`${routes.orderReview}/${orderInfo?.order_id}`);
    };

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
            px="0"
            contentProps={{
                flexDirection: "column",
            }}
        >
            <Flex
                justifyContent="space-between"
                p="1.6rem 2.4rem"
                borderTop={"1px solid var(--gray-200)"}
                borderBottom={"1px solid var(--gray-200)"}
            >
                <VStack w="100%">
                    <Stack
                        direction={{ base: "column", md: "row" }}
                        w="100%"
                        justifyContent={"start"}
                        alignItems={"flex-start"}
                        spacing={"1.6rem"}
                    >
                        <Img src={orderInfo?.image} boxSize="6.2rem" />
                        <VStack flex="1" alignItems={"flex-start"}>
                            <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="1.6rem">
                                {renderTxt(orderInfo?.name)} x {orderInfo?.qty_ordered?.toLocaleString()}
                            </Text>
                            <Text color="var(--gray-600)" as="span" fontSize="1.4rem" className="text-ellipsis">
                                <Text
                                    as="span"
                                    wordBreak="keep-all"
                                    color="var(--color-mediumslateblue)"
                                    fontWeight="600"
                                >
                                    {renderTxt(orderInfo?.main_cooking_method)}{" "}
                                </Text>
                                <Text wordBreak="break-word" fontWeight="600" as="span">
                                    |{" "}
                                    {renderTxt([
                                        {
                                            ISO_language_code: "eng",
                                            text: orderInfo?.ingredient_brief_eng,
                                        },
                                        {
                                            ISO_language_code: "vie",
                                            text: orderInfo?.ingredient_brief_vie,
                                        },
                                    ])}
                                </Text>
                            </Text>
                            {!isNullOrEmpty(orderInfo?.notes) && (
                                <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="1.6rem">
                                    {orderInfo?.notes}
                                </Text>
                            )}
                            <Text as="span" fontSize="1.4rem" lineHeight="2rem" color="var(--gray-600)">
                                <Text as="span">by </Text>
                                <Text as="span" fontWeight="bold" color="var(--color-mediumslateblue)">
                                    {renderTxt(orderInfo?.restaurant_info?.restaurant_name)}
                                </Text>
                            </Text>
                        </VStack>
                    </Stack>
                </VStack>
                <Text fontSize="1.6rem" fontWeight="bold" color="var(--gray-900)" whiteSpace="nowrap">
                    {formatMoney(
                        orderInfo?.price && orderInfo?.qty_ordered
                            ? orderInfo?.price * orderInfo?.qty_ordered
                            : undefined,
                    )}
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
                <Wrap alignItems={"center"} spacing={{ base: "1rem", md: "2.4rem" }} justify={"flex-start"}>
                    <WrapItem>
                        <Text variant={"cancelStatus"} color={orderStatusLog?.color}>
                            {orderStatusLog?.status}
                        </Text>
                    </WrapItem>
                    {!isNullOrEmpty(orderInfo?.calorie_kcal) && (
                        <WrapItem>
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/markerpin02.svg" />
                                <Text wordBreak="keep-all" className="kcal font-weight-600" fontSize={"1.6rem"}>
                                    {orderInfo?.calorie_kcal} Kcal
                                </Text>
                            </HStack>
                        </WrapItem>
                    )}
                    {orderInfo?.score && (
                        <WrapItem>
                            <GroupStars star={orderInfo?.score} h="100%" />
                        </WrapItem>
                    )}
                </Wrap>
                <HStack spacing={"1rem"} flex={1} justifyContent={"flex-end"}>
                    {isNullOrEmpty(orderInfo?.score) && orderStatusLog?.statusRaw === OrderStatusLogType.COMPLETED && (
                        <Button variant={"btnRating"} onClick={handleViewRating}>
                            <Text>{t("RATING")}</Text>
                        </Button>
                    )}
                    <Button
                        variant={"outlineWhite"}
                        onClick={() => handleReorder([orderInfo], orderInfo?.restaurant_info)}
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

export default HistoryItem;
