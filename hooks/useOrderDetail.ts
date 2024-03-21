import { OrderStatusLogType } from "@/types/enum";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import useSWRAPI from "./useApi";
const listStatusLog = [OrderStatusLogType.FAILED, OrderStatusLogType.CANCELLED, OrderStatusLogType.COMPLETED];

const useOrderDetail = () => {
    const { id: orderId } = useParams();
    const { GetOrderDetail } = useSWRAPI();
    const { isLoading, data: orderDetail } = GetOrderDetail(String(orderId));
    const addressString = useMemo(() => {
        const list: string[] = [];
        if (orderDetail?.address) {
            Object.entries(orderDetail.address).forEach(([key, item]) => {
                if (item && typeof item != "number" && key != "longitude" && key != "latitude") {
                    list.push(item);
                }
            });
            return list.join(", ");
        }

        return "-";
    }, [orderDetail?.address]);

    const isSimpleScreen = useMemo(() => {
        return orderDetail?.order_status_log?.some((item) => item.milestone && listStatusLog.includes(item.milestone));
    }, [orderDetail?.order_status_log]);

    return { orderDetail, isLoading, addressString, isSimpleScreen };
};

export default useOrderDetail;
