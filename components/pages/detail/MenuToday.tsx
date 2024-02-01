import FoodItem from "@/components/organism/FoodItem";
import { ProductTypeList } from "@/types";
import products from "@/utils/data/products";
import { Box, Flex, HStack, Select, Switch, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { rest } from "lodash";

const MenuToday = () => {
    return (
        <Flex flexDirection={"column"} alignItems={"flex-start"} w="100%" mt="3.2rem" {...rest}>
            <HStack spacing={"0.8rem"}>
                <Text variant={"header"} fontSize={"2rem"} fontWeight={600} lineHeight={"2rem"}>
                    Thực đơn
                </Text>
                <Select
                    placeholder="Săp xếp"
                    w="11.6rem"
                    variant={"filter"}
                    value={"1"}
                    onChange={(_) => {
                        //
                    }}
                >
                    <option value={"1"}>Hôm nay</option>
                    <option value={"2"}>Ngày mai</option>
                </Select>
                <Switch variant={"green"} size="lg" display={"flex"} flexDirection={"row-reverse"} isChecked={false}>
                    <Text variant={"toggle"} px="0.8rem" textTransform={"capitalize"}>
                        Món chay
                    </Text>
                </Switch>
            </HStack>

            <Box w="100%" mt="2.4rem" flex={1}>
                <Wrap align="center" justify={"space-between"} spacing={{ base: "4rem", "2xl": "1rem" }} w="100%">
                    {products.map((item: ProductTypeList) => (
                        <WrapItem
                            key={item.id}
                            flex={1}
                            minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                            maxW={{ base: "unset", md: "38.4rem" }}
                        >
                            <FoodItem
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
                                cooking_time_s={item.cooking_time_s}
                                distance={item.distance}
                                ratings={item.ratings}
                                units_sold={item.units_sold}
                                quantity_available={item.quantity_available}
                                isShowRating={false}
                                isShowDistance={false}
                                isShowTime={false}
                                isShowMerchart={false}
                                isShowUnitSold={true}
                                isShowQuantityAvailable={true}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
            </Box>
        </Flex>
    );
};

export default MenuToday;
