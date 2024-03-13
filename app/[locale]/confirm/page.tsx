"use client";

import { BackButton } from "@/components/atoms/bottom/BackButton";
import DeliveryDestinationGroup from "@/components/pages/confirm/DeliveryDestinationGroup";
import DeliveryTimeGroup from "@/components/pages/confirm/DeliveryTimeGroup";
import PackageGroup from "@/components/pages/confirm/PackageGroup";
import PaymentGroup from "@/components/pages/confirm/PaymentGroup";
import PaymentMethodGroup from "@/components/pages/confirm/PaymentMethodGroup";
import PromotionGroup from "@/components/pages/confirm/PromotionGroup";
import useConfirmOrder from "@/hooks/useConfirmOrder";
import { Flex, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Suspense } from "react";

const ConfirmOrderPageContent = () => {
    const t = useTranslations("COMMON");
    const { cart, formRef, handleConfirm, paymentMethod, setPaymentMethod, applicationFee, cutleryFee, totalPrice } =
        useConfirmOrder();
    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="var(--gray-100)" w="100%" h="100%">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="4.3rem" w="100%">
                <BackButton label={t("BACK_PAGE")} />
                <Flex mt="1.6rem" w="100%" gap="1.6rem" flexDir={{ base: "column", lg: "row" }} flex={1}>
                    <VStack flex={1} spacing="1.6rem">
                        <DeliveryDestinationGroup formRef={formRef} />
                        <DeliveryTimeGroup />
                        <PackageGroup />
                        <PaymentMethodGroup paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                        <PromotionGroup />
                    </VStack>
                    <Suspense>
                        <PaymentGroup
                            totalPrice={totalPrice}
                            applicationFee={applicationFee}
                            cutleryFee={cutleryFee}
                            cart={cart}
                            w={{ base: "100%", md: "44.5rem" }}
                            onConfirm={handleConfirm}
                        />
                    </Suspense>
                </Flex>
            </Flex>
        </Flex>
    );
};
const ConfirmOrderPage = () => (
    <Suspense>
        <ConfirmOrderPageContent />
    </Suspense>
);

export default ConfirmOrderPage;
