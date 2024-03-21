import { OrderStatusLogType } from "./enum";
import { BaseNameInterface } from "./response/base";

interface Address {
    address_line?: string;
    ward?: string;
    district?: string;
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
}

interface PaymentMethod {
    id: number;
    name: string;
}

export interface OrderItem {
    item_name?: BaseNameInterface[];
    item_img?: string;
    sku_id?: number;
    qty_ordered?: number;
    price?: number;
    advanced_taste_customization_obj?: { option_id: string; value_id: string }[];
    basic_taste_customization_obj?: { no_adding_id: string }[];
    advanced_taste_customization?: string;
    basic_taste_customization?: string;
    portion_customization?: string;
    notes?: string;
    packaging_info?: {
        packaging_id: number;
        name: BaseNameInterface[];
        description: BaseNameInterface[];
        price: number;
    };
}

export interface OrderStatusLog {
    status: string;
    description: BaseNameInterface[];
    logged_at: number | string;
    milestone?: OrderStatusLogType;
}

export interface PaymentStatusHistory {
    status_id: string;
    name: BaseNameInterface[];
    note: string;
    created_at: number;
}

export interface Restaurant {
    restaurant_id: number;
    restaurant_name: BaseNameInterface[];
    restaurant_logo_img: string;
}

export interface Driver {
    driver_id: number;
    name: string;
    phone_number: string;
    vehicle: string;
    license_plates: string;
    tracking_url: string;
    profile_image: string;
}

export interface Order {
    order_id?: number;
    customer_id: number;
    restaurant_id: number;
    restaurant?: Restaurant;
    address: Address;
    driver_note?: string;
    driver?: Driver;
    order_total?: number;
    delivery_fee?: number;
    packaging_fee?: number;
    cutlery_fee?: number;
    app_fee?: number;
    coupon_value?: number;
    coupon_code?: string;
    payment_method_id?: number;
    invoice_id?: number;
    payment_method?: PaymentMethod;
    payment_status_history?: PaymentStatusHistory[];
    is_preorder?: boolean;
    expected_arrival_time?: number;
    order_items: OrderItem[];
    order_status_log?: OrderStatusLog[];
    tracking_url?: string;
}
