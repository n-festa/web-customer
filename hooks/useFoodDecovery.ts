import { FilterType } from "@/types/enum";
import { FilterCondition, SearchResult } from "@/types/interfaces";
import { FoodOtherFilterOptions, RestaurantOtherFilterOptions } from "@/utils/constants";
import { foods } from "@/utils/data/products";
import { restaurantResult } from "@/utils/data/restaurants";
import { useState } from "react";

interface DiscoveryState {
    keySearch: string;
    isShowFilterBox: boolean;
    filterCondition: FilterCondition;
    searchResult: SearchResult;
}

type DiscoveryKeyState = "keySearch" | "isShowFilterBox" | "filterCondition" | "searchResult";
export type FilterOptionKey = "type" | "sort" | "other";

const useFoodDiscovery = () => {
    const [state, setState] = useState<DiscoveryState>({
        keySearch: "",
        isShowFilterBox: false,
        filterCondition: {
            type: FilterType.Food,
            orderOptions: {
                [FilterType.Food]: FoodOtherFilterOptions,
                [FilterType.Restaurant]: RestaurantOtherFilterOptions,
            },
            other: {
                [FilterType.Food]: [],
                [FilterType.Restaurant]: [],
            },
        },
        searchResult: {
            [FilterType.Food]: [],
            [FilterType.Restaurant]: [],
        },
    });

    const onChangeValue = <T>(key: DiscoveryKeyState, value: T) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const onSearch = () => {
        if (state.keySearch != "") {
            setState((prevState) => ({
                ...prevState,
                isShowFilterBox: true,
                searchResult: {
                    [FilterType.Food]: foods,
                    [FilterType.Restaurant]: restaurantResult,
                },
            }));
            return;
        }
        setState((prevState) => ({
            ...prevState,
            isShowFilterBox: false,
        }));
    };

    const onChangeFilterOptions = <T>(key: FilterOptionKey, value: T) => {
        setState((prevState) => ({
            ...prevState,
            filterCondition: {
                ...prevState.filterCondition,
                [key]: value,
            },
        }));
    };

    return {
        keySearch: state.keySearch,
        searchResult: state.searchResult,
        isShowFilterBox: state.isShowFilterBox,
        filterCondition: state.filterCondition,

        onSearch,
        onChangeValue,
        onChangeFilterOptions,
    };
};

export { useFoodDiscovery };
