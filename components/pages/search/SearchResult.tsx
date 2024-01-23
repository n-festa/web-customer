import FoodChef from "@/components/molecules/FoodChef";
import FoodItem from "@/components/organism/FoodItem";
import { ProductTypeList } from "@/types";
import { FilterType } from "@/types/enum";
import { SearchResult } from "@/types/interfaces";
import { RestaurantDto } from "@/types/response/base";
import { Wrap, WrapItem } from "@chakra-ui/react";
interface Props {
    result?: SearchResult;
    type?: FilterType;
}

const SearchResult = ({
    type = FilterType.Food,
    result = {
        [FilterType.Food]: [],
        [FilterType.Restaurant]: [],
    },
}: Props) => {
    const data = result?.[type] ?? [];

    return (
        <Wrap align="center" mt="4.8rem" justify={{ base: "center", md: "space-between" }} w="100%" spacing={"2rem"}>
            {data.map((el) => {
                const item = el as ProductTypeList;
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
                        ) : (
                            <FoodChef data={el as RestaurantDto} />
                        )}
                    </WrapItem>
                );
            })}
        </Wrap>
    );
};
export default SearchResult;
