import apiServices from "@/services/sevices";
import { RestaurantDetailDto } from "@/types/response/base";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useRestaurantDetail = () => {
    const { restaurantId } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState<{
        info: RestaurantDetailDto;
    }>();

    useEffect(() => {
        if (restaurantId) {
            const id = Number(restaurantId);
            apiServices.getRestaurantDetail(id).then(({ data }) => {
                if (data) {
                    setRestaurantInfo((prevState) => ({
                        ...(prevState ?? {}),
                        info: data,
                    }));
                }
            });
        }
    }, [restaurantId]);

    return { restaurantInfo: restaurantInfo?.info, restaurantId: restaurantId };
};

export default useRestaurantDetail;
