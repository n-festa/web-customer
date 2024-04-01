/* eslint-disable react-hooks/exhaustive-deps */
import apiServices from "@/services/sevices";
import { FilterOrderStatuType, FilterType, SortOrderHistory } from "@/types/enum";
import {
    GetHistoryOrderByFoodResponse,
    GetHistoryOrderByRestaurantResponse,
} from "@/types/response/GetHistoryOrderResponse";
import { OnGoingOrder } from "@/types/response/OnGoingOrderResponse";
import { loadState } from "@/utils/localstorage";
import { subDays } from "date-fns/subDays";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

export interface HistoryFilterCondition {
    type: FilterType;
    [FilterType.Food]: {
        searchKey?: string;
        sortType: SortOrderHistory;
        orderStatus: FilterOrderStatuType;
        timeRange?: DateRange;
    };
    [FilterType.Restaurant]: {
        searchKey?: string;
        sortType: SortOrderHistory;
        orderStatus: FilterOrderStatuType;
        timeRange?: DateRange;
    };
}

interface OrderHistoryState {
    onGoingOrder: OnGoingOrder[];
    isLoading: boolean;
    tab: number;
    histories: {
        [FilterType.Food]?: GetHistoryOrderByFoodResponse;
        [FilterType.Restaurant]?: GetHistoryOrderByRestaurantResponse;
    };
    condition: HistoryFilterCondition;
}

