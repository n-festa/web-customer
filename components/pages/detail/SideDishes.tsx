import Empty from "@/components/molecules/Empty";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import WraperInfo from "@/components/molecules/WraperInfo";
import FoodItem from "@/components/organism/FoodItem";
import useSWRAPI from "@/hooks/useApi";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const SideDishes = () => {
    const t = useTranslations("PRODUCT_DETAIL");
    const { product } = useParams();
    const { GetSideDishByMenuItemId } = useSWRAPI();
    const { data, isLoading } = GetSideDishByMenuItemId(Number(product));

    return (
        <WraperInfo
            title={t("SIDE_DISH")}
            titleProps={{ fontSize: "2.4rem" }}
            isViewAll={false}
            contentProps={{ mt: "1.6rem" }}
            mt="3.2rem"
            isShowBottom
        >
            <Wrap align="center" justify={"center"} spacing="4rem" w="100%">
                {isLoading ? (
                    Array.from([1, 2, 3], (index) => (
                        <WrapItem key={`skeleton${index}`} display="flex" flexDir="column" flex={1}>
                            <SkeletonBox isLoaded={false} />
                        </WrapItem>
                    ))
                ) : data && data?.data.length < 1 ? (
                    <Empty />
                ) : (
                    data?.data?.map((item) => {
                        return (
                            <WrapItem
                                key={item.id}
                                flex={1}
                                minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                                maxW={{ base: "unset", md: "38.4rem" }}
                                minH="52.6rem"
                            >
                                <FoodItem
                                    key={item.id}
                                    top_label={item.top_label}
                                    id={item.id}
                                    name={item.name?.[0]?.text}
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
                                    promotion={item.promotion}
                                    cutoff_time={item.cutoff_time}
                                    isShowRating={false}
                                    isShowDistance={false}
                                    isShowTime={false}
                                    isShowMerchart={false}
                                    isShowUnitSold={true}
                                    isShowQuantityAvailable={true}
                                />
                            </WrapItem>
                        );
                    })
                )}
            </Wrap>
        </WraperInfo>
    );
};

export default SideDishes;
