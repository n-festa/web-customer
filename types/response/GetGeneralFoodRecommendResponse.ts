import { BaseNameInterface, CookingSchedule } from "./base";

export interface GetGeneralFoodRecommendInterface {
    id: number;
    image?: string;
    top_label?: string;
    bottom_label?: string;
    name?: BaseNameInterface[];
    restaurant_name?: BaseNameInterface[];
    restaurant_id: number;
    calorie_kcal?: string;
    rating?: number;
    distance_km?: number;
    delivery_time_s?: number;
    main_cooking_method?: BaseNameInterface[];
    ingredient_brief_vie?: string;
    ingredient_brief_eng?: string;
    price?: number;
    price_after_discount?: number;
    promotion?: string;
    cutoff_time?: string;
    preparing_time_s?: number;
    cooking_time_s?: number;
    quantity_available?: number;
    is_vegetarian?: false;
    cooking_schedule?: CookingSchedule[];
    units_sold?: number;
}

export type GetGeneralFoodRecommendResponse = { data: GetGeneralFoodRecommendInterface[] };
