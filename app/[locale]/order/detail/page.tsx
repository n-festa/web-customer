"use client";
import GroupWrapper from "@/components/pages/confirm/GroupWrapper";
import CartTotalInfo from "@/components/pages/tracking/CartTotalInfo";
import GroupStepperProgress from "@/components/pages/tracking/GroupStepperProgress";
import { Avatar, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
// 3rd-party easing functions
const OrderDetail = () => {
    const t = useTranslations("ORDER_DETAIL");
    return (
        <Flex position="relative" bg="var(--gray-100)" py="1rem" px="4rem" h="100%" w="100%" flex={1} flexDir="column">
            <GroupStepperProgress />
            <Flex gap="1.6rem" flex={1}>
                <iframe
                    style={{ flex: 1 }}
                    id="tracking-map"
                    title="Tracking Map Frame"
                    width="787"
                    height="600"
                    src="https://cloudstg.ahamove.com/share-order/23ERRXVR/84905005248"
                />
                <Flex flexDir="column" w="47.7rem" h="100%" gap="1rem">
                    <GroupWrapper titleFontSize="2rem" title="Đơn hàng">
                        <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                            <Text>ID: #1234567</Text>
                            <Text>{t("ORDER_DATE", { time: "26/07/2023" })}</Text>
                        </VStack>
                    </GroupWrapper>
                    <GroupWrapper titleFontSize="2rem" title="Tài xế">
                        <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                            <Flex alignItems="center">
                                <Avatar w="6.4rem" h="6.4rem" src={"/images/Avatar.svg"} mr="1.6rem" />
                                <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                                    <Text fontWeight="600">Nguyễn Văn Ý</Text>
                                    <Text whiteSpace="pre-line">{`+84 909 123 123\r\nHonda Wave | 54-XI 125.55`}</Text>
                                </VStack>
                            </Flex>
                            <VStack alignItems="flex-start" fontSize="1.6rem" spacing="0.8rem" mt="0.8rem">
                                <Text fontWeight="600">{t("FOR_DRIVER_NOTE")}</Text>
                                <Text>Nhà màu cam</Text>
                            </VStack>
                        </VStack>
                    </GroupWrapper>
                    <GroupWrapper titleFontSize="2rem" title={t("DELIVER_TO")}>
                        <HStack mt="0.8rem" spacing="1.2rem" fontSize="1.6rem">
                            <Image src="/images/icons/marker-pin-02.svg" w="4rem" h="4rem" alt="pin" />
                            <Text fontWeight="500">
                                {"22 Nguyễn Đình Thi, phường Phước Long B, thành phố Thủ Đức, thành phố Hồ Chí Minh"}
                            </Text>
                        </HStack>
                    </GroupWrapper>
                    <CartTotalInfo />
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
