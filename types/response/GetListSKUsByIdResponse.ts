export interface SKUsDto {
    sku_id: number;
    price: number;
    price_after_discount: number;
    unit: string;
    is_standard: boolean;
    calorie_kcal: string;
    carb_g: string;
    protein_g: string;
    fat_g: string;
    portion_customization: [
        {
            option_id: string;
            value_id: string;
        },
    ];
}

export type GetListSKUsByIdResponse = { data: SKUsDto[] };
