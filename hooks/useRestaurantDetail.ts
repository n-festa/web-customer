import apiServices from "@/services/sevices";
import { useAppSelector } from "@/store/hooks";
import { RestaurantDetailDto } from "@/types/response/base";
import { isToday, isTomorrow } from "date-fns";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useRestaurantDetail = () => {
    const { restaurantId } = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState<{
        info: RestaurantDetailDto;
    }>();
    const [availableTime, setAvailableTime] = useState<
        {
            value: string;
            name: string;
        }[]
    >();
    const [isLoading, setLoading] = useState(false);
    const profile = useAppSelector((state) => state.userInfo.userInfo);

    const initRestaurant = useCallback(async () => {
        const id = Number(restaurantId);
        const restaurantData = await apiServices.getRestaurantDetail(id);
        if (restaurantData.data) {
            setRestaurantInfo((prevState) => ({
                ...(prevState ?? {}),
                info: restaurantData.data,
            }));
            console.log(new Date().getTime());
            const availableTime = await apiServices.getAvailableTime({
                menu_item_ids: restaurantData.data.menu.map((item) => item.id),
                lat: profile?.latAddress,
                long: profile?.longAddress,
                now: new Date().getTime(),
                utc_offset: -(new Date().getTimezoneOffset() / 60),
            });
            const dateOptions: { [key: string]: { value: string; name: string } } = {};
            availableTime?.data.forEach((item) => {
                if (item.date && !dateOptions[item.date]) {
                    let name = item.date;
                    name = isTomorrow(item.date) ? "Ngày mai" : isToday(item.date) ? "Hôm nay" : name;

                    dateOptions[item.date] = {
                        name: name,
                        value: item.date,
                    };
                }
            });
            const dateOptionsList = Object.values(dateOptions);
            setAvailableTime(dateOptionsList);
        }
    }, [profile?.latAddress, profile?.longAddress, restaurantId]);
    useEffect(() => {
        if (restaurantId) {
            setLoading(true);
            initRestaurant().finally(() => {
                setLoading(false);
            });
        }
    }, [initRestaurant, restaurantId]);

    return { restaurantInfo: restaurantInfo?.info, restaurantId: restaurantId, isLoading: isLoading, availableTime };
};

export default useRestaurantDetail;
