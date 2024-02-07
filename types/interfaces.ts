import { FilterType, SortOrder } from "@/types/enum";
import { FoodDto, RestaurantDto } from "@/types/response/base";
export interface Options {
    key: string;
    name: string;
}

export interface FilterCondition {
    type: FilterType;
    sort?: SortOrder;
    viewAllFood?: boolean;
    viewAllRestaurant?: boolean;
    other: {
        [FilterType.Food]: string[];
        [FilterType.Restaurant]: string[];
    };
    orderOptions: {
        [FilterType.Food]: Options[];
        [FilterType.Restaurant]: Options[];
    };
}
export interface SearchResult {
    [FilterType.Food]: FoodDto[];
    [FilterType.Restaurant]: RestaurantDto[];
}

export interface DateStep {
    date?: string;
    dayId?: number;
    dayName?: string;
    hours?: string;
    minutes?: string;
    utc_offset?: number;
}
