import { BaseNameInterface } from "./response/base";

export interface TasteCustomizationObj {
    option_id: string;
    value_id: string;
}

export interface PortionCustomizationObj {
    option_id: string;
    value_id: string;
}

export interface CartItem {
    item_id?: number;
    sku_id?: number;
    customer_id: number;
    qty_ordered: number;
    advanced_taste_customization?: string;
    basic_taste_customization?: string;
    portion_customization?: string;
    restaurant_id?: number;
    menu_item_id?: number;
    advanced_taste_customization_obj?: string | TasteCustomizationObj[];
    advanced_portion_customization_obj?: string | PortionCustomizationObj[];
    basic_taste_customization_obj?: string | { no_adding_id: string }[];
    notes: string;
    lang?: string | number;
    created_at?: string;
    item_img?: string;
    price?: number;
    price_after_discount?: number;
    unit?: string;
    item_name?: BaseNameInterface[];
    packaging_id?: number;
    quantity_available?: number;
    packaging_info?: {
        packaging_id?: number;
        name?: BaseNameInterface[];
        price?: number;
    };
    isUpdateAll?: boolean;
}

export type Cart = {
    restaurant_id?: string | number;
    customer_id?: string | number;
    cart_info?: CartItem[];
    cartUpdate?: CartItem;
    restaurant_logo_img?: string;
    restaurant_name?: BaseNameInterface[];
};
