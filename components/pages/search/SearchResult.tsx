import FoodChef from "@/components/molecules/FoodChef";
import MenuItem from "@/components/organism/FoodItem";
import { ProductTypeList } from "@/types";
import { FilterType } from "@/types/enum";
import { RestaurantDtos, SearchResult } from "@/types/interfaces";
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
                        ) : (
                            <FoodChef data={el as RestaurantDtos} />
                        )}
                    </WrapItem>
                );
            })}
        </Wrap>
    );
};
export default SearchResult;
