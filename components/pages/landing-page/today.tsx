"use client";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import useSWRAPI from "@/hooks/useApi";
import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { ProductTypeList } from "types";
import MenuItem from "../../organism/FoodItem/index";

const Today = () => {
    // const data: ProductTypeList[] = products;
    const { GetGeneralFoodRecommendation } = useSWRAPI();
    const { data } = GetGeneralFoodRecommendation();

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
            time: 122,
            distance: item.distance_km,
            ratings: item.rating,
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
                        <MenuItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            images={item.images}
                            merchart={item.merchart}
                            cook_method={item.cook_method}
                            currentPrice={item.currentPrice}
                            price={item.price}
                            ingredientName={item.ingredientName}
                            kcal={item.kcal}
                            time={item.time}
                            distance={item.distance}
                            ratings={item.ratings}
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
