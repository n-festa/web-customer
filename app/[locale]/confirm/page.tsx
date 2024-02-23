"use client";

import { BackButton } from "@/components/atoms/bottom/BackButton";
import DeliveryDestinationGroup from "@/components/pages/confirm/DeliveryDestinationGroup";
import DeliveryTimeGroup from "@/components/pages/confirm/DeliveryTimeGroup";
import PackageGroup from "@/components/pages/confirm/PackageGroup";
import PaymentGroup from "@/components/pages/confirm/PaymentGroup";
import PaymentMethodGroup from "@/components/pages/confirm/PaymentMethodGroup";
import PromotionGroup from "@/components/pages/confirm/PromotionGroup";
import { Flex, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const ConfirmOrderPage = () => {
    const t = useTranslations("COMMON");
    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="var(--gray-100)" w="100%" h="100%">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="6.7rem" w="100%">
                <BackButton label={t("BACK_PAGE")} />
                <Flex mt="1.6rem" w="100%" gap="1.6rem" flexDir={{ base: "column", lg: "row" }} flex={1}>
                    <VStack flex={1} spacing="1.6rem">
                        <DeliveryDestinationGroup />
                        <DeliveryTimeGroup />
                        <PackageGroup />
                        <PaymentMethodGroup />
                        <PromotionGroup />
                    </VStack>
                    <PaymentGroup w={{ base: "100%", md: "unset" }} />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ConfirmOrderPage;
