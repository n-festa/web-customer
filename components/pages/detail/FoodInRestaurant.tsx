import WraperInfo from "@/components/molecules/WraperInfo";
import FoodItem from "@/components/organism/FoodItem";
import products from "@/utils/data/products";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const FoodInRestaurant = () => {
    const t = useTranslations("PRODUCT_DETAIL");
    return (
        <WraperInfo
            title={t("SAME_RESTAURANT")}
            titleProps={{ fontSize: "2.4rem" }}
            isViewAll={false}
            contentProps={{ mt: "1.6rem" }}
            mt="5.6rem"
            isShowBottom
        >
            <Wrap align="center" justify={"center"} spacing="4rem" w="100%">
                {products.map((item) => (
                    <WrapItem
                        key={item.id}
                        flex={1}
                        minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                        maxW={{ base: "unset", md: "38.4rem" }}
                    >
                        <FoodItem
                            key={item.id}
                            id={item.id}
                            name={item.name?.[0].text}
                            images={item.image}
                            merchart={item.restaurant_name?.[0].text}
                            cook_method={item.main_cooking_method?.[0].text}
                            currentPrice={item.price_after_discount}
                            price={item.price}
                            ingredientName={item.ingredient_brief_vie}
                            kcal={item.calorie_kcal}
                            cooking_time_s={item.cooking_time_s}
                            distance={item.distance_km}
                            ratings={item.rating}
                            units_sold={item.units_sold}
                            quantity_available={item.quantity_available}
                            isShowRating={false}
                            isShowDistance={false}
                            isShowTime={false}
                            isShowMerchart={false}
                            cutoff_time={item.cutoff_time}
                            promotion={item.promotion}
                            isShowUnitSold={true}
                            isShowQuantityAvailable={true}
                        />
                    </WrapItem>
                ))}
            </Wrap>
        </WraperInfo>
    );
};

export default FoodInRestaurant;
