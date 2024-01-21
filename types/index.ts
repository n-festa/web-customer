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
    images: string[];
    discount?: string;
    currentPrice: number;
};

export type ProductTypeList = {
    id: string;
    name: string;
    price: string | number;
    discount?: string | number;
    merchart: string;
    currentPrice?: number;
    images: string[];
    cook_method: string;
    time: number;
    distance: number;
    ratings: number;
    kcal: string | number;
    carb?: number;
    protein?: number;
    fat?: number;
    ingredient: Array<IngredientType>;
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
    birthday: string;
    sex: string;
    height_m: string;
    weight_kg: string;
    physical_activity_level: string;
    current_diet: string;
    allergic_food: string;
    chronic_disease: string;
    expected_diet: string;
};
