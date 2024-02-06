import Empty from "@/components/molecules/Empty";
import FoodChef from "@/components/molecules/FoodChef";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import FoodItem from "@/components/organism/FoodItem";
import { FilterType, FoodOtherFilterOptionsKeys, SortOrder } from "@/types/enum";
import { FilterCondition, SearchResult } from "@/types/interfaces";
import { FoodDto, RestaurantDto } from "@/types/response/base";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useMemo } from "react";
interface Props {
    result?: SearchResult;
    type?: FilterType;
    isLoading?: boolean;
    filterCondition?: FilterCondition;
}

const SearchResult = ({
    type = FilterType.Food,
    result = {
        [FilterType.Food]: [],
        [FilterType.Restaurant]: [],
    },
    filterCondition,
    isLoading,
}: Props) => {
    const displayed = useMemo(() => {
        const data = result?.[type] ?? [];
        if (data.length === 0) return [];
        const options = filterCondition?.other?.[filterCondition.type] ?? [];
        let filtered = [...data];
        if (options?.length > 0) {
            options.forEach((condition) => {
                filtered = filtered.filter((item: any) => {
                    switch (condition) {
                        case FoodOtherFilterOptionsKeys.GT4Star:
                            return item.rating && Number(item.rating) > 4;
                        case FoodOtherFilterOptionsKeys.Vegetarian:
                            return item.is_vegetarian;
                        case FoodOtherFilterOptionsKeys.LT500Kcal:
                            return item.calorie_kcal && Number(item.calorie_kcal) < 500;
                        default:
                            return true;
                    }
                });
            });
        }
        const sort = filterCondition?.sort;
        if (sort) {
            const key = type === FilterType.Food ? "price" : "min_price";
            switch (sort) {
                case SortOrder.DESC:
                    // eslint-disable-next-line unused-imports/no-unused-vars
                    filtered = filtered.sort((a: any, b: any) => {
                        const num1 = Number(a[key]);
                        const num2 = Number(b[key]);
                        return num2 - num1;
                    });
                    break;
                default:
                    filtered = filtered.sort((a: any, b: any) => {
                        const num1 = Number(a[key]);
                        const num2 = Number(b[key]);
                        return num1 - num2;
                    });
                    break;
            }
        }
        return filtered;
    }, [filterCondition?.other, filterCondition?.type, result, type, filterCondition?.sort]);

    return (
        <Wrap align="center" mt="4.8rem" justify={"center"} w="100%" spacing={"2rem"}>
            {isLoading ? (
                Array.from([1, 2, 3], (index) => (
                    <WrapItem key={`skeleton${index}`} display="flex" flexDir="column" flex={1}>
                        <SkeletonBox isLoaded={false} />
                    </WrapItem>
                ))
            ) : displayed.length < 1 ? (
                <Empty />
            ) : (
                displayed.map((el) => {
                    const item = el as FoodDto;

                    return (
                        <WrapItem
                            key={item.id}
                            flex={1}
                            minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
                            maxW={{ base: "unset", md: "38.4rem" }}
                        >
                            {type === FilterType.Food ? (
                                <FoodItem
                                    key={item.id}
                                    top_label={item.top_label}
                                    id={item.id}
                                    name={item.name?.[0].text ?? "-"}
                                    images={item.image}
                                    merchart={item.restaurant_name?.[0].text}
                                    cook_method={item.main_cooking_method?.[0]?.text}
                                    currentPrice={item.price_after_discount}
                                    price={item.price}
                                    ingredientName={item.ingredient_brief_vie}
                                    kcal={item.calorie_kcal?.toLocaleString()}
                                    distance={item.distance_km}
                                    ratings={item.rating}
                                    promotion={item.promotion}
                                    cutoff_time={item.cutoff_time}
                                    cooking_time_s={item.cooking_time_s}
                                    restaurantId={item.restaurant_id}
                                />
                            ) : (
                                <FoodChef data={el as RestaurantDto} />
                            )}
                        </WrapItem>
                    );
                })
            )}
        </Wrap>
    );
};
export default SearchResult;
