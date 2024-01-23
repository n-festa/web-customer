import { FoodDto, RestaurantDto } from "@/types/response/base";

export type SearchFoodAndRestaurantByCategoryIdResponse = {
    data: {
        byFoods: FoodDto[];
        byRestaurants: RestaurantDto[];
    };
};
