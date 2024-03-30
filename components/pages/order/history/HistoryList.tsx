import Empty from "@/components/molecules/Empty";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import HistoryItem from "@/components/pages/order/history/HistoryItem";
import OrderHistoryRestaurantItem from "@/components/pages/order/history/OrderHistoryRestaurantItem";
import { FilterType } from "@/types/enum";
import {
    GetHistoryOrderByFoodResponse,
    GetHistoryOrderByRestaurantResponse,
    HistoricalOrderByFood,
    HistoricalOrderByRestaurant,
} from "@/types/response/GetHistoryOrderResponse";
import { VStack } from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
    histories: {
        food?: GetHistoryOrderByFoodResponse;
        restaurant?: GetHistoryOrderByRestaurantResponse;
    };
    type: FilterType;
    isLoading?: boolean;
}

const HistoryList = ({ histories, isLoading, type }: Props) => {
    const data = useMemo(() => {
        if (type == FilterType.Food) return histories.food?.hitorical_oders ?? [];
        return histories.restaurant?.hitorical_oders ?? [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, JSON.stringify(histories)]);
    return (
        <VStack flexDirection={"column"} spacing={"0.8rem"} w="100%" bg={data.length === 0 ? "white" : "transparent"}>
            {isLoading ? (
                <>
                    <SkeletonBox isLoaded={false} />
                    <SkeletonBox isLoaded={false} />
                    <SkeletonBox isLoaded={false} />
                </>
            ) : data.length === 0 ? (
                <Empty />
            ) : type === FilterType.Food ? (
                data.map((el, index) => <HistoryItem key={String(index)} orderInfo={el as HistoricalOrderByFood} />)
            ) : (
                data.map((el, index) => (
                    <OrderHistoryRestaurantItem key={String(index)} orderInfo={el as HistoricalOrderByRestaurant} />
                ))
            )}
        </VStack>
    );
};
export default HistoryList;
