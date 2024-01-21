"use client";
import FoodChef from "@/components/molecules/FoodChef";
import WraperInfo from "@/components/molecules/WraperInfo";
import { restaurants } from "@/utils/data/restaurants";

import { Wrap, WrapItem } from "@chakra-ui/react";

const SpecialRestaurants = () => {
    return (
        <WraperInfo
            title="Bếp nổi bật tuần này"
            description="Khám phá những quán ăn, đầu bếp nổi bật xung quanh bạn"
            onClickViewAll={() => {
                //
            }}
            contentProps={{
                display: "flex",
                justifyContent: "center",
            }}
            mt="2.5rem"
        >
            <Wrap align="center" justify={{ base: "center", md: "space-between" }} spacing="4rem" w="100%">
                {restaurants.map((item) => (
                    <WrapItem
                        key={item.id}
                        flex={1}
                        minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                        maxW={{ base: "unset", md: "38.4rem" }}
                    >
                        <FoodChef data={item} />
                    </WrapItem>
                ))}
            </Wrap>
        </WraperInfo>
    );
};
export default SpecialRestaurants;
