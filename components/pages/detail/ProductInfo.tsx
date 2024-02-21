import { FoodDetailDto } from "@/types/response/FoodResponse";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { getCutoffTime } from "@/utils/functions";
import { HStack, Img, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const ProductInfo = ({ info, activeSKU }: { info?: FoodDetailDto; activeSKU?: SKUsDto }) => {
    const tFoodItem = useTranslations("COMMON.FOOD_ITEM");
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

    return (
        <VStack w="100%" align="flex-start" spacing="1rem">
            <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="2.4rem">
                {info?.name?.[0]?.text}
            </Text>
            <Text as="span" className="chef-name" fontSize="1.4rem" lineHeight="2rem" color="var(--gray-600)">
                <Text as="span">by </Text>
                <Text as="span" fontWeight="bold" color="var(--color-mediumslateblue)">
                    {info?.restaurant_name?.[0]?.text}
                </Text>
            </Text>
            <HStack w="100%" fontSize="1.6rem" color="var(--gray-500)" justifyContent="flex-start">
                <HStack spacing="0.4rem">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/timer.svg" />
                    <Text wordBreak="keep-all" className="text">
                        Còn {info?.available_quantity?.toLocaleString()} phần
                    </Text>
                </HStack>
                <HStack spacing="0.4rem">
                    <Img w="1.8rem" h="1.8rem" alt="" src="/images/icons/receipt-check.svg" />
                    <Text wordBreak="keep-all" className="text">
                        Đã bán {unitSold}
                    </Text>
                </HStack>

                <HStack spacing="0.4rem" className="d-flex align-items-center gap-1">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/star-icon1.svg" />
                    <Text wordBreak="keep-all" className="text">
                        Nhận xét {reviews}
                    </Text>
                </HStack>
            </HStack>

            <HStack h="3rem" color="black" fontSize="1.6rem" spacing="0.8rem">
                <Text textDecoration="line-through" textDecorationThickness="1px">
                    {activeSKU?.price?.toLocaleString() ?? "-"}
                </Text>
                <Text fontSize="2.4rem" fontWeight="bold">
                    {activeSKU?.price_after_discount?.toLocaleString() ?? "-"}
                </Text>
            </HStack>
            {info?.promotion && (
                <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/frame-2729.svg" />
                    <Text>Ưu đãi đến 50k</Text>
                </HStack>
            )}
            {info?.packaging_info && info?.packaging_info?.length > 0 && (
                <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                    <Img w="2rem" h="2rem" alt="" src="/images/icons/archive.svg" />
                    <Text>{info?.packaging_info[0].text}</Text>
                </HStack>
            )}
            {info?.cutoff_time && (
                <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/frame-2725.svg" />
                    <Text>Đặt trước {getCutoffTime(info?.cutoff_time, tFoodItem)} giờ sáng để điều chỉnh vị</Text>
                </HStack>
            )}
        </VStack>
    );
};
export default ProductInfo;
