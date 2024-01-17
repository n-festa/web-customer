"use client";
import { Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import useSwr from "swr";
import { ProductTypeList } from "types";
import MenuItem from "../../components/item/index";
import { fetcher } from "../../utils/fetcher";

const Today = () => {
    const { data } = useSwr("/api/products", fetcher);

    if (!data) return <div>Loading</div>;

    return (
        <Flex py="5rem" px="6.7rem" flexDir="column">
            <Text fontSize="4.8rem" fontWeight="bold">
                Món ngon hôm nay
            </Text>
            <Wrap align="center" justify="space-between" spacing="4rem">
                {data.map((item: ProductTypeList) => (
                    <WrapItem flex={1} minW="38.4rem" maxW="38.4rem" minH="52.6rem">
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
