import { useParams } from "next/navigation";
import { useMemo } from "react";
import useSWRAPI from "./useApi";

const useOrderDetail = () => {
    const { id: orderId } = useParams();
    const { GetOrderDetail } = useSWRAPI();
    const { isLoading, data: orderDetail } = GetOrderDetail(String(orderId));
    const addressString = useMemo(() => {
        const list: string[] = [];
        if (orderDetail?.address) {
            Object.values(orderDetail.address).forEach((item) => {
                if (item && typeof item != "number") {
                    list.push(item);
                }
            });
            return list.join(", ");
        }

        return "-";
    }, [orderDetail?.address]);
    return { orderDetail, isLoading, addressString };
};

export default useOrderDetail;
