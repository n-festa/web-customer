export interface TasteCustomizationObj {
    option_id: string;
    value_id: string;
}

export interface CartItem {
    item_id: number;
    sku_id?: number;
    customer_id: number;
    qty_ordered: number;
    advanced_taste_customization?: string;
    basic_taste_customization?: string;
    portion_customization?: string;
    restaurant_id?: number;
    advanced_taste_customization_obj: TasteCustomizationObj[];
    basic_taste_customization_obj: { no_adding_id: string }[];
    notes: string;
    lang?: string | number;
    created_at?: string;
}

export type Cart = {
    restaurant_id?: string | number;
    customer_id: string | number;
    cart_info?: CartItem[];
};

export type CartByCustomer = {
    [key: string]: Cart | undefined;
};
