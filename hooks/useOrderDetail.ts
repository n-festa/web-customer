import { OrderStatusLogType } from "@/types/enum";
import { Order } from "@/types/order";
import { getToken } from "@/utils/auth";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useSWRAPI from "./useApi";
// OR: may also need to set as global property
const listStatusLog = [OrderStatusLogType.FAILED, OrderStatusLogType.CANCELLED, OrderStatusLogType.COMPLETED];
const baseURL = process.env.NEXT_PUBLIC_URL_SERVICE || "https://api.2all.com.vn/web-customer/";

const useOrderDetail = () => {
    const { id: orderId } = useParams();
    const { GetOrderDetail } = useSWRAPI();
    const { isLoading, data: orderDetail } = GetOrderDetail(String(orderId));
    const [pushData, setPushData] = useState<Order>();
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
        const _orderStatusLog = pushData?.order_status_log || orderDetail?.order_status_log;
        const milestone = _orderStatusLog?.[_orderStatusLog?.length - 1].milestone;
        return milestone && listStatusLog.includes(milestone);
    }, [orderDetail?.order_status_log, pushData?.order_status_log]);
    useEffect(() => {
        // opening a connection to the server to begin receiving events from it
        const eventSource = new EventSourcePolyfill(`${baseURL}order/sse-connection/${orderId}`, {
            headers: {
                Authorization: "Bearer " + getToken(),
            },
        });

        // attaching a handler to receive message events
        eventSource.onmessage = (event) => {
            try {
                const orderDetail = JSON.parse(event.data) as Order;
                if (orderDetail.order_status_log) {
                    setPushData(orderDetail);
                } else {
                    return;
                }
            } catch {}
        };

        // terminating the connection on component unmount
        return () => eventSource.close();
    }, [orderId]);

    return { orderDetail: pushData || orderDetail, isLoading, addressString, isSimpleScreen };
};

export default useOrderDetail;
