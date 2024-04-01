import { OrderItem, OrderStatusLog } from "@/types/order";
import { BaseNameInterface, RestaurantInfo, TimeRange } from "@/types/response/base";

export interface HistoricalOrderByRestaurant {
    order_id: number;
    order_status_log: OrderStatusLog[];
    restaurant_info: RestaurantInfo;
    order_items: OrderItem[];
    order_total: number;
    order_score: number;
    payment_method: Payment;
}

export interface Payment {
    id: number;
    name: string;
}

export interface HistoricalOrderByFood {
    order_id: number;
    order_status_log: OrderStatusLog[];
    restaurant_info: RestaurantInfo;
    name: BaseNameInterface[];
    image: string;
    main_cooking_method: BaseNameInterface[];
    ingredient_brief_vie?: string;
    ingredient_brief_eng?: string;
    sku_id: number;
    qty_ordered: number;
    advanced_taste_customization?: string;
    basic_taste_customization?: string;
    portion_customization?: string;
    advanced_taste_customization_obj: any[];
    basic_taste_customization_obj: any[];
    notes: string;
    packaging_id: number;
    price: number;
    calorie_kcal: string;
    score: number;
}

export type GetHistoryOrderByFoodResponse = {
    hitorical_oders: HistoricalOrderByFood[];
    offset: number;
    search_keyword: string;
    sort_type: string;
    filtered_order_status: string[];
    time_range: TimeRange;
    total_count: number;
};

export type GetHistoryOrderByRestaurantResponse = {
    hitorical_oders: HistoricalOrderByRestaurant[];
    offset: number;
    search_keyword: string;
    sort_type: string;
    filtered_order_status: string[];
    time_range: TimeRange;
    total_count: number;
};
