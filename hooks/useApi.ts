import apiServices from "@/services/sevices";
import { SearchFoodAndRestaurantByCategoryIdRequest } from "@/types/request/SearchFoodAndRestaurantByCategoryIdRequest";
import useSWR from "swr";
const useSWRAPI = () => {
    return {
        GetGeneralFoodRecommendation: (query?: { lat?: number; long?: number }) =>
            useSWR("getGeneralFoodRecommendation", async () => apiServices.getGeneralFoodRecommendation(query)),
        GetAllCategories: () => useSWR("getAllCategories", async () => apiServices.getAllCategories()),
        SearchFoodAndRestaurantByCategoryId: (payload: SearchFoodAndRestaurantByCategoryIdRequest) =>
            useSWR("searchFoodAndRestaurantByCategoryId", async () =>
                apiServices.searchFoodAndRestaurantByCategoryId(payload),
            ),
        GetGeneralRestaurantRecommendation: () =>
            useSWR("getGeneralRestaurantRecommendation", async () => apiServices.getGeneralRestaurantRecommendation()),
    };
};

export default useSWRAPI;