const useOrderHistory = () => {
    const [state, setState] = useState<OrderHistoryState>({
        tab: 0,
        onGoingOrder: [],
        histories: {},
        isLoading: true,
        condition: {
            type: FilterType.Restaurant,
            [FilterType.Food]: {
                sortType: SortOrderHistory.DATE_ASC,
                orderStatus: FilterOrderStatuType.ALL,
            },
            [FilterType.Restaurant]: {
                sortType: SortOrderHistory.DATE_ASC,

                orderStatus: FilterOrderStatuType.ALL,
            },
        },
    });
    const [isMouted, setMounted] = useState(false);
    const [enableFilter, setEnableFilter] = useState(false);
    const { userId } = loadState("infoSign");
    const defaultRange = {
        from: subDays(new Date(), 30),
        to: new Date(),
    };

    const getOnGoingOrder = async () => {
        try {
            const res = await apiServices.onGoingOrder();

            const result = res?.ongoing_oders ?? [];
            setState((prevState) => ({
                ...prevState,
                onGoingOrder: result,
            }));
        } catch (_) {
            setState((prevState) => ({
                ...prevState,
                onGoingOrder: [],
            }));
        }
    };

    const getFilterDateTime = (range?: DateRange) => {
        if (range?.from && range.to) {
            return {
                from: range.from.getTime(),
                to: range.to.getTime(),
            };
        }
        return {
            from: subDays(new Date(), 30).getTime(),
            to: new Date().getTime(),
        };
    };

    const getHistoryOrderByFood = async () => {
        const filterFood = state.condition[FilterType.Food];

        const request = {
            customer_id: userId ?? -1,
            offset: 0,
            page_size: 50,
            search_keyword: filterFood.searchKey,
            sort_type: filterFood.sortType,
            filtered_order_status: filterFood.orderStatus != FilterOrderStatuType.ALL ? [filterFood.orderStatus] : [],
            time_range: getFilterDateTime(filterFood.timeRange),
        };

        try {
            const res = await apiServices.getHistoryOrderByFood(request);

            if (res) {
                setState((prevState) => ({
                    ...prevState,
                    histories: {
                        ...prevState.histories,
                        [FilterType.Food]: res,
                    },
                }));
            }
        } catch (_) {
            setState((prevState) => ({
                ...prevState,
                histories: {
                    ...prevState.histories,
                    [FilterType.Food]: undefined,
                },
            }));
        }
    };

    const getHistoryOrderByRestautant = async () => {
        const filterRestaurant = state.condition[FilterType.Restaurant];

        const requestRestaurant = {
            customer_id: userId ?? -1,
            offset: 0,
            page_size: 50,
            search_keyword: filterRestaurant.searchKey,
            sort_type: filterRestaurant.sortType,
            filtered_order_status:
                filterRestaurant.orderStatus != FilterOrderStatuType.ALL ? [filterRestaurant.orderStatus] : [], // OPTIONAL - COMPLETED | FAILED | CANCELLED
            time_range: getFilterDateTime(filterRestaurant.timeRange),
        };
        try {
            const res = await apiServices.getHistoryOrderByRestaurant(requestRestaurant);

            if (res) {
                setState((prevState) => ({
                    ...prevState,
                    histories: {
                        ...prevState.histories,
                        [FilterType.Restaurant]: res,
                    },
                }));
            }
        } catch (_) {
            setState((prevState) => ({
                ...prevState,
                histories: {
                    ...prevState.histories,
                    [FilterType.Restaurant]: undefined,
                },
            }));
        }
    };

    const setLoading = (status: boolean) => {
        setState((prevState) => ({
            ...prevState,
            isLoading: status,
        }));
    };

    useEffect(() => {
        if (!isMouted) return;

        const initData = async () => {
            setLoading(true);
            getOnGoingOrder();
            getHistoryOrderByFood();
            getHistoryOrderByRestautant();
            setLoading(false);
            setEnableFilter(true);
        };
        initData();
        return () => {
            setMounted(false);
        };
    }, [isMouted]);

    const totalHistory = useMemo(() => {
        const byFood = state.histories[FilterType.Food];
        const byRestautant = state.histories[FilterType.Restaurant];
        return (byFood?.total_count ?? 0) + (byRestautant?.total_count ?? 0);
    }, [JSON.stringify(state.histories)]);

    const onChangeFilterCondition = (params: { type: FilterType; name: string; value: any }) => {
        setState((prevState) => ({
            ...prevState,
            condition: {
                ...prevState.condition,
                [params.type]: {
                    ...prevState.condition[params.type],
                    [params.name]: params.value,
                },
            },
        }));
    };

    const onChangeType = (type: FilterType) => {
        setState((prevState) => ({
            ...prevState,
            condition: {
                ...prevState.condition,
                type: type,
            },
        }));
    };

    const onChangeTab = (index: number) => {
        sessionStorage.setItem("historyTab", String(index));
        setState((prevState) => ({
            ...prevState,
            tab: index,
        }));
    };

    useEffect(() => {
        if (!isMouted || !enableFilter) return;
        sessionStorage.setItem("historyState", JSON.stringify(state.condition));
        if (state.condition.type == FilterType.Food) {
            getHistoryOrderByFood();
            return;
        }
        getHistoryOrderByRestautant();
    }, [JSON.stringify(state.condition)]);

    useEffect(() => {
        if (!isMouted) {
            const storageState = sessionStorage.getItem("historyState");
            const index = sessionStorage.getItem("historyTab") ?? "0";
            if (storageState) {
                try {
                    const values = JSON.parse(storageState) as HistoryFilterCondition;

                    const foodRange = values?.[FilterType.Food]?.timeRange;
                    const restaurantRange = values?.[FilterType.Food]?.timeRange;
                    const foodRangeTime = foodRange
                        ? {
                              from: new Date(String(foodRange.from)),
                              to: new Date(String(foodRange.to)),
                          }
                        : defaultRange;

                    const restaurantRangeTime = restaurantRange
                        ? {
                              from: new Date(String(restaurantRange.from)),
                              to: new Date(String(restaurantRange.to)),
                          }
                        : defaultRange;

                    const newConditions = {
                        ...values,
                        [FilterType.Food]: {
                            ...values[FilterType.Food],
                            timeRange: foodRangeTime,
                        },
                        [FilterType.Restaurant]: {
                            ...values[FilterType.Restaurant],
                            timeRange: restaurantRangeTime,
                        },
                    };

                    setState((prevState) => ({
                        ...prevState,
                        tab: Number(index),
                        condition: {
                            ...prevState.condition,
                            ...newConditions,
                        },
                    }));
                } catch (_) {}
            }
            setTimeout(() => {
                setMounted(true);
            }, 500);
        }
    }, []);

    return {
        tab: state.tab,
        onGoingOrder: state.onGoingOrder,
        history: state.histories,
        totalHistory: totalHistory,
        isLoading: state.isLoading,
        condition: state.condition,
        onChangeType: onChangeType,
        onChangeTab: onChangeTab,
        onChangeFilterCondition: onChangeFilterCondition,
    };
};

export default useOrderHistory;
