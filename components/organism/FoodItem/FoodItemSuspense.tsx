import useUpdateCart from "@/hooks/useUpdateCart";
import { ProductTypeList } from "@/types";
import { isNullOrEmpty } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Box, Flex, HStack, IconButton, Img, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const FoodItemSuspense = ({
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
    restaurantId,
    isShowAddButton = true,
    disableAction = false,
    is_advanced_customizable,
}: ProductTypeList & {
    isShowMerchart?: boolean;
    isShowRating?: boolean;
    isShowDistance?: boolean;
    isShowTime?: boolean;
    isShowUnitSold?: boolean;
    isShowQuantityAvailable?: boolean;
    isShowAddButton?: boolean;
    disableAction?: boolean;
}) => {
    const t = useTranslations("COMMON.FOOD_ITEM");
    const router = useRouter();
    const { handleQuickAdd, loading } = useUpdateCart();

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
            cursor={disableAction ? "" : "pointer"}
            onClick={() => {
                if (disableAction) return;

                const path = !isNullOrEmpty(restaurantId)
                    ? `${routes.RestaurantDetail}/${restaurantId}?des=${routes.ProductDetail}/${id}`
                    : `${routes.ProductDetail}/${id}`;

                router.push(path);
            }}
        >
            <Flex flexDir="column" background="var(--primary-color)" p="0.8rem 1.6rem 3.2rem 1.6rem">
                {!top_label ? (
                    <Text fontWeight="bold" minH="2rem" lineHeight="2rem" fontSize="1.6rem" color="var(--color-gold)">
                        {top_label}
                    </Text>
                ) : (
                    <Box h="2rem"></Box>
                )}
                <Box mt="0.4rem" borderRadius="0.8rem" alignSelf="center" w="31.2rem" h="23.2rem" overflow="hidden">
                    <Img w="100%" h="100%" src={images} alt="product" />
                </Box>
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
                        {kcal && (
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/markerpin02.svg" />
                                <Text wordBreak="keep-all" className="kcal font-weight-600">
                                    {kcal} Kcal
                                </Text>
                            </HStack>
                        )}
                        {isShowRating && ratings && (
                            <HStack spacing="0.4rem" className="d-flex align-items-center gap-1">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/star-icon1.svg" />
                                <Text wordBreak="keep-all" className="text">
                                    {ratings}
                                </Text>
                            </HStack>
                        )}
                    </HStack>
                    <HStack ml="0.5rem" spacing="0.8rem">
                        {isShowDistance && distance && (
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/markerpin021.svg" />
                                <Text wordBreak="keep-all" className="text">
                                    {distance} km
                                </Text>
                            </HStack>
                        )}
                        {isShowTime && cookingTime && (
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/timer.svg" />
                                <Text wordBreak="keep-all" className="text">
                                    {cookingTime} min
                                </Text>
                            </HStack>
                        )}
                        {isShowUnitSold && units_sold && (
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/icons/package-check.svg" />
                                <Text wordBreak="keep-all" className="text">
                                    {t("SOLD_OUT")} {units_sold > 50 ? "50+" : units_sold}
                                </Text>
                            </HStack>
                        )}
                        {isShowQuantityAvailable && quantity_available !== undefined && (
                            <HStack spacing="0.4rem">
                                <Img w="2.4rem" h="2.4rem" alt="" src="/images/icons/meal.svg" />
                                <Text wordBreak="keep-all" className="text">
                                    {t("QUANTITY_AVAILABLE", { number: quantity_available })}
                                </Text>
                            </HStack>
                        )}
                    </HStack>
                </Flex>
                <Text minH="4rem" color="var(--gray-600)" as="span" fontSize="1.4rem" className="text-ellipsis">
                    <Text as="span" wordBreak="keep-all" color="var(--color-mediumslateblue)" fontWeight="600">
                        {cook_method}
                    </Text>
                    <Text wordBreak="break-word" fontWeight="600" as="span">
                        {ingredientName && ` |  ${ingredientName}`}
                    </Text>
                </Text>
                <HStack
                    mb="4rem"
                    w="100%"
                    h="3rem"
                    color="black"
                    fontSize="1.6rem"
                    spacing="0.8rem"
                    position="relative"
                >
                    <Text textDecoration="line-through" textDecorationThickness="1px">
                        {price?.toLocaleString()}
                    </Text>
                    <Text fontSize="2.4rem" fontWeight="bold">
                        {currentPrice?.toLocaleString()}
                    </Text>
                    {isShowAddButton && (
                        <IconButton
                            position="absolute"
                            top="0.4rem"
                            right="0.1rem"
                            w="4rem"
                            h="4rem"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleQuickAdd(Number(id), name, restaurantId);
                            }}
                            isLoading={loading}
                            _hover={{ opacity: 0.7 }}
                            _active={{ opacity: 0.5 }}
                            borderRadius="50%"
                            aria-label="add-btn"
                            icon={<Img src="/images/plus.svg" />}
                        />
                    )}
                </HStack>
                {promotion && (
                    <HStack mt="-4rem" color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                        <Img w="2.4rem" h="2.4rem" alt="" src="/images/frame-2729.svg" />
                        <Text>{promotion}</Text>
                    </HStack>
                )}
                {is_advanced_customizable && (
                    <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                        <Img w="2.4rem" h="2.4rem" alt="" src="/images/icons/chef.svg" />
                        <Text>{t("AVAILABLE_TO_EDIT_TASTE")}</Text>
                    </HStack>
                )}
            </VStack>
        </Flex>
    );
};

export default FoodItemSuspense;
