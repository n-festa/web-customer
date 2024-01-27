import WraperInfo from "@/components/molecules/WraperInfo";
import FoodItem from "@/components/organism/FoodItem";
import { ProductTypeList } from "@/types";
import { sideDishes } from "@/utils/data/products";
import { Wrap, WrapItem } from "@chakra-ui/react";

const SideDishes = () => {
    return (
        <WraperInfo
            title="Món ăn kèm"
            titleProps={{ fontSize: "2.4rem" }}
            isViewAll={false}
            contentProps={{ mt: "1.6rem" }}
            mt="3.2rem"
            isShowBottom
        >
            <Wrap align="center" justify={"center"} spacing="4rem" w="100%">
                {sideDishes.map((item: ProductTypeList) => (
                    <WrapItem
                        key={item.id}
                        flex={1}
                        minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                        maxW={{ base: "unset", md: "38.4rem" }}
                    >
                        <FoodItem
                            key={item.id}
                            top_label={item.top_label}
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
        </WraperInfo>
    );
};

export default SideDishes;
