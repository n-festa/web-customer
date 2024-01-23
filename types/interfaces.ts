import { ProductTypeList } from "@/types";
import { FilterType, SortOrder } from "@/types/enum";
import { RestaurantDto } from "@/types/response/base";
export interface Options {
    key: string;
    name: string;
}

export interface FilterCondition {
    type: FilterType;
    sort?: SortOrder;
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
    [FilterType.Food]: ProductTypeList[];
    [FilterType.Restaurant]: RestaurantDto[];
}

export interface FoodDto {
    id: number;
    image: string;
    top_label?: string;
    bottom_label?: string;
    name: {
        ISO_language_code: string;
        text: string;
    }[];
    restaurant_name: {
        ISO_language_code: string;
        text: string;
    };
    restaurant_id?: number;
    calorie_kcal?: string;
    rating?: number;
    distance_km: number;
    delivery_time_s: number;
    main_cooking_method: {
        ISO_language_code: string;
        text: string;
    };
    ingredient_brief_vie?: string;
    ingredient_brief_eng?: string;
    price: number;
    price_after_discount?: number;
    promotion: string;
    cutoff_time: string;
    preparing_time_s: number;
    cooking_time_s: number;
    quantity_available: number;
    is_vegetarian: boolean;
    units_sold: number;
}
