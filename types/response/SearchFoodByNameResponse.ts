import { FoodDto, RestaurantDto } from "@/types/response/base";

export type SearchFoodByNameResponse = {
    data: {
        byFoods: FoodDto[];
        byRestaurants: RestaurantDto[];
    };
};
