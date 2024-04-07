import Empty from "@/components/molecules/Empty";
import FoodChef from "@/components/molecules/FoodChef";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import FoodItem from "@/components/organism/FoodItem";
import useRenderText from "@/hooks/useRenderText";
import { FilterType } from "@/types/enum";
import { FilterCondition, SearchResult as SearchResultInterface } from "@/types/interfaces";
import { FoodDto, RestaurantDto } from "@/types/response/base";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useMemo } from "react";
interface Props {
    result?: SearchResultInterface;
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
    isLoading,
}: Props) => {
    const { renderTxt } = useRenderText();
    const displayed = useMemo(() => {
        return result?.[type] ?? [];
    }, [result, type]);

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
                                    name={renderTxt(item.name) ?? "-"}
                                    images={item.image}
                                    merchart={renderTxt(item.restaurant_name)}
                                    cook_method={renderTxt(item.main_cooking_method)}
                                    currentPrice={item.price_after_discount}
                                    price={item.price}
                                    ingredientName={renderTxt([
                                        {
                                            ISO_language_code: "eng",
                                            text: item?.ingredient_brief_eng,
                                        },
                                        {
                                            ISO_language_code: "vie",
                                            text: item?.ingredient_brief_vie,
                                        },
                                    ])}
                                    kcal={item.calorie_kcal?.toLocaleString()}
                                    distance={item.distance_km}
                                    ratings={item.rating}
                                    promotion={item.promotion}
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
