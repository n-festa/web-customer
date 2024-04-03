import { useAppSelector } from "@/store/hooks";
import { ReviewItem } from "@/types/interfaces";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWRAPI from "./useApi";
export interface DriverType {
    driver_id?: number;
    score?: number;
    remarks?: string;
    img_urls?: string[];
    img_blobs?: Blob[];
}
export interface OrderType {
    order_sku_id?: number;
    score?: number;
    remarks?: string;
    img_urls?: string[];
    img_blobs?: Blob[];
    raw?: ReviewItem;
}

const usePostReview = () => {
    const { GetReviewForm } = useSWRAPI();
    const { id: orderId } = useParams();
    const { customer_id: userId } = useAppSelector((state) => state.userInfo.userInfo || {});
    const { data: reviewForm } = GetReviewForm({ customer_id: Number(userId), order_id: Number(orderId) });
    const [driver, setDriver] = useState<DriverType>();
    const [orders, setOrders] = useState<{ [key: string]: OrderType }>({});
    const [orderQuick, setOderQuick] = useState<OrderType>({});
    console.log({ driver, orders });

    const handeleChangeOrder = (id: number, key: "score" | "remarks" | "img_urls", value: string | number | Blob[]) => {
        setOrders((prev) => ({ ...prev, [String(id)]: { ...prev[String(id)], [key]: value } }));
    };

    const handleChangeDriver = (key: "score" | "remarks" | "img_urls", value: string | number | Blob[]) => {
        if (driver?.driver_id) setDriver((prev) => ({ ...prev, [key]: value }));
    };

    const handleOrderQuick = (key: "score" | "remarks" | "img_urls", value: string | number | Blob[]) => {
        if (orderQuick) setOderQuick((prev) => ({ ...prev, [key]: value }));
        setOrders((prev) => {
            const newValues = { ...prev };
            Object.keys(prev).forEach((id) => {
                newValues[id] = { ...newValues[id], [key]: value };
            });
            console.log("news VAlue", newValues);
            return newValues;
        });
    };

    useEffect(() => {
        if (reviewForm && !Object.keys(orders).length) {
            // reviewForm.order_items.map((item) => ({ order_sku_id: item.order_sku_id, raw: item }))
            // setOrders();
            const newOrders = { ...orders };
            reviewForm.order_items.forEach((item) => {
                if (!orders[String(item.order_sku_id)]) {
                    newOrders[String(item.order_sku_id)] = {
                        raw: item,
                        order_sku_id: item.order_sku_id,
                    };
                }
            });
            setOrders(newOrders);
            setDriver({ driver_id: reviewForm.driver_id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reviewForm]);
    const handleSubmit = () => {
        //Upload blobs
        //Get list urls
        //Replace img_urls by new list urls
    };

    return {
        reviewForm,
        handleSubmit,
        handeleChangeOrder,
        handleChangeDriver,
        setOrders,
        orders,
        driver,
        handleOrderQuick,
        orderQuick,
    };
};

export default usePostReview;
