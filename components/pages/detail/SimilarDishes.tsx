import WraperInfo from "@/components/molecules/WraperInfo";
import FoodItem from "@/components/organism/FoodItem";
import { ProductTypeList } from "@/types";
import products from "@/utils/data/products";
import { Wrap, WrapItem } from "@chakra-ui/react";

const SimilarDishes = () => {
    return (
        <WraperInfo
            title="Món ăn tương tự"
            titleProps={{ fontSize: "2.4rem" }}
            isViewAll={false}
            contentProps={{ mt: "1.6rem" }}
            mt="5.6rem"
            isShowBottom
        >
            <Wrap align="center" justify={"center"} spacing="4rem" w="100%">
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
        </WraperInfo>
    );
};

export default SimilarDishes;
