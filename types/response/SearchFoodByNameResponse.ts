import { FoodDto, RestaurantDto } from "@/types/response/base";

export type SearchFoodByNameResponse = {
    results: FoodDto[] | RestaurantDto[];
};
