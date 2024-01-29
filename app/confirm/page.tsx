"use client";

import { BackButton } from "@/components/atoms/bottom/BackButton";
import DeliveryDestinationGroup from "@/components/pages/confirm/DeliveryDestinationGroup";
import DeliveryTimeGroup from "@/components/pages/confirm/DeliveryTimeGroup";
import PackageGroup from "@/components/pages/confirm/PackageGroup";
import PaymentGroup from "@/components/pages/confirm/PaymentGroup";
import PaymentMethodGroup from "@/components/pages/confirm/PaymentMethodGroup";
import PromotionGroup from "@/components/pages/confirm/PromotionGroup";
import { Flex, VStack } from "@chakra-ui/react";

const ConfirmOrderPage = () => {
    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="var(--gray-100)" w="100%" h="100%">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="6.7rem" w="100%">
                <BackButton label="Quay lại trang trước" />
                <Flex mt="1.6rem" w="100%" gap="1.6rem" flex={1}>
                    <VStack flex={1} spacing="1.6rem">
                        <DeliveryDestinationGroup />
                        <DeliveryTimeGroup />
                        <PackageGroup />
                        <PaymentMethodGroup />
                        <PromotionGroup />
                    </VStack>
                    <PaymentGroup />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ConfirmOrderPage;
