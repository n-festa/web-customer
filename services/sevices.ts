import { store } from "@/store";
import { setLoading } from "@/store/reducers/appSlice";
import { Cart, CartItem } from "@/types/cart";
import { FetchMode } from "@/types/enum";
import { DateStep, DistrictsResponse, ProvinceResponse } from "@/types/interfaces";
import { SearchFoodByNameRequest } from "@/types/request/SearchFoodByNameRequest";
import { GetFoodDetailResponse, GetSideDishesResponse } from "@/types/response/FoodResponse";
import { GetAllCategoriesResponse } from "@/types/response/GetAllCategoriesResponse";
import { GetGeneralFoodRecommendResponse } from "@/types/response/GetGeneralFoodRecommendResponse";
import { GetGeneralRestaurantRecommendationResponse } from "@/types/response/GetGeneralRestaurantRecommendationResponse";
import { GetListSKUsByIdResponse } from "@/types/response/GetListSKUsByIdResponse";
import { RestaurantDetailResponse } from "@/types/response/RestaurantDetailResponse";
import { SearchFoodAndRestaurantByCategoryIdResponse } from "@/types/response/SearchFoodAndRestaurantByCategoryIdResponse";
import { SearchFoodByNameResponse } from "@/types/response/SearchFoodByNameResponse";
import { SearchPlaceResponse } from "@/types/response/SearchPlaceResponse";
import { GeoCode } from "@/types/response/base";
import { AxiosError, CancelToken } from "axios";
import { FullRequestParams, HttpClient } from "./apiClient";
import { handleRefreshToken } from "./sessionInvalid";

let callNumber = 0;

export const startLoading = (hasLoading?: boolean) => {
    if (hasLoading) {
        callNumber++;
        store.dispatch(setLoading(true));
    }
};

export const endLoading = (hasLoading?: boolean) => {
    if (hasLoading) {
        callNumber--;
        if (callNumber > 0) {
            return;
        }
        store.dispatch(setLoading(false));
    }
};

