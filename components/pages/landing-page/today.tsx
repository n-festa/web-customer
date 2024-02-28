"use client";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import FoodItem from "@/components/organism/FoodItem";
import useSWRAPI from "@/hooks/useApi";
import useRenderText from "@/hooks/useRenderText";
import { Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { ProductTypeList } from "types";

const Today = () => {
    const t = useTranslations("HOME.TODAY");
    const { GetHotFood } = useSWRAPI();
    const { data } = GetHotFood();
    const { renderTxt } = useRenderText();

    const processedData = useMemo(() => {
        return data?.data?.map((item) => ({
            id: item.id,
            name: renderTxt(item.name) ?? "-",
            images: item.image,
            merchart: renderTxt(item.restaurant_name),
            cook_method: renderTxt(item.main_cooking_method),
            currentPrice: item.price_after_discount,
            price: item.price,
            ingredientName: item.ingredient_brief_vie,
            kcal: item.calorie_kcal?.toLocaleString(),
            distance: item.distance_km,
            ratings: item.rating,
            promotion: item.promotion,
            cutoff_time: item.cutoff_time,
            cooking_time_s: item.cooking_time_s,
            restaurantId: item.restaurant_id,
        }));
    }, [data]);

    return (
        <Flex py="5rem" px="6.7rem" flexDir="column">
            <Text textAlign={{ base: "center", md: "unset" }} fontSize="4.8rem" fontWeight="bold">
                {t("TITLE")}
            </Text>
            <Wrap align="center" mt="4.8rem" justify={{ base: "center", md: "space-between" }} spacing="4rem">
                {processedData?.map((item: ProductTypeList, index) => (
                    <WrapItem
                        display="flex"
                        minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                        justifyContent="center"
                        key={"foodItem" + index}
                        flex={1}
                        minH="52.6rem"
                    >
                        <FoodItem
                            id={item.id}
                            top_label={item.top_label}
                            name={item.name}
                            images={item.images}
                            merchart={item.merchart}
                            cook_method={item.cook_method}
                            currentPrice={item.currentPrice}
                            price={item.price}
                            ingredientName={item.ingredientName}
                            kcal={item.kcal}
                            cooking_time_s={item.cooking_time_s}
                            distance={item.distance}
                            ratings={item.ratings}
                            promotion={item.promotion}
                            cutoff_time={item.cutoff_time}
                            restaurantId={item.restaurantId}
                            isShowAddButton={false}
                            disableAction
                        />
                    </WrapItem>
                )) ??
                    Array.from([1, 2, 3], (value, index) => (
                        <WrapItem key={`skeleton_${value}_${index}`} display="flex" flexDir="column" flex={1}>
                            <SkeletonBox isLoaded={false} />
                        </WrapItem>
                    ))}
            </Wrap>
        </Flex>
    );
};

export default React.memo(Today);
