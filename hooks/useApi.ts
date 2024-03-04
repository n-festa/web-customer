import apiServices from "@/services/sevices";
import { FetchMode } from "@/types/enum";
import { SearchFoodAndRestaurantByCategoryIdRequest } from "@/types/request/SearchFoodAndRestaurantByCategoryIdRequest";
import { orderDetailMock } from "@/utils/data/order";
import { useMemo } from "react";
import useSWR, { SWRConfiguration } from "swr";
const MAX_RETRY_NUMBER = 5;
const RETRY_INVERVAL = 3000;

const useSWRAPI = () => {
    const swrConfig: SWRConfiguration = useMemo(() => {
        return {
            revalidateOnFocus: false,
            revalidateOnMount: true,
            revalidateOnReconnect: false,
            refreshWhenOffline: true,
            refreshWhenHidden: false,
            refreshInterval: 0,
            onErrorRetry(_err, _key, _config, revalidate, revalidateOpts) {
                if (revalidateOpts.retryCount < MAX_RETRY_NUMBER) {
                    setTimeout(() => {
                        revalidate(revalidateOpts);
                    }, RETRY_INVERVAL);
                    return;
                }
            },
        };
    }, []);
    return {
        GetAvailableTime: (
            params: {
                menu_item_ids?: (number | undefined)[];
                now?: number;
                long?: number;
                lat?: number;
                utc_offset?: number;
            },
            config?: SWRConfiguration,
            ignoreErrorCode?: number[],
        ) =>
            useSWR("getAvailableTime", async () => apiServices.getAvailableTime(params, ignoreErrorCode), {
                ...swrConfig,
                ...config,
            }),
        GetGeneralFoodRecommendation: (query?: { lat?: number; long?: number }, config?: SWRConfiguration) =>
            useSWR("getGeneralFoodRecommendation", async () => apiServices.getGeneralFoodRecommendation(query), {
                ...swrConfig,
                ...config,
            }),
        GetHotFood: () => useSWR("getHotFood", async () => apiServices.getHotFood()),
        GetAllCategories: (config?: SWRConfiguration) =>
            useSWR("getAllCategories", async () => apiServices.getAllCategories(), {
                ...swrConfig,
                ...config,
            }),
        SearchFoodAndRestaurantByCategoryId: (
            payload: SearchFoodAndRestaurantByCategoryIdRequest,
            config?: SWRConfiguration,
        ) =>
            useSWR(
                "searchFoodAndRestaurantByCategoryId",
                async () => apiServices.searchFoodAndRestaurantByCategoryId(payload),
                { ...swrConfig, ...config },
            ),
        GetGeneralRestaurantRecommendation: (config?: SWRConfiguration) =>
            useSWR("getGeneralRestaurantRecommendation", async () => apiServices.getGeneralRestaurantRecommendation(), {
                ...swrConfig,
                ...config,
            }),
        GetSideDishByMenuItemId: (id: number, config?: SWRConfiguration) =>
            useSWR("getSideDishByMenuItemId", async () => apiServices.getSideDishByMenuItemId(id), {
                ...swrConfig,
                ...config,
            }),
        GetProvincesCities: (config?: SWRConfiguration) =>
            useSWR("getProvincesCities", async () => apiServices.getProvincesCities(), {
                ...swrConfig,
                ...config,
            }),
        GetCurrentAvailableFoodByRestaurant: (id: number, fetch_mode?: FetchMode, config?: SWRConfiguration) =>
            useSWR(
                "getCurrentAvailableFoodByRestaurant",
                async () => apiServices.getCurrentAvailableFoodByRestaurant(id, { fetch_mode }),
                {
                    ...swrConfig,
                    ...config,
                },
            ),
        GetPersonalFoodRecommendation: (id: number, fetch_mode?: FetchMode, config?: SWRConfiguration) =>
            useSWR(
                "getPersonalFoodRecommendation",
                async () => apiServices.getPersonalFoodRecommendation(id, { fetch_mode }),
                {
                    ...swrConfig,
                    ...config,
                },
            ),
        GetTopReview: (config?: SWRConfiguration) =>
            useSWR("getTopReview", async () => apiServices.getTopReview(), {
                ...swrConfig,
                ...config,
            }),
        GetOrderDetail: (orderId: string, config?: SWRConfiguration) =>
            useSWR("getOrderDetail", async () => Promise.resolve(orderDetailMock), {
                ...swrConfig,
                ...config,
            }),
    };
};

export default useSWRAPI;
