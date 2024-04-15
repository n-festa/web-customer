import useRenderText from "@/hooks/useRenderText";
import { FoodDetailDto } from "@/types/response/FoodResponse";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { routes } from "@/utils/routes";
import { HStack, Img, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const ProductInfo = ({ info, activeSKU }: { info?: FoodDetailDto; activeSKU?: SKUsDto }) => {
    const t = useTranslations("PRODUCT_DETAIL.PRODUCT_INFO");
    const router = useRouter();
    const { renderTxt } = useRenderText();
    const unitSold = useMemo(() => {
        const unitSoldValue = info?.units_sold;
        if (unitSoldValue) {
            if (unitSoldValue > 50) return "50+";
            return String(unitSoldValue);
        }

        return "0";
    }, [info?.units_sold]);

    const reviews = useMemo(() => {
        const reviewNumber = info?.review_number;
        if (reviewNumber) {
            if (reviewNumber > 100) return "1000+";
            return String(reviewNumber);
        }

        return "0";
    }, [info?.review_number]);

    const { isShowDiscountPrice, price, latestPrice } = useMemo(() => {
        const price = activeSKU?.price;
        const discountPrice = activeSKU?.price_after_discount;

        if (discountPrice && price && discountPrice < price) {
            return {
                price: price?.toLocaleString() ?? "-",
                isShowDiscountPrice: true,
                latestPrice: discountPrice?.toLocaleString() ?? "-",
            };
        }
        return { latestPrice: price?.toLocaleString() ?? "-", isShowDiscountPrice: false };
    }, [activeSKU]);

    return (
        <VStack w="100%" align="flex-start" spacing="1.2rem">
            <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="3.6rem">
                {renderTxt(info?.name)}
            </Text>
            <Text as="span" className="chef-name" fontSize="1.4rem" lineHeight="2rem" color="var(--gray-600)">
                <Text as="span">by </Text>
                <Text
                    onClick={() => {
                        router.push(routes.RestaurantDetail + `/${info?.restaurant_id}`);
                    }}
                    cursor="pointer"
                    as="span"
                    fontWeight="bold"
                    color="var(--color-mediumslateblue)"
                >
                    {renderTxt(info?.restaurant_name)}
                </Text>
            </Text>
            <HStack mt="0.8rem" w="100%" fontSize="1.6rem" color="var(--gray-500)" justifyContent="flex-start">
                <HStack spacing="0.4rem">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/timer.svg" />
                    <Text wordBreak="keep-all" className="text">
                        {t("QUANTITY_AVAILABLE", {
                            number: info?.available_quantity?.toLocaleString(),
                        })}
                    </Text>
                </HStack>
                <HStack spacing="0.4rem">
                    <Img w="1.8rem" h="1.8rem" alt="" src="/images/icons/receipt-check.svg" />
                    <Text wordBreak="keep-all" className="text">
                        {t("SOLD_OUT")} {unitSold}
                    </Text>
                </HStack>

                <HStack spacing="0.4rem" className="d-flex align-items-center gap-1">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/star-icon1.svg" />
                    <Text wordBreak="keep-all" className="text">
                        {t("COMMENT")} {reviews}
                    </Text>
                </HStack>
            </HStack>

            <HStack h="3.8rem" color="black" fontSize="1.6rem" spacing="0.8rem">
                {isShowDiscountPrice && (
                    <Text textDecoration="line-through" textDecorationThickness="1px">
                        {price}
                    </Text>
                )}
                <Text fontSize="2.4rem" fontWeight="bold">
                    {latestPrice}
                </Text>
            </HStack>
            {info?.promotion && (
                <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/frame-2729.svg" />
                    <Text>{t("DISCOUNT_UP_TO", { money: 50 })}</Text>
                </HStack>
            )}
            {info?.is_advanced_customizable && (
                <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/icons/chef.svg" />
                    <Text>{t("AVAILABLE_TO_EDIT_TASTE")}</Text>
                </HStack>
            )}
        </VStack>
    );
};
export default ProductInfo;
