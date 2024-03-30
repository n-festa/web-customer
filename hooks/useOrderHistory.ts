/* eslint-disable react-hooks/exhaustive-deps */
import apiServices from "@/services/sevices";
import { FilterOrderStatuType, FilterType, SortOrderHistory } from "@/types/enum";
import {
    GetHistoryOrderByFoodResponse,
    GetHistoryOrderByRestaurantResponse,
} from "@/types/response/GetHistoryOrderResponse";
import { OnGoingOrder } from "@/types/response/OnGoingOrderResponse";
import { loadState } from "@/utils/localstorage";
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
    histories: {
        [FilterType.Food]?: GetHistoryOrderByFoodResponse;
        [FilterType.Restaurant]?: GetHistoryOrderByRestaurantResponse;
    };
    condition: HistoryFilterCondition;
}

const useOrderHistory = () => {
    const [state, setState] = useState<OrderHistoryState>({
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
    const { userId } = loadState("infoSign");

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

    const getHistoryOrderByFood = async () => {
        const filterFood = state.condition[FilterType.Food];

        const request = {
            customer_id: userId ?? -1,
            offset: 0,
            page_size: 50,
            search_keyword: filterFood.searchKey,
            sort_type: filterFood.sortType,
            filtered_order_status: filterFood.orderStatus != FilterOrderStatuType.ALL ? [filterFood.orderStatus] : [],
            time_range: {
                from: 1709251200000,
                to: 1711545057805,
            },
            // time_range: {
            //     from: filterFood.timeRange.from.getTime(),
            //     to: filterFood.timeRange.to.getTime(),
            // },
        };
        let data = { ...state.histories };
        try {
            const res = await apiServices.getHistoryOrderByFood(request);

            if (res) {
                data = {
                    ...data,
                    [FilterType.Food]: res,
                };
            }

            setState((prevState) => ({
                ...prevState,
                histories: data,
            }));
        } catch (_) {
            setState((prevState) => ({
                ...prevState,
                histories: {
                    ...data,
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
            // time_range: {
            //     from: filterRestaurant.timeRange.from.getTime(),
            //     to: filterRestaurant.timeRange.to.getTime(),
            // },
            time_range: {
                from: 1709251200000,
                to: 1711545057805,
            },
        };
        let data = { ...state.histories };
        try {
            const res = await apiServices.getHistoryOrderByRestaurant(requestRestaurant);

            if (res) {
                data = {
                    ...data,
                    [FilterType.Restaurant]: res,
                };
            }

            setState((prevState) => ({
                ...prevState,
                histories: data,
            }));
        } catch (_) {
            setState((prevState) => ({
                ...prevState,
                histories: {
                    ...data,
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
        setMounted(true);
        const initData = async () => {
            setLoading(true);
            await getOnGoingOrder();
            await getHistoryOrderByFood();
            await getHistoryOrderByRestautant();
            setLoading(false);
        };
        initData();
        return () => {
            setMounted(false);
        };
    }, []);

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

    useEffect(() => {
        if (!isMouted) return;

        if (state.condition.type == FilterType.Food) {
            getHistoryOrderByFood();
            return;
        }
        getHistoryOrderByRestautant();
    }, [JSON.stringify(state.condition)]);

    return {
        onGoingOrder: state.onGoingOrder,
        history: state.histories,
        totalHistory: totalHistory,
        isLoading: state.isLoading,
        condition: state.condition,
        onChangeType: onChangeType,
        onChangeFilterCondition: onChangeFilterCondition,
    };
};

export default useOrderHistory;
