import { Compound } from "./response/SearchPlaceResponse";

export type IngredientType = {
    name?: number | string;
    quantity?: string | number;
    unit?: string | number;
};

export type ProductType = {
    id: string;
    name: string;
    thumb: string;
    price: string;
    count: number;
    color: string;
    size: string;
    images: string;
    discount?: string;
    currentPrice: number;
};

export type ProductTypeList = {
    id: string | number;
    name?: string;
    price?: string | number;
    top_label?: string;
    discount?: string | number;
    merchart?: string;
    currentPrice?: number;
    images?: string;
    cook_method?: string;
    time?: number;
    distance?: number;
    ratings?: number;
    kcal?: string | number;
    carb?: number;
    protein?: number;
    fat?: number;
    ingredient?: Array<IngredientType>;
    ingredientName?: string;
    quantity_available?: number;
    units_sold?: number;
    promotion?: string;
    cutoff_time?: string;
    restaurantId?: string | number;
    cooking_time_s?: number;
};
export type ProductStoreType = {
    id: string;
    name: string;
    thumb: string;
    price: number;
    count: number;
    color: string;
    size: string;
};

export type GtagEventType = {
    action: string;
    category: string;
    label: string;
    value: string;
};

export type UserType = {
    name: string;
    email: string;
    birthday: string | Date;
    sex: string;
    height_m: number | string;
    weight_kg: number | string;
    physical_activity_level: string;
    current_diet?: string;
    allergic_food?: string;
    chronic_disease: string;
    expected_diet?: string;
    expected_diet_diff?: string;
};

export type UserAuth = {
    userType: string;
    userId: number;
    userName: string;
    permissions: string;
};

export interface ProfileImage {
    media_id: number;
    type: string;
    name: string;
    description: null | string;
    url: string;
    restaurant_id: null | number;
    menu_item_id: null | number;
    packaging_id: null | number;
    driver_rating_id: null | number;
    food_rating_id: null | number;
    created_at: string;
}

export interface HealthInfo {
    height_m: number;
    weight_kg: number;
    physical_activity_level: string;
    current_diet: string;
    allergic_food: string;
    chronic_disease: string;
    expected_diet: string;
    bmi: number;
    recommended_dietary_allowance_kcal: number;
    health_info_id: number;
    created_at: string;
}

export interface Customer {
    customer_id?: number;
    phone_number?: string;
    name?: string;
    email?: string;
    birthday?: string;
    sex?: string;
    is_active?: number;
    created_at?: string;
    profile_image?: ProfileImage;
    health_info?: HealthInfo;
    latAddress?: number;
    longAddress?: number;
    address?: string;
    addressCompound?: Compound;
}
