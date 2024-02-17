"use client";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import FoodItem from "@/components/organism/FoodItem";
import useSWRAPI from "@/hooks/useApi";
import { Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { ProductTypeList } from "types";

const Today = () => {
    const { GetHotFood } = useSWRAPI();
    const { data } = GetHotFood();

    const processedData = useMemo(() => {
        return data?.data?.map((item) => ({
            id: item.id,
            name: item.name?.[0].text ?? "-",
            images: item.image,
            merchart: item.restaurant_name?.[0].text,
            cook_method: item.main_cooking_method?.[0]?.text,
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
                Món ngon hôm nay
            </Text>
            <Wrap align="center" mt="4.8rem" justify={{ base: "center", md: "space-between" }} spacing="4rem">
                {processedData?.map((item: ProductTypeList) => (
                    <WrapItem
                        display="flex"
                        minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                        justifyContent="center"
                        key={item.id}
                        flex={1}
                        minH="52.6rem"
                    >
                        <FoodItem
                            key={item.id}
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
                        />
                    </WrapItem>
                )) ??
                    Array.from([1, 2, 3], (index) => (
                        <WrapItem key={`skeleton${index}`} display="flex" flexDir="column" flex={1}>
                            <SkeletonBox isLoaded={false} />
                        </WrapItem>
                    ))}
            </Wrap>
        </Flex>
    );
};

export default React.memo(Today);
