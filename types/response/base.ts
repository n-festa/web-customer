import { MediaType } from "@/types/enum";
import { Review } from "@/types/response/FoodResponse";

export interface BaseNameInterface {
    ISO_language_code: string;
    text: string;
}

export interface CookingSchedule {
    day_id: number;
    day_name: string;
    from: string;
    to: string;
    is_available: boolean;
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
    cutoff_time_m?: number;
    is_advanced_customizable?: boolean;
    preparing_time_s?: number;
    cooking_time_s?: number;
    quantity_available?: number;
    is_vegetarian?: boolean;
    cooking_schedule?: string; // CookingSchedule[];
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
    cutoff_time_m?: number;
    having_vegeterian_food?: boolean;
    max_price: number;
    min_price: number;
    unit: string;
}

export interface Media {
    type: MediaType;
    url: string;
}

export interface RestaurantDetailDto {
    restaurant_id: number;
    medias: Media[];

    address: {
        address_line: string;
        city: string;
        district: string;
        ward: string;
        country: string;
        latitude: string;
        longitude: string;
    };
    logo_img: string;
    rating: string;
    top_food?: string;
    promotion?: string;
    reviews: Review[];
    name: BaseNameInterface[];
    specialty: BaseNameInterface[];
    introduction: BaseNameInterface[];
    review_total_count: number;
    cutoff_time: string[];
    cutoff_time_m?: number;
    having_vegeterian_food: boolean;
    unit: string;
    menu: FoodDto[];
}
