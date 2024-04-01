"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import SeachBox from "@/components/molecules/SearchBox";
import GroupWrapper from "@/components/pages/confirm/GroupWrapper";
import HistoryFilter from "@/components/pages/order/history/HistoryFilter";
import HistoryList from "@/components/pages/order/history/HistoryList";
import OnGoingOrder from "@/components/pages/order/history/OngoingOrder";
import useOrderHistory from "@/hooks/useOrderHistory";
import {
    Badge,
    Flex,
    HStack,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";
import debounce from "lodash/debounce";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

const OrderHistoryPage = () => {
    const t = useTranslations();

    const {
        tab,
        onGoingOrder,
        condition,
        totalHistory,
        history,
        isLoading,
        onChangeTab,
        onChangeType,
        onChangeFilterCondition,
    } = useOrderHistory();

    const onChangeSearchKey = useCallback(
        debounce((value?: string) => {
            onChangeFilterCondition({
                type: condition.type,
                name: "searchKey",
                value: value,
            });
        }, 500),
        [condition.type],
    );

    return (
        <Flex flexDirection={"column"} alignItems={"center"} w="100%" h="100%" bg="var(--gray-300)">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="6.7rem" w="100%">
                <BackButton label={t("COMMON.BACK_PAGE")} />

                <GroupWrapper
                    titleFontSize="2rem"
                    title={t("ORDER_HISTORY.MY_ORDERS")}
                    p="1.6rem 0 0 0"
                    titleProps={{ px: "1.6rem" }}
                >
                    <Tabs position="relative" variant="history" mt="0.8rem" w="100%" index={tab} onChange={onChangeTab}>
                        <TabList>
                            <Tab px="1.6rem">
                                <HStack p="0 0.2rem" justifyContent={"space-between"} spacing={"0.8rem"}>
                                    <Text whiteSpace={"nowrap"}>{t("ORDER_HISTORY.DELIVERING")}</Text>
                                    <Badge
                                        borderRadius={"1.6rem"}
                                        fontSize={"1.4rem"}
                                        lineHeight={"2rem"}
                                        p="0.2rem 1rem"
                                        fontWeight={"medium"}
                                        className="history-number"
                                    >
                                        {onGoingOrder?.length ?? 0}
                                    </Badge>
                                </HStack>
                            </Tab>
                            <Tab px="1.6rem">
                                <HStack p="0 0.2rem" justifyContent={"space-between"} spacing={"0.8rem"}>
                                    <Text whiteSpace={"nowrap"}>{t("ORDER_HISTORY.HISTORY")}</Text>
                                    <Badge
                                        borderRadius={"1.6rem"}
                                        fontSize={"1.4rem"}
                                        lineHeight={"2rem"}
                                        p="0.2rem 1rem"
                                        fontWeight={"medium"}
                                        className="history-number"
                                    >
                                        {totalHistory ?? 0}
                                    </Badge>
                                </HStack>
                            </Tab>
                        </TabList>
                        <TabIndicator height="0.2rem" bg="#00322A" borderRadius="1px" />
                        <TabPanels>
                            <TabPanel bg="var(--gray-300)" px="0">
                                <OnGoingOrder orderInfo={onGoingOrder} isLoading={isLoading} />
                            </TabPanel>
                            <TabPanel px="0">
                                <VStack w="100%" direction={"column"} bg="var(--gray-300)" spacing={"0.8rem"}>
                                    <VStack w="100%" px="1.6rem" bg="white">
                                        <SeachBox
                                            placeholder={t("ORDER_HISTORY.SEARCH_FOOD_RESTAURANT")}
                                            flex="1"
                                            groupsProps={{ my: "1rem" }}
                                            variant={"searchBoxSm"}
                                            borderRadius={"0.4rem"}
                                            defaultValue={condition[condition.type].searchKey}
                                            key={condition.type}
                                            onChange={(e) => onChangeSearchKey(e.target.value)}
                                        />
                                        <HistoryFilter
                                            condition={condition}
                                            onChangeType={onChangeType}
                                            onChangeFilterCondition={onChangeFilterCondition}
                                        />
                                    </VStack>
                                    {<HistoryList histories={history} type={condition.type} />}
                                </VStack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </GroupWrapper>
            </Flex>
        </Flex>
    );
};

export default OrderHistoryPage;
