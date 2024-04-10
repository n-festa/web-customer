import { SortOrderFood } from "@/types/enum";

export interface SearchFoodByNameRequest {
    keyword: string;
    ISO_language_code: string;
    lat: number;
    long: number;
    page_size: number;
    distance_offset_m: number;
    distance_limit_m: number;
    base_distance_for_grouping_m: number;
    result_type: string;
    sort_type: SortOrderFood;
    filter?: string[];
    offset: number;
}
