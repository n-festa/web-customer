import { BaseNameInterface } from "@/types/response/base";

export interface Categories {
    name: BaseNameInterface[];
    description: BaseNameInterface[];
    sys_category_id: number;
    type: string;
    image_url: string;
}

export type GetAllCategoriesResponse = { data: Categories[] };
