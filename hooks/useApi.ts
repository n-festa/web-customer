import apiServices from "@/services/sevices";
import { SearchFoodAndRestaurantByCategoryIdRequest } from "@/types/request/SearchFoodAndRestaurantByCategoryIdRequest";
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
        ) =>
            useSWR("getAvailableTime", async () => apiServices.getAvailableTime(params), {
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
    };
};

export default useSWRAPI;
