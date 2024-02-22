"use client";
import GroupWrapper from "@/components/pages/confirm/GroupWrapper";
import { GroupStars } from "@/components/pages/landing-page/testimonial";
import { OrderStatus } from "@/types/enum";
import { routes } from "@/utils/routes";
import { Button, HStack, Img, Stack, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
    orderStatus?: OrderStatus;
}

const HistoryItem = ({ orderStatus = OrderStatus.Success }: Props) => {
    const router = useRouter();
    const status = useMemo(() => {
        switch (orderStatus) {
            case OrderStatus.Cancel:
                return "Hủy đơn hàng";
            default:
                return "Giao hàng thành công";
        }
    }, [orderStatus]);

    const handleViewDetail = () => {
        router.push(routes.OrderDetail);
    };
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
                        <Text>Đơn hàng</Text>
                        <Text fontWeight={"bold"}>#1234567</Text>
                    </HStack>
                    <Text fontSize="1.4rem" color="black">
                        Hôm nay
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
                    <Img src="/images/order-item.png" boxSize="6.2rem" />
                    <VStack flex="1" alignItems={"flex-start"}>
                        <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="1.6rem">
                            Cơm Ức Gà Gạo Lứt x 2
                        </Text>
                        <Text color="var(--gray-600)" as="span" fontSize="1.4rem" className="text-ellipsis">
                            <Text as="span" wordBreak="keep-all" color="var(--color-mediumslateblue)" fontWeight="600">
                                Luộc
                            </Text>
                            <Text wordBreak="break-word" fontWeight="600" as="span">
                                {" "}
                                | Ức gà, gạo lức, bông cải trắng, bánh tart, trái cây
                            </Text>
                        </Text>
                        <Text as="span" fontSize="1.4rem" lineHeight="2rem" color="var(--gray-600)">
                            <Text as="span">by </Text>
                            <Text as="span" fontWeight="bold" color="var(--color-mediumslateblue)">
                                The Chef Town
                            </Text>
                        </Text>
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
                {orderStatus === OrderStatus.Success ? (
                    <Wrap alignItems={"center"} spacing={{ base: "1rem", md: "2.4rem" }} justify={"flex-start"}>
                        <WrapItem>
                            <Text variant={"successStatus"}>{status}</Text>
                        </WrapItem>
                        <WrapItem>
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/markerpin02.svg" />
                                <Text wordBreak="keep-all" className="kcal font-weight-600" fontSize={"1.6rem"}>
                                    356 Kcal
                                </Text>
                            </HStack>
                        </WrapItem>
                        <WrapItem>
                            <GroupStars star={5} h="100%" />
                        </WrapItem>
                    </Wrap>
                ) : (
                    <Text variant={"cancelStatus"}>{status}</Text>
                )}
                <HStack spacing={"1rem"} flex={1} justifyContent={"flex-end"}>
                    <Button variant={"outlineWhite"}>
                        <Text>Mua lại</Text>
                    </Button>
                    <Button variant={"outlineWhite"} onClick={handleViewDetail}>
                        <Text>Xem chi tiết</Text>
                    </Button>
                </HStack>
            </Stack>
        </GroupWrapper>
    );
};

export default HistoryItem;
