import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import apiServices from "@/services/sevices";
import { FetchMode } from "@/types/enum";
import { GetOrderHistoryRequest } from "@/types/request/GetOrderHistoryRequest";
import { SearchFoodAndRestaurantByCategoryIdRequest } from "@/types/request/SearchFoodAndRestaurantByCategoryIdRequest";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import useSWR, { SWRConfiguration } from "swr";
const MAX_RETRY_NUMBER = 5;
const RETRY_INVERVAL = 3000;

const useSWRAPI = () => {
    const t = useTranslations("COMMON");
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
                if (!dialogRef.current?.state.show) {
                    dialogRef.current?.show({
                        message: t("ERROR.API_REQUEST_FAIL"),
                        title: t("ERROR.ERROR_TITLE"),
                    });
                }
            },
        };
    }, [t]);
    return {
        GetAvailableTime: (
            params: {
                menu_item_ids?: (number | undefined)[];
                now?: number;
                long?: number;
                lat?: number;
                utc_offset?: number;
                having_advanced_customization?: boolean;
            },
            config?: SWRConfiguration,
            ignoreErrorCode?: number[],
        ) =>
            useSWR(
                params?.menu_item_ids?.length
                    ? `getAvailableTime_${(params.menu_item_ids ?? []).join("_")}`
                    : undefined,
                async () => apiServices.getAvailableTime(params, ignoreErrorCode),
                {
                    ...swrConfig,
                    ...config,
                },
            ),
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
        GetSideDishByMenuItemId: (id: number, query: { fetch_mode: FetchMode }, config?: SWRConfiguration) =>
            useSWR("getSideDishByMenuItemId", async () => apiServices.getSideDishByMenuItemId(id, query), {
                ...swrConfig,
                ...config,
            }),
        GetProvincesCities: (config?: SWRConfiguration) =>
            useSWR("getProvincesCities", async () => apiServices.getProvincesCities(), {
                ...swrConfig,
                ...config,
            }),
        GetCurrentAvailableFoodByRestaurant: (id: number, fetch_mode: FetchMode, config?: SWRConfiguration) =>
            useSWR(
                "getCurrentAvailableFoodByRestaurant",
                async () => apiServices.getCurrentAvailableFoodByRestaurant(id, fetch_mode),
                {
                    ...swrConfig,
                    ...config,
                },
            ),
        GetPersonalFoodRecommendation: (
            query: { fetch_mode: FetchMode; menu_item_id: number | string },
            config?: SWRConfiguration,
        ) =>
            useSWR("getPersonalFoodRecommendation", async () => apiServices.getPersonalFoodRecommendation(query), {
                ...swrConfig,
                ...config,
            }),
        GetTopReview: (config?: SWRConfiguration) =>
            useSWR("getTopReview", async () => apiServices.getTopReview(), {
                ...swrConfig,
                ...config,
            }),
        GetOrderDetail: (_orderId: string, config?: SWRConfiguration) =>
            useSWR("getOrderDetail", async () => apiServices.orderDetail(_orderId), {
                ...swrConfig,
                ...config,
            }),
        GetPaymentMethod: (config?: SWRConfiguration) =>
            useSWR("getPaymentMethod", async () => apiServices.getPaymentMethod(), {
                ...swrConfig,
                ...config,
            }),
        GetApplicationFee: (
            params: {
                itemTotal: number;
                exchangeRate: number;
            },
            config?: SWRConfiguration,
        ) =>
            useSWR(
                params?.itemTotal ? `getApplicationFee${params.itemTotal}_${params.exchangeRate}` : undefined,
                async () => apiServices.getApplicationFee(params),
                {
                    ...swrConfig,
                    ...config,
                },
            ),
        GetCutleryFee: (
            enable: boolean,
            params: {
                restaurant_id?: string | number;
                item_quantity?: number;
            },
            config?: SWRConfiguration,
        ) =>
            useSWR(
                () =>
                    !enable || !params.restaurant_id
                        ? null
                        : `getCutleryFee${params.item_quantity}_${params.restaurant_id}`,
                async () => apiServices.getCutleryFee(params),
                {
                    ...swrConfig,
                    ...config,
                },
            ),
        GetCouponInfo: (
            params: {
                restaurant_id?: string | number;
                sku_ids?: number[];
            },
            config?: SWRConfiguration,
        ) =>
            useSWR(
                params?.restaurant_id && params.sku_ids?.length
                    ? `getCouponInfo_${params.sku_ids?.join("_")}`
                    : undefined,
                async () => apiServices.getCouponInfo(params),
                {
                    ...swrConfig,
                    ...config,
                },
            ),

        OnGoingOrder: (config?: SWRConfiguration) =>
            useSWR("OnGoingOrder", async () => apiServices.onGoingOrder(), {
                ...swrConfig,
                ...config,
            }),
        GetHistoryOrderByFood: (request: GetOrderHistoryRequest, config?: SWRConfiguration) =>
            useSWR("GetHistoryOrderByFood", async () => apiServices.getHistoryOrderByFood(request), {
                ...swrConfig,
                ...config,
            }),
        GetHistoryOrderByRestaurant: (request: GetOrderHistoryRequest, config?: SWRConfiguration) =>
            useSWR("GetHistoryOrderByRestaurant", async () => apiServices.getHistoryOrderByRestaurant(request), {
                ...swrConfig,
                ...config,
            }),
        GetReviewForm: (request: { customer_id: number; order_id: number }, config?: SWRConfiguration) =>
            useSWR("GetReviewForm", async () => apiServices.getReviewForm(request), {
                ...swrConfig,
                ...config,
            }),
    };
};

export default useSWRAPI;
