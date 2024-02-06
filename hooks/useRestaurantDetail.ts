import apiServices from "@/services/sevices";
import { RestaurantDetailDto } from "@/types/response/base";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useRestaurantDetail = () => {
    const { restaurantId } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState<{
        info: RestaurantDetailDto;
    }>();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (restaurantId) {
            setLoading(true);
            const id = Number(restaurantId);
            apiServices
                .getRestaurantDetail(id)
                .then(({ data }) => {
                    if (data) {
                        setRestaurantInfo((prevState) => ({
                            ...(prevState ?? {}),
                            info: data,
                        }));
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [restaurantId]);

    return { restaurantInfo: restaurantInfo?.info, restaurantId: restaurantId, isLoading: isLoading };
};

export default useRestaurantDetail;
