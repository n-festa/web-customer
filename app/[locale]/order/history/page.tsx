"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import SeachBox from "@/components/molecules/SearchBox";
import GroupWrapper from "@/components/pages/confirm/GroupWrapper";
import HistoryFilter from "@/components/pages/order/history/HistoryFilter";
import HistoryItem from "@/components/pages/order/history/HistoryItem";
import { OrderStatus } from "@/types/enum";
import { Badge, Flex, HStack, Tab, TabIndicator, TabList, Tabs, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const OrderHistoryPage = () => {
    const [tab, setTab] = useState(1);
    return (
        <Flex flexDirection={"column"} alignItems={"center"} w="100%" h="100%" bg="var(--gray-300)">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="6.7rem" w="100%">
                <BackButton label="Quay lại trang trước" />

                <GroupWrapper titleFontSize="2rem" title="Đơn hàng của tôi" py="1.6rem">
                    <Tabs position="relative" variant="history" mt="0.8rem" index={tab} onChange={setTab} w="100%">
                        <TabList>
                            <Tab>
                                <HStack p="0 0.2rem" justifyContent={"space-between"} spacing={"0.8rem"}>
                                    <Text whiteSpace={"nowrap"}>Đang giao</Text>
                                    <Badge
                                        borderRadius={"1.6rem"}
                                        fontSize={"1.4rem"}
                                        lineHeight={"2rem"}
                                        p="0.2rem 1rem"
                                        fontWeight={"medium"}
                                        className="history-number"
                                    >
                                        0
                                    </Badge>
                                </HStack>
                            </Tab>
                            <Tab>
                                <HStack p="0 0.2rem" justifyContent={"space-between"} spacing={"0.8rem"}>
                                    <Text whiteSpace={"nowrap"}>Lịch sử</Text>
                                    <Badge
                                        borderRadius={"1.6rem"}
                                        fontSize={"1.4rem"}
                                        lineHeight={"2rem"}
                                        p="0.2rem 1rem"
                                        fontWeight={"medium"}
                                        className="history-number"
                                    >
                                        3
                                    </Badge>
                                </HStack>
                            </Tab>
                        </TabList>
                        <TabIndicator height="0.2rem" bg="#00322A" borderRadius="1px" />
                    </Tabs>
                </GroupWrapper>
                <Flex w="100%" direction={"column"}>
                    <SeachBox
                        placeholder="Gõ tên món ăn, nhà hàng mà bạn đang muốn tìm"
                        flex="1"
                        groupsProps={{ my: "1rem" }}
                        variant={"searchBoxSm"}
                        borderRadius={"0.4rem"}
                    />
                    <HistoryFilter />

                    <VStack w="100%" spacing={"0.8rem"}>
                        <HistoryItem />
                        <HistoryItem />
                        <HistoryItem orderStatus={OrderStatus.Cancel} />
                    </VStack>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default OrderHistoryPage;
