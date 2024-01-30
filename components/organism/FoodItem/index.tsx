import { getCutoffTime } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Box, Flex, HStack, IconButton, Img, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { ProductTypeList } from "types";

const FoodItem = ({
    id,
    name,
    price,
    images,
    merchart,
    currentPrice,
    cook_method,
    ingredientName,
    distance,
    ratings,
    kcal,
    promotion,
    cutoff_time,
    top_label,
    units_sold = 0,
    quantity_available = 0,
    isShowMerchart = true,
    isShowRating = true,
    isShowDistance = true,
    isShowTime = true,
    isShowUnitSold = false,
    isShowQuantityAvailable = false,
    cooking_time_s,
}: ProductTypeList & {
    isShowMerchart?: boolean;
    isShowRating?: boolean;
    isShowDistance?: boolean;
    isShowTime?: boolean;
    isShowUnitSold?: boolean;
    isShowQuantityAvailable?: boolean;
}) => {
    const router = useRouter();

    const cookingTime = useMemo(() => {
        return cooking_time_s
            ? Number((cooking_time_s / 60).toLocaleString(undefined, { maximumFractionDigits: 2 }))
            : undefined;
    }, [cooking_time_s]);

    return (
        <Flex
            position="relative"
            overflow="hidden"
            h="100%"
            borderRadius="2.4rem"
            boxShadow="var(--box-shadow-md)"
            bg="white"
            minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
            maxW={{ base: "unset", md: "38.4rem" }}
            flexDir="column"
            cursor={"pointer"}
            onClick={() => {
                router.push(`${routes.ProductDetail}/${id}`);
            }}
        >
            <Flex flexDir="column" background="var(--primary-color)" p="0.8rem 1.6rem 3.2rem 1.6rem">
                {top_label ? (
                    <Text fontWeight="bold" lineHeight="2rem" fontSize="1.6rem" color="var(--color-gold)">
                        {top_label}
                    </Text>
                ) : (
                    <Box h="2rem"></Box>
                )}
                <Img px="2rem" src={images} alt="product" />
            </Flex>
            <VStack align="flex-start" p="0.8rem 2.4rem" spacing="0.4rem">
                <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="2.4rem">
                    {name}
                </Text>
                {isShowMerchart && (
                    <Text as="span" className="chef-name" fontSize="1.4rem" lineHeight="2rem" color="var(--gray-600)">
                        <Text as="span">by </Text>
                        <Text as="span" fontWeight="bold" color="var(--color-mediumslateblue)">
                            {merchart}
                        </Text>
                    </Text>
                )}
                <Flex w="100%" fontSize="1.6rem" color="var(--gray-500)" justifyContent="space-between">
                    <HStack spacing="0.8rem">
                        <HStack spacing="0.4rem">
                            <Img w="2.4rem" h="2.4rem" alt="" src="/images/markerpin02.svg" />
                            <Text wordBreak="keep-all" className="kcal font-weight-600">
                                {kcal} Kcal
                            </Text>
                        </HStack>
                        {isShowRating && (
                            <HStack spacing="0.4rem" className="d-flex align-items-center gap-1">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/star-icon1.svg" />
                                <Text wordBreak="keep-all" className="text">
                                    {ratings}
                                </Text>
                            </HStack>
                        )}
                    </HStack>
                    <HStack ml="0.5rem" spacing="0.8rem">
                        {isShowDistance && (
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/markerpin021.svg" />
                                <Text wordBreak="keep-all" className="text">
                                    {distance} km
                                </Text>
                            </HStack>
                        )}
                        {isShowTime && (
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/timer.svg" />
                                <Text wordBreak="keep-all" className="text">
                                    {cookingTime} min
                                </Text>
                            </HStack>
                        )}
                        {isShowUnitSold && (
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/icons/package-check.svg" />
                                <Text wordBreak="keep-all" className="text">
                                    Đã bán {units_sold > 50 ? "50+" : units_sold}
                                </Text>
                            </HStack>
                        )}
                        {isShowQuantityAvailable && (
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/icons/meal.svg" />
                                <Text wordBreak="keep-all" className="text">
                                    Còn {quantity_available} phần
                                </Text>
                            </HStack>
                        )}
                    </HStack>
                </Flex>
                <Text minH="4rem" color="var(--gray-600)" as="span" fontSize="1.4rem" className="text-ellipsis">
                    <Text as="span" wordBreak="keep-all" color="var(--color-mediumslateblue)" fontWeight="bold">
                        {cook_method}
                    </Text>
                    <Text wordBreak="break-word" fontWeight="medium" as="span">
                        {ingredientName && ` |  ${ingredientName}`}
                    </Text>
                </Text>
                <HStack h="3rem" color="black" fontSize="1.6rem" spacing="0.8rem">
                    <Text textDecoration="line-through" textDecorationThickness="1px">
                        {price?.toLocaleString()}
                    </Text>
                    <Text fontSize="2.4rem" fontWeight="bold">
                        {currentPrice?.toLocaleString()}
                    </Text>
                </HStack>
                {promotion && (
                    <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                        <Img w="2.4rem" h="2.4rem" alt="" src="/images/frame-2729.svg" />
                        <Text>{promotion}</Text>
                    </HStack>
                )}
                {cutoff_time && (
                    <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                        <Img w="2.4rem" h="2.4rem" alt="" src="/images/frame-2725.svg" />
                        <Text>Đặt trước {getCutoffTime(cutoff_time)} giờ sáng để điều chỉnh vị</Text>
                    </HStack>
                )}
            </VStack>
            <IconButton
                position="absolute"
                bottom="5rem"
                right="2.5rem"
                w="4rem"
                h="4rem"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                _hover={{ opacity: 0.7 }}
                _active={{ opacity: 0.5 }}
                borderRadius="50%"
                aria-label="add-btn"
                icon={<Img src="/images/plus.svg" />}
            />
        </Flex>
    );
};

export default FoodItem;
