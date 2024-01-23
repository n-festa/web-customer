import apiServices from "@/services/sevices";
import useSWR from "swr";
const useSWRAPI = () => {
    return {
        GetGeneralFoodRecommendation: () =>
            useSWR("getGeneralFoodRecommendation", async () => apiServices.getGeneralFoodRecommendation()),
    };
};

export default useSWRAPI;
