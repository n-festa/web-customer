"use client";
import products from "@/utils/data/products";
import { Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { ProductTypeList } from "types";
import MenuItem from "../../organism/FoodItem/index";

const Today = () => {
    const data: ProductTypeList[] = products;

    return (
        <Flex py="5rem" px="6.7rem" flexDir="column">
            <Text textAlign={{ base: "center", md: "unset" }} fontSize="4.8rem" fontWeight="bold">
                Món ngon hôm nay
            </Text>
            <Wrap align="center" mt="4.8rem" justify={{ base: "center", md: "space-between" }} spacing="4rem">
                {data.map((item: ProductTypeList) => (
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
                            ingredient={item.ingredient}
                            kcal={item.kcal}
                            time={item.time}
                            distance={item.distance}
                            ratings={item.ratings}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </Flex>
    );
};

export default Today;
