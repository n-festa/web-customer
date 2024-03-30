import { OrderItem, OrderStatusLog } from "@/types/order";
import { RestaurantInfo } from "@/types/response/base";

export interface OnGoingOrder {
    order_id: number;
    order_status_log: OrderStatusLog[];
    restaurant_info: RestaurantInfo;
    order_items: OrderItem[];
    order_total: number;
}

export type OnGoingOrderResponse = {
    ongoing_oders: OnGoingOrder[];
};
