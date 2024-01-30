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
    }[];
}

export interface Review {
    food_rating_id: number;
    score: number;
    remarks: string;
}

export interface OtherCustomization {
    no_adding_id: string;
    description: BaseNameInterface[];
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
    packaging_info: BaseNameInterface[];
    cutoff_time?: string;
    ingredients: Ingredient[];
    description: BaseNameInterface[];
    portion_customization: PortionCustomization[];
    taste_customization: TasteCustomization[];
    other_customizaton: OtherCustomization[];
    reviews: Review[];
}

export type GetSideDishesResponse = { data: FoodDto[] };

export type GetFoodDetailResponse = {
    data: FoodDetailDto;
};
