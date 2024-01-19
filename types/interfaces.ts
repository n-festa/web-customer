import { ProductTypeList } from "@/types";
import { FilterType, SortOrder } from "@/types/enum";
export interface Options {
    key: string;
    name: string;
}

export type RestaurantDtos = {
    id: string;
    name: string;
    images: string[];
    time: number;
    distance: number;
    ratings: number;
    minPrice: number;
    maxPrice: number;
    type: string;
    bestSeller: string;
};

export interface FilterCondition {
    type: FilterType;
    sort?: SortOrder;
    other: {
        [FilterType.Food]: string[];
        [FilterType.Restaurant]: string[];
    };
    orderOptions: {
        [FilterType.Food]: Options[];
        [FilterType.Restaurant]: Options[];
    };
}
export interface SearchResult {
    [FilterType.Food]: ProductTypeList[];
    [FilterType.Restaurant]: RestaurantDtos[];
}
