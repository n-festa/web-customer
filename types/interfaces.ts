import { FilterType, SortOrder } from "@/types/enum";
import { FoodDto, RestaurantDto } from "@/types/response/base";
export interface Options {
    key: string;
    name: string;
}

export interface FilterCondition {
    type: FilterType;
    sort?: SortOrder;
    viewAllFood?: boolean;
    viewAllRestaurant?: boolean;
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
    [FilterType.Food]: FoodDto[];
    [FilterType.Restaurant]: RestaurantDto[];
}

export interface DateStep {
    date?: string;
    dayId?: number;
    dayName?: string;
    hours?: string;
    minutes?: string;
    utc_offset?: number;
}

export interface Order {
    startingPoint: AhamoveLocation;
    destination: AhamoveLocation;
    paymentMethod: string;
    totalPay: number;
    orderTime: number;
    promoCode: null | string;
    remarks: string;
    adminNote: string;
    routeOptimized: boolean;
    idleUntil: number;
    items: Item[];
    packageDetails: PackageDetail[];
    groupServiceId: null | string;
    groupRequests: null | string;
}

export interface AhamoveLocation {
    address: string;
    lat: number;
    lng: number;
    name: string;
    mobile: string;
    cod: number;
    formatted_address: string;
    short_address: string;
    address_code: null | string;
    remarks: string;
    item_value: number;
    require_pod?: boolean; // Optional property
}

export interface AhaMoveRequest {
    _id: string;
}

export interface Item {
    _id: string;
    num: number;
    name: string;
    price: number;
}

export interface PackageDetail {
    weight: number;
    length: number;
    width: number;
    height: number;
    description: string;
}