let errorRetryCount = 0;
class ApiServices<SecurityDataType> extends HttpClient<SecurityDataType> {
    async preRequest(req: FullRequestParams) {
        startLoading(req?.hasLoading);
    }
    async preResponse(req: FullRequestParams) {
        endLoading(req?.hasLoading);
    }
    async handleError<T>(
        _err: AxiosError & {
            config: { ignoreAll?: boolean; ignoreErrorCode?: number[]; hasLoading?: boolean; errDest?: string };
        },
    ): Promise<string | T | undefined | unknown> {
        const { ignoreAll, ignoreErrorCode, hasLoading, errDest } = _err?.config || {};

        const status = _err.response?.status;
        if (ignoreAll || (status && ignoreErrorCode?.includes(status))) {
            endLoading(hasLoading);
            return Promise.resolve(_err.response?.data);
        }
        switch (status) {
            case 401: {
                const result = await handleRefreshToken(errDest);
                if (result) {
                    errorRetryCount++;
                    if (errorRetryCount <= 5) {
                        const resReq = this.simpleRequest(_err?.config, result);
                        endLoading(hasLoading);
                        return resReq;
                    }
                    endLoading(hasLoading);
                    return;
                }
                return;
            }
        }
        endLoading(hasLoading);
        return Promise.reject();
    }
    constructor() {
        // Add BaseConfig Into Super Constructor
        super({ baseURL: process.env.NEXT_PUBLIC_URL_SERVICE || "https://api.2all.com.vn/web-customer/" });
    }
    api = {
        requestOTP: (data: { phoneNumber: string }) => {
            return this.request<{ data: { otpCode: string; phoneNumber: string } }>({
                path: "auth/request-otp",
                method: "POST",
                body: data,
            });
        },
        requestToken: (refresh_token: string) => {
            return this.request<{
                data: {
                    statusCode: number;
                    userType: string;
                    userId: number;
                    userName: string;
                    permissions: string;
                    access_token: string;
                    refresh_token: string;
                };
            }>({
                path: "auth/refresh-token",
                method: "GET",
                headers: {
                    Authorization: refresh_token ? "Bearer " + refresh_token : undefined,
                },
                ignoreAll: true,
            });
        },
        authOTP: (data: { phoneNumber: string; inputOTP: string }) => {
            return this.request<{
                data: {
                    statusCode: number;
                    userType: string;
                    userId: number;
                    userName: string;
                    permissions: string;
                    access_token: string;
                    refresh_token: string;
                };
            }>({
                path: "auth/authenticate-otp",
                method: "POST",
                body: data,
            });
        },
        customerProfile: (data: { userId: number }) => {
            return this.request({
                path: `customer-profile/${data.userId}`,
                method: "GET",
                body: data,
            });
        },
        createProfile: (data: {
            name: string;
            email: string;
            birthday: string;
            sex: string;
            height_m: number | string;
            weight_kg: number | string;
            physical_activity_level: string;
            current_diet?: string;
            allergic_food?: string;
            chronic_disease: string;
            expected_diet?: string;
        }) => {
            return this.request({
                path: "create-customer-profile",
                method: "POST",
                body: data,
            });
        },
        getGeneralFoodRecommendation: (
            query?: { lat?: number; long?: number; fetch_mode?: FetchMode },
            reqParams?: FullRequestParams,
        ) => {
            return this.request<GetGeneralFoodRecommendResponse>({
                path: "food/get-general-food-recomendation",
                method: "GET",
                //TODO
                query: query ?? {
                    lat: 10.820557580712087,
                    long: 106.7723030321775,
                },

                ...reqParams,
            });
        },

        getGeoCode: (address?: string, coor?: GeoCode | null, reqParams?: FullRequestParams) => {
            return this.request<{ results: SearchPlaceResponse[] }>({
                path: "https://rsapi.goong.io/Geocode",
                query: {
                    latlng: coor && !address ? `${coor.lat},${coor.lng}` : undefined,
                    address: address,
                    api_key: process.env.GEO_GOONG_API_KEY,
                },
                ...reqParams,
            });
        },
        getAllCategories: (reqParams?: FullRequestParams) => {
            return this.request<GetAllCategoriesResponse>({
                path: "/category",
                method: "GET",
                ...reqParams,
            });
        },
        searchFoodAndRestaurantByCategoryId: (
            payload: {
                lat: number;
                long: number;
                category_id: number;
            },
            reqParams?: FullRequestParams,
        ) => {
            return this.request<SearchFoodAndRestaurantByCategoryIdResponse>({
                path: "/category/search",
                method: "POST",
                body: payload,
                ...reqParams,
            });
        },

        getGeneralRestaurantRecommendation: (query?: { lat?: number; long?: number; fetch_mode?: FetchMode }) => {
            return this.request<GetGeneralRestaurantRecommendationResponse>({
                path: "/restaurant/get-general-recomendation?",
                method: "GET",
                //TODO
                query: query ?? {
                    lat: 10.820557580712087,
                    long: 106.7723030321775,
                },
            });
        },

        getFoodDetailById: (id: number) => {
            return this.request<GetFoodDetailResponse>({
                path: `food/get-detail/${id}`,
                method: "GET",
            });
        },

        getListOfSKUsById: (id: number) => {
            return this.request<GetListSKUsByIdResponse>({
                path: `food/get-sku-list/${id}`,
                method: "GET",
            });
        },

        getSideDishByMenuItemId: (id: number) => {
            return this.request<GetSideDishesResponse>({
                path: `food/get-side-dish/${id}`,
                method: "GET",
            });
        },

        searchFoodByName: (params: SearchFoodByNameRequest) => {
            return this.request<SearchFoodByNameResponse>({
                path: "/food/search-by-name",
                method: "POST",
                body: params,
            });
        },

        getRestaurantDetail: (id: number) => {
            return this.request<RestaurantDetailResponse>({
                path: `/restaurant/get-detail/${id}`,
                method: "GET",
            });
        },

        getCartDetail: (id: string, errDest?: string) => {
            return this.request<{ data: Cart }>({
                path: `/cart/get-detail/${id}`,
                method: "GET",
                errDest: errDest,
            });
        },
        addCart: (params: CartItem) => {
            return this.request<{ data: Cart }>({
                path: `/cart/add`,
                method: "POST",
                body: params,
                hasLoading: true,
            });
        },
        deleteWholdCart: (params: { customerId: string | number }) => {
            return this.request({
                path: `/cart/delete-all/${params.customerId}`,
                method: "POST",
                hasLoading: true,
            });
        },
        deleteCartItem: (params: { customer_id: string | number; cart_items: number[] }) => {
            return this.request<{ data: Cart }>({
                path: `/cart/delelte-item`,
                method: "POST",
                body: params,
            });
        },
        basicUpdateCart: (
            params: {
                customer_id: number;
                updated_items: {
                    item_id: number;
                    qty_ordered: number;
                }[];
            },
            cts?: CancelToken,
        ) => {
            return this.request<{ data: Cart }>({
                path: `/cart/basic-update`,
                method: "POST",
                body: params,
                cancelToken: cts,
            });
        },
        quickAddCart: (params: { customer_id: number; menu_item_id: number }) => {
            return this.request<{ data: Cart }>({
                path: `/cart/quick-add`,
                method: "POST",
                body: params,
            });
        },
        getHotFood: () => {
            return this.request<GetGeneralFoodRecommendResponse>({
                path: `/food/get-hot-food`,
                method: "GET",
            });
        },
        getAvailableTime: (
            params: {
                menu_item_ids?: (number | undefined)[];
                now?: number;
                long?: number;
                lat?: number;
                utc_offset?: number;
            },
            ignoreErrorCode?: number[],
        ) => {
            return this.request<{
                data: DateStep[] | number;
                statusCode: number;
            }>({
                path: `/cart/get-available-delivery-time`,
                method: "POST",
                body: {
                    ...params,
                    //TODO: Temp
                    menu_item_ids: [1, 2],
                    long: 106.7723030321775,
                    lat: 10.820557580712087,
                },
                ignoreErrorCode: [...(ignoreErrorCode ?? []), 404],
            });
        },
        sendContactForm: (params: { email: string; message: string }) => {
            return this.request({
                path: `/restaurant/send-contact-form`,
                method: "POST",
                body: params,
            });
        },
        getProvincesCities: () => {
            return this.request<{ data: ProvinceResponse[] }>({
                path: `https://pos.pages.fm/api/v1/geo/provinces?country_code=84`,
                method: "GET",
            });
        },
        getDistricts: (provinceId: string) => {
            return this.request<{ data: DistrictsResponse[] }>({
                path: `https://pos.pages.fm/api/v1/geo/districts?province_id=${provinceId}`,
                method: "GET",
            });
        },
        getWards: (districtId: string) => {
            return this.request<{ data: DistrictsResponse[] }>({
                path: `https://pos.pages.fm/api/v1/geo/communes?district_id=${districtId}`,
                method: "GET",
            });
        },
    };
}

const apiServices = new ApiServices().api;

export default apiServices;
