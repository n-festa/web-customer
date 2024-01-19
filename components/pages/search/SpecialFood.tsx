"use client";
import MenuItem from "@/components/item";
import WraperInfo from "@/components/molecules/WraperInfo";
import { ProductTypeList } from "@/types";
import products from "@/utils/data/products";
import { Wrap, WrapItem } from "@chakra-ui/react";

const SpecialFood = () => {
    const data: ProductTypeList[] = products;
    return (
        <WraperInfo
            title="Hấp dẫn"
            description="Khám phá món hấp dẫn xung quanh bạn"
            onClickViewAll={() => {
                //
            }}
            contentProps={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Wrap align="center" justify={{ base: "center", md: "space-between" }} spacing="4rem" w="100%">
                {data.map((item: ProductTypeList) => (
                    <WrapItem
                        key={item.id}
                        flex={1}
                        minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                        maxW={{ base: "unset", md: "38.4rem" }}
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
        </WraperInfo>
    );
};
export default SpecialFood;
