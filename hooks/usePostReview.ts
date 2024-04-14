import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import apiServices from "@/services/sevices";
import { useAppSelector } from "@/store/hooks";
import { OrderReview, ReviewItem } from "@/types/interfaces";
import { routes } from "@/utils/routes";
import { useToast } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWRAPI from "./useApi";
export interface DriverType {
    driver_id?: number;
    score?: number;
    remarks?: string;
    img_urls?: string[];
    img_blobs?: (File | Blob)[];
}
export interface OrderType {
    order_sku_id?: number;
    score?: number;
    remarks?: string;
    img_urls?: string[];
    img_blobs?: (File | Blob)[];
    raw?: ReviewItem;
}

export interface OrderQuickType {
    driver?: { driver_id?: number; score?: number; remarks?: string };
    orders?: {
        order_sku_id?: number;
        score?: number;
        remarks?: string;
        img_urls?: string[];
        img_blobs?: (File | Blob)[];
    };
}
interface FoodReview {
    order_sku_id: number;
    score: number;
    remarks: string;
    img_urls: string[];
}

const usePostReview = () => {
    const router = useRouter();
    const tReview = useTranslations("REVIEW.UPLOAD");
    const toast = useToast();
    const { GetReviewForm } = useSWRAPI();
    const { id: orderId } = useParams();
    const { customer_id: userId } = useAppSelector((state) => state.userInfo.userInfo || {});
    const { data: reviewForm } = GetReviewForm({ customer_id: Number(userId), order_id: Number(orderId) });
    const [errorUpload, setErrorUpload] = useState<boolean>(false);
    const [driver, setDriver] = useState<DriverType>();
    const [orders, setOrders] = useState<{ [key: string]: OrderType }>({});
    const [orderQuick, setOderQuick] = useState<OrderQuickType>({});
    const [remarkQuick, setRemarkQuick] = useState<string[]>([]);
    const [missingReviews, setMissingReview] = useState<{
        driver: boolean;
        dishes: string[];
    }>();
    const handleChangeOrder = (id: number, key: "score" | "remarks" | "img_blobs", value: string | number | Blob[]) => {
        setOrders((prev) => ({ ...prev, [String(id)]: { ...prev[String(id)], [key]: value } }));
    };

    const handleChangeDriver = (key: "score" | "remarks" | "img_blobs", value: string | number | Blob[]) => {
        if (driver?.driver_id) setDriver((prev) => ({ ...prev, [key]: value }));
    };

    const validateReview = (review: OrderReview) => {
        if (!review.driver_review.score || review.food_reviews.some((item) => !item.score)) {
            dialogRef.current?.show({
                message: tReview("ERROR_REVIEW_MISSING"),
                title: tReview("REVIEW"),
            });
            setMissingReview({
                driver: !review.driver_review.score,
                dishes: review.food_reviews.filter((item) => !item.score).map((item) => String(item.order_sku_id)),
            });
            return false;
        }
        return true;
    };
    const handleOrderQuick = (
        type: "driver" | "orders",
        key: "score" | "remarks" | "img_blobs",
        value: string | number | Blob[],
    ) => {
        if (orderQuick) setOderQuick((prev) => ({ ...prev, [type]: { ...prev[type], [key]: value } }));
    };
    const handleUploadImage = async (files: (File | Blob)[]) => {
        try {
            const data = await apiServices.uploadImageReview({
                order_id: Number(orderId),
                list_file: files,
            });
            return data.urls;
        } catch (err) {
            setErrorUpload(true);
            const message: string | undefined = (err as any)?.error?.code;
            const errorLength = (err as any)?.error?.response?.status;
            if (message === "ERR_NETWORK" || errorLength === 400) {
                toast({
                    title: tReview("TITLE"),
                    description: tReview("ERROR_LENGTH"),
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            } else {
                toast({
                    title: tReview("TITLE"),
                    description: tReview("ERROR_CONTENT"),
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            }
            return [];
        }
    };
    const handleFoodReview = async (order: OrderType): Promise<FoodReview> => {
        let urlsImg: string[] = [];
        if (order?.img_blobs) {
            urlsImg = await handleUploadImage(order.img_blobs);
        }
        return {
            order_sku_id: order.order_sku_id ?? 0,
            score: order?.score ?? 0,
            remarks: order?.remarks ?? "",
            img_urls: urlsImg ?? [],
        };
    };

    const handleSubmit = async (type: "quick" | "detail") => {
        let result;
        setErrorUpload(false);
        if (type === "quick") {
            let urlsImg: string[] = [];
            if (orderQuick.orders?.img_blobs) {
                urlsImg = await handleUploadImage(orderQuick.orders.img_blobs);
                if (errorUpload) return;
                setOderQuick((prev) => ({ ...prev, orders: { ...prev.orders, img_urls: urlsImg } }));
            }
            const foodReviews = Object.keys(orders).map((order) => {
                return {
                    order_sku_id: orders[order].order_sku_id,
                    score: orderQuick.orders?.score ?? 0,
                    remarks: `${remarkQuick.join(", ")} ${orderQuick.orders?.remarks ?? ""}`,
                    img_urls: urlsImg ?? [],
                };
            });

            result = {
                customer_id: Number(userId),
                order_id: Number(orderId),
                driver_review: {
                    ...orderQuick.driver,
                    remarks: "",
                    img_urls: urlsImg ?? [],
                    score: orderQuick.driver?.score ?? 0,
                },
                food_reviews: foodReviews,
            };
        } else {
            let urlsImg: string[] = [];
            if (driver?.img_blobs) {
                urlsImg = await handleUploadImage(driver.img_blobs);
                if (errorUpload) return;
                setDriver((prev) => ({ ...prev, img_urls: urlsImg }));
            }
            const foodReviews = await Promise.all(Object.values(orders).map((order) => handleFoodReview(order)));
            result = {
                customer_id: Number(userId),
                order_id: Number(orderId),
                driver_review: {
                    driver_id: driver?.driver_id,
                    score: driver?.score ?? 0,
                    remarks: driver?.remarks ?? "",
                    img_urls: urlsImg ?? [],
                },
                food_reviews: foodReviews,
            };
        }
        if (result) {
            try {
                const isValid = validateReview(result);
                if (!isValid) return;
                setMissingReview({
                    driver: false,
                    dishes: [],
                });
                setOrders({});
                await apiServices.createReview(result);
                router.push(routes.OrderHistory);
            } catch (err) {
                console.log(err);
            }
        }
    };
    useEffect(() => {
        if (reviewForm && !Object.keys(orders).length) {
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
            setOderQuick({ driver: { driver_id: reviewForm.driver_id } });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reviewForm]);

    return {
        handleSubmit,
        handleChangeOrder,
        handleChangeDriver,
        handleOrderQuick,
        setOrders,
        setRemarkQuick,
        orders,
        driver,
        orderQuick,
        remarkQuick,
        reviewForm,
        missingReviews,
    };
};

export default usePostReview;
