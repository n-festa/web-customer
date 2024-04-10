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
    const {
        cart,
        addCutlery,
        setAddCutlery,
        formRef,
        handleConfirm,
        paymentMethod,
        setPaymentMethod,
        applicationFee,
        cutleryFee,
        totalDiscount,
        totalPrice,
        couponList,
        finalPrice,
        deliveryFee,
        customerLocation,
        setCustomerLocation,
        packageFee,
        discounts,
        onApplyCoupon,
        setDeliveryFee,
        setExpectedTime,
        isDisableOrder,
        isLoading,
        setDiscounts,
    } = useConfirmOrder();

    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="var(--gray-100)" w="100%" h="100%">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="4.3rem" w="100%">
                <BackButton label={t("BACK_PAGE")} />
                <Flex mt="1.6rem" w="100%" gap="1.6rem" flexDir={{ base: "column", lg: "row" }} flex={1}>
                    <VStack flex={1} spacing="1.6rem">
                        <DeliveryDestinationGroup
                            restaurantId={Number(cart?.restaurant_id)}
                            formRef={formRef}
                            setCustomerLocation={setCustomerLocation}
                            setDeliveryFee={setDeliveryFee}
                        />
                        <DeliveryTimeGroup
                            latAddress={customerLocation.lat}
                            longAddress={customerLocation.lng}
                            setExpectedTime={setExpectedTime}
                        />
                        <PackageGroup addCutlery={addCutlery} setAddCutlery={setAddCutlery} />
                        <PaymentMethodGroup paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                        <PromotionGroup
                            setDiscounts={setDiscounts}
                            discounts={discounts}
                            items={couponList?.coupons ?? []}
                            onApplyCoupon={onApplyCoupon}
                        />
                    </VStack>
                    <Suspense>
                        <PaymentGroup
                            totalPrice={totalPrice}
                            applicationFee={applicationFee}
                            cutleryFee={addCutlery ? cutleryFee : undefined}
                            cart={cart}
                            deliveryFee={deliveryFee}
                            finalPrice={finalPrice}
                            packageFee={packageFee}
                            isDisableOrder={isDisableOrder}
                            isLoading={isLoading}
                            totalDiscount={totalDiscount}
                            w={{ base: "100%", lg: "44.5rem" }}
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
