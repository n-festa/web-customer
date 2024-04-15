import { SortOrderFood } from "@/types/enum";

export interface SearchFoodByNameRequest {
    keyword: string;
    ISO_language_code: string;
    lat?: number | string;
    long?: number | string;
    page_size: number;
    result_type: string;
    sort_type: SortOrderFood;
    filter?: string[];
    offset: number;
}
