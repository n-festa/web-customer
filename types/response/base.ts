export interface BaseNameInterface {
    ISO_language_code: string;
    text: string;
}

export interface CookingSchedule {
    dayId: number;
    dayName: string;
    from: string;
    to: string;
    isAvailable: boolean;
}

export interface GeoCode {
    lng: string | number;
    lat: string | number;
}

export interface FoodDto {
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

export interface RestaurantDto {
    id: number;
    intro_video: string;
    logo_img: string;
    name?: BaseNameInterface[];
    rating?: string;
    distance_km?: number;
    delivery_time_s?: number;
    specialty: BaseNameInterface[];
    top_food?: string;
    promotion?: string;
    cutoff_time: string[];
    having_vegeterian_food?: boolean;
    max_price: number;
    min_price: number;
    unit: string;
}
