import useParams from "@/hooks/useParams";
import apiServices from "@/services/sevices";
import { RootState } from "@/store";
import { FetchMode, FilterType, SearchFoodType } from "@/types/enum";
import { FilterCondition, SearchResult } from "@/types/interfaces";
import { FoodOtherFilterOptions, RestaurantOtherFilterOptions } from "@/utils/constants";
import { isNullOrEmpty } from "@/utils/functions";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface DiscoveryState {
    keySearch: string;
    filterCondition: FilterCondition;
    searchResult: SearchResult;
}

type DiscoveryKeyState = "keySearch" | "isShowFilterBox" | "filterCondition" | "searchResult";
export type FilterOptionKey = "type" | "sort" | "other";

const useSearchResult = () => {
    const t = useTranslations();
    const { params } = useParams<{
        searchKey?: string;
        categoryId?: number;
        name?: string;
        foodId?: string;
        detailType?: SearchFoodType;
    }>({});
    useParams();
    const profile = useSelector((state: RootState) => state.userInfo.userInfo);

    const [state, setState] = useState<DiscoveryState>({
        keySearch: params.searchKey ?? "",
        filterCondition: {
            type: FilterType.Food,
            orderOptions: {
                [FilterType.Food]: FoodOtherFilterOptions(t),
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
    const [isLoading, setLoading] = useState(true);

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
                filterCondition: {
                    ...prevState.filterCondition,
                    type: FilterType.Food,
                },
                searchResult: {
                    [FilterType.Food]: [],
                    [FilterType.Restaurant]: [],
                },
            }));
            searchFoodByName();
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

    const searchFoodByName = async () => {
        setLoading(true);
        const payload = {
            keyword: params.searchKey ?? "",
            ISO_language_code: "vie",
            lat: profile?.latAddress ?? 10.799963,
            long: profile?.longAddress ?? 106.707171,
            record_offset: 0,
            page_size: 40,
            distance_offset_m: 0,
            distance_limit_m: 10000,
            base_distance_for_grouping_m: 200,
        };
        apiServices
            .searchFoodByName(payload)
            .then(({ data }) => {
                if (data) {
                    setState((prevState) => ({
                        ...prevState,
                        searchResult: {
                            [FilterType.Food]: data.byFoods ?? [],
                            [FilterType.Restaurant]: data.byRestaurants ?? [],
                        },
                    }));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const searchFoodAndRestaurantByCategory = async () => {
        setLoading(true);
        const payload = {
            category_id: Number(params.categoryId),
            lat: profile?.latAddress ?? 10.799963,
            long: profile?.longAddress ?? 106.707171,
        };
        apiServices
            .searchFoodAndRestaurantByCategoryId(payload)
            .then(({ data }) => {
                if (data) {
                    setState((prevState) => ({
                        ...prevState,
                        searchResult: {
                            [FilterType.Food]: data.byFoods ?? [],
                            [FilterType.Restaurant]: data.byRestaurants ?? [],
                        },
                    }));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getAllFood = async () => {
        setLoading(true);
        apiServices
            .getGeneralFoodRecommendation({
                fetch_mode: FetchMode.Full,
                lat: profile?.latAddress ?? 10.799963,
                long: profile?.longAddress ?? 106.707171,
            })
            .then(({ data }) => {
                if (data) {
                    setState((prevState) => ({
                        ...prevState,
                        searchResult: {
                            [FilterType.Food]: data ?? [],
                            [FilterType.Restaurant]: [],
                        },
                    }));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getAllRestaurant = async () => {
        setLoading(true);
        apiServices
            .getGeneralRestaurantRecommendation({
                fetch_mode: FetchMode.Full,
                lat: profile?.latAddress ?? 10.799963,
                long: profile?.longAddress ?? 106.707171,
            })
            .then(({ data }) => {
                if (data) {
                    setState((prevState) => ({
                        ...prevState,
                        searchResult: {
                            [FilterType.Food]: [],
                            [FilterType.Restaurant]: data ?? [],
                        },
                    }));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getSideDishByMenuItemId = async (id: number) => {
        setLoading(true);
        apiServices
            .getSideDishByMenuItemId(id, {
                fetch_mode: FetchMode.Full,
            })
            .then(({ data }) => {
                if (data) {
                    setState((prevState) => ({
                        ...prevState,
                        searchResult: {
                            [FilterType.Food]: data ?? [],
                            [FilterType.Restaurant]: [],
                        },
                    }));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getCurrentAvailableFoodByRestaurant = async (id: number) => {
        setLoading(true);
        apiServices
            .getCurrentAvailableFoodByRestaurant(id, {
                fetch_mode: FetchMode.Full,
            })
            .then(({ data }) => {
                if (data) {
                    setState((prevState) => ({
                        ...prevState,
                        searchResult: {
                            [FilterType.Food]: data ?? [],
                            [FilterType.Restaurant]: [],
                        },
                    }));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getPersonalFoodRecommendation = async (id: number) => {
        setLoading(true);
        apiServices
            .getPersonalFoodRecommendation(id, {
                fetch_mode: FetchMode.Full,
            })
            .then(({ data }) => {
                if (data) {
                    setState((prevState) => ({
                        ...prevState,
                        searchResult: {
                            [FilterType.Food]: data ?? [],
                            [FilterType.Restaurant]: [],
                        },
                    }));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const searchByFood = (id: number, type: SearchFoodType) => {
        switch (type) {
            case SearchFoodType.SideDish:
                getSideDishByMenuItemId(id);
                return;
            case SearchFoodType.SameRestaurant:
                getCurrentAvailableFoodByRestaurant(id);
                return;
            case SearchFoodType.SimilarDish:
                getPersonalFoodRecommendation(id);
                return;
            case SearchFoodType.AllFood:
                setState((prevState) => ({
                    ...prevState,
                    keySearch: params.name ?? "Tất cả",

                    filterCondition: {
                        ...prevState.filterCondition,
                        type: FilterType.Food,
                    },
                }));
                getAllFood();
                return;
            case SearchFoodType.AllRestaurant:
                setState((prevState) => ({
                    ...prevState,
                    keySearch: params.name ?? "Tất cả",
                    filterCondition: {
                        ...prevState.filterCondition,
                        type: FilterType.Restaurant,
                    },
                }));
                getAllRestaurant();
                return;
        }
    };

    useEffect(() => {
        // search by food name
        if (params.searchKey) {
            setState((prevState) => ({
                ...prevState,
                keySearch: params.searchKey ?? "",
            }));
            searchFoodByName();
            return;
        }
        // search food and restaurant by Category
        if (params.categoryId) {
            setState((prevState) => ({
                ...prevState,
                keySearch: params.name ?? "Tất cả",
                filterCondition: {
                    ...prevState.filterCondition,
                    categoryId: params.categoryId,
                },
            }));
            searchFoodAndRestaurantByCategory();
            return;
        }

        if (isNullOrEmpty(params.detailType)) return;

        const foodId = Number(params.foodId);
        const type = params.detailType as SearchFoodType;
        setState((prevState) => ({
            ...prevState,
            keySearch: params.name ?? "Tất cả",
            filterCondition: {
                ...prevState.filterCondition,
                detailType: type,
            },
        }));
        searchByFood(foodId, type);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, profile]);

    return {
        keySearch: state.keySearch,
        searchResult: state.searchResult,
        filterCondition: state.filterCondition,
        isLoading: isLoading,
        onSearch,
        onChangeValue,
        onChangeFilterOptions,
    };
};

export { useSearchResult };
