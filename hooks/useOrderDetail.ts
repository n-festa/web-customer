import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import apiServices from "@/services/sevices";
import { OrderPaymentStatus, OrderStatusLogType, PaymentMethod } from "@/types/enum";
import { Order } from "@/types/order";
import { getToken } from "@/utils/auth";
import { routes } from "@/utils/routes";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import useSWRAPI from "./useApi";
// OR: may also need to set as global property
const listStatusLog = [OrderStatusLogType.FAILED, OrderStatusLogType.CANCELLED, OrderStatusLogType.COMPLETED];
const baseURL = process.env.NEXT_PUBLIC_URL_SERVICE || "https://api.2all.com.vn/web-customer/";
const listNeedPayment: string[] = [OrderPaymentStatus.PENDING, OrderPaymentStatus.STARTED];
const useOrderDetail = () => {
    const { id: orderId } = useParams();
    const { GetOrderDetail } = useSWRAPI();
    const {
        isLoading,
        data: orderDetail,
        error,
    } = GetOrderDetail(String(orderId), {
        shouldRetryOnError: false,
    });
    const router = useRouter();
    const [pushData, setPushData] = useState<Order>();
    const t = useTranslations("ORDER_DETAIL");

    useEffect(() => {
        const orderPaymentStatus = orderDetail?.payment_status_history?.[0].status_id;
        if (
            orderDetail?.invoice_id &&
            orderDetail?.payment_method &&
            orderDetail?.payment_method.id === PaymentMethod.Momo &&
            orderPaymentStatus &&
            listNeedPayment.includes(orderPaymentStatus)
        ) {
            apiServices.createMomoPayment({ invoiceId: orderDetail?.invoice_id }).then((data) => {
                if (data.payUrl) {
                    router.push(data.payUrl);
                }
            });
        }
    }, [orderDetail?.invoice_id, orderDetail?.payment_method, orderDetail?.payment_status_history, router]);
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

        return _orderStatusLog?.some((item) => {
            const milestone = item.milestone;
            return milestone && listStatusLog.includes(milestone.toLocaleLowerCase() as OrderStatusLogType);
        });
    }, [orderDetail?.order_status_log, pushData?.order_status_log]);
    useEffect(() => {
        const isDone = orderDetail?.order_status_log?.some((item) => {
            const milestone = item.milestone;
            return milestone && listStatusLog.includes(milestone.toLocaleLowerCase() as OrderStatusLogType);
        });

        if (isDone || !orderId || !orderDetail) return;
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
                    const isDone = orderDetail.order_status_log?.some((item) => {
                        const milestone = item.milestone;
                        return milestone && listStatusLog.includes(milestone.toLocaleLowerCase() as OrderStatusLogType);
                    });
                    if (isDone) {
                        eventSource.close();
                    }

                    if (orderDetail.order_status_log?.some((item) => item.milestone === OrderStatusLogType.COMPLETED)) {
                        dialogRef.current?.show({
                            title: t("ORDER_CONFIRMATION.MD.COMPLETED"),
                            message: t("REVIEW_REQUEST"),
                            negative: {
                                text: t("BACK"),
                                onClick: async () => {
                                    router.push(routes.Home);
                                },
                            },
                            positive: {
                                text: t("REVIEW"),
                                onClick: async () => {
                                    router.push(routes.orderReview + `/${orderId}`);
                                },
                            },
                        });
                    }
                } else {
                    return;
                }
            } catch {}
        };

        // terminating the connection on component unmount
        return () => eventSource.close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(orderDetail?.order_status_log), orderId, router]);

    return {
        orderDetail: pushData || orderDetail,
        isLoading,
        addressString,
        isSimpleScreen,
        error,
        orderStatusLog: orderDetail?.order_status_log,
    };
};

export default useOrderDetail;
