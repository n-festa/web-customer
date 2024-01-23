import { GetGeneralFoodRecommendResponse } from "@/types/response/GetGeneralFoodRecommendResponse";
import { SearchPlaceResponse } from "@/types/response/SearchPlaceResponse";
import { GeoCode } from "@/types/response/base";
import { AxiosError } from "axios";
import { FullRequestParams, HttpClient } from "./apiClient";

class ApiServices<SecurityDataType> extends HttpClient<SecurityDataType> {
    handleError(_err: AxiosError): void {
        // TODO:
    }
    constructor() {
        // Add BaseConfig Into Super Constructor
        super({ baseURL: process.env.NEXT_PUBLIC_URL_SERVICE || "https://api.2all.com.vn/web-customer/" });
    }
    api = {
        requestOTP: (data: { phoneNumber: string }) => {
            return this.request<{ otpCode: string; phoneNumber: string }>({
                path: "auth/request-otp",
                method: "POST",
                body: data,
            });
        },
        getGeneralFoodRecommendation: () => {
            return this.request<GetGeneralFoodRecommendResponse>({
                path: "food/get-general-food-recomendation",
                method: "GET",
                //TODO
                query: {
                    lat: 10.820557580712087,
                    long: 106.7723030321775,
                },
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
    };
}

const apiServices = new ApiServices().api;

export default apiServices;
