import { BaseNameInterface, FoodDto } from "@/types/response/base";

export interface Ingredient {
    item_name_vie: string;
    item_name_eng: string;
    quantity: number;
    unit: string;
}

export interface PortionCustomization {
    option_id: string;
    option_name: BaseNameInterface[];
    option_values: {
        value_id: string;
        value_nubmer: number;
        value_unit: string;
    }[];
}

export interface TasteCustomization {
    option_id: string;
    option_name: BaseNameInterface[];
    option_values: {
        value_id: string;
        value_txt: BaseNameInterface[];
        is_default: boolean;
        order: number;
    }[];
}

export interface Review {
    food_rating_id: number;
    score: number;
    remarks: string;
    isShowAuthor?: boolean;
}

export interface OtherCustomization {
    no_adding_id: string;
    description: BaseNameInterface[];
}

export interface PackageInfo {
    currency?: string;
    description?: BaseNameInterface[];
    image_url?: string;
    name?: BaseNameInterface[];
    price?: number;
    is_default?: boolean;
    packaging_id?: number;
}
export interface FoodDetailDto {
    menu_item_id: number;
    images: string[];
    name?: BaseNameInterface[];
    restaurant_name?: BaseNameInterface[];
    restaurant_id: number;
    available_quantity: number;
    units_sold: number;
    review_number: number;
    promotion?: string;
    packaging_info: PackageInfo[];
    cutoff_time?: string;
    cutoff_time_m?: number;
    ingredients: Ingredient[];
    description: BaseNameInterface[];
    portion_customization: PortionCustomization[];
    taste_customization: TasteCustomization[];
    other_customizaton: OtherCustomization[];
    reviews: Review[];
    is_advanced_customizable?: boolean;
}

export type GetSideDishesResponse = { data: FoodDto[] };

export type GetFoodDetailResponse = {
    data: FoodDetailDto;
};

export type GetCurrentAvailableFoodByRestaurantResponse = { data: FoodDto[] };

export type GetPersonalFoodRecommendationResponse = { foods: FoodDto[] };
