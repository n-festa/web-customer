import { totalQuantityState } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { PaymentMethod } from "@/types/enum";
import { Discount } from "@/types/interfaces";
import { parseStringToObj } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { useToast } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { isUndefined } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWRAPI from "./useApi";
import useDeleteCartItem from "./useDeleteCartItem";
import useUpdateCart from "./useUpdateCart";

const useConfirmOrder = () => {
    const { GetApplicationFee, GetCutleryFee, GetCouponInfo } = useSWRAPI();
    const formRef = useRef<
        FormikProps<{
            province: string | undefined;
            district: string | undefined;
            ward: string | undefined;
            address: string | undefined;
            note: string;
            lng: number | undefined;
            lat: number | undefined;
        }>
    >(null);
    const toast = useToast();
    const router = useRouter();
    const totalItem = useRecoilValue(totalQuantityState);
    const { totalPrice, cartSync: cart } = useUpdateCart();
    const [isLoading, setLoading] = useState<boolean>();
    const { handleDeleteWholeCart } = useDeleteCartItem();
    const [paymentMethod, setPaymentMethod] = useState<string>();
    const [discounts, setDiscounts] = useState<Discount>();
    const [cutleryFee, setCutleryFee] = useState<number>();
    const [addCutlery, setAddCutlery] = useState(false);
    const [applicationFee, setApplicationFee] = useState<number>();
    const [deliveryFee, setDeliveryFee] = useState<{ distance?: number; deliveryFee?: number }>();
    const [expectedTime, setExpectedTime] = useState<{ from: number; to: number }>();
    const { data: applicationFeeData, isLoading: loadingAppFee } = GetApplicationFee({
        itemTotal: totalPrice,
        exchangeRate: 1,
    });
    const { data: cutleryFeeData, isLoading: loadingCutlery } = GetCutleryFee(addCutlery, {
        restaurant_id: cart?.restaurant_id,
        item_quantity: totalItem,
    });

    const sku_ids = useMemo(() => {
        const skuIds: number[] = [];
        cart?.cart_info?.forEach((item) => {
            if (!isUndefined(item.sku_id) && !skuIds.includes(item.sku_id)) {
                skuIds.push(item.sku_id);
            }
        });
        return skuIds;
    }, [cart?.cart_info]);
    const { data: couponList, isLoading: loadingCoupon } = GetCouponInfo({
        restaurant_id: cart?.restaurant_id,
        sku_ids: sku_ids,
    });
    useEffect(() => {
        if (cutleryFeeData) {
            setCutleryFee(cutleryFeeData.cutlery_fee);
        }
    }, [cutleryFeeData]);
    useEffect(() => {
        if (applicationFeeData) {
            setApplicationFee(applicationFeeData.application_fee);
        }
    }, [applicationFeeData, cart?.cart_info?.length]);

    const handleConfirm = async () => {
        setLoading(true);
        const addressValues = formRef.current?.values;
        const orderItems = cart?.cart_info?.map((item) => ({
            sku_id: item.sku_id,
            qty_ordered: item.qty_ordered,
            advanced_taste_customization_obj: parseStringToObj(item.advanced_taste_customization_obj) ?? [],
            basic_taste_customization_obj: parseStringToObj(item.basic_taste_customization_obj) ?? [],
            notes: item.notes,
            packaging_id: item.packaging_info?.packaging_id,
        }));

        try {
            if (cart?.customer_id && cart?.restaurant_id && addressValues) {
                const orderRes = await apiServices.createOrder({
                    customer_id: Number(cart?.customer_id),
                    restaurant_id: Number(cart.restaurant_id),
                    address: {
                        address_line: addressValues?.address,
                        ward: addressValues?.ward,
                        district: addressValues?.district,
                        city: addressValues?.province,
                        latitude: addressValues?.lat,
                        country: "Vietnam",
                        longitude: addressValues?.lng,
                    },
                    order_total: finalPrice,
                    delivery_fee: deliveryFee?.deliveryFee ?? 0,
                    packaging_fee: packageFee ?? 0,
                    cutlery_fee: addCutlery ? cutleryFee : undefined,
                    app_fee: applicationFee ?? 0,
                    coupon_value: discounts?.discount_amount ?? 0,
                    coupon_code: discounts?.coupon_code ?? "",
                    payment_method_id: Number(paymentMethod),
                    expected_arrival_time: expectedTime?.from,
                    driver_note: addressValues.note,
                    order_items: orderItems ?? [],
                });
                if (orderRes.order_id) {
                    if (Number(paymentMethod) === PaymentMethod.COD) {
                        await handleDeleteWholeCart(cart.customer_id);
                        setLoading(false);
                        router.push(routes.OrderDetail + `/${orderRes.order_id}`);
                        return;
                    }
                    if (orderRes.invoice_id && Number(paymentMethod) === PaymentMethod.Momo) {
                        const momoRes = await apiServices.momo(orderRes.invoice_id);
                        await handleDeleteWholeCart(cart.customer_id);
                        setLoading(false);
                        router.push(momoRes.payUrl);
                        return;
                    }
                }
            }
        } catch {
            setLoading(false);
            toast({
                title: "Đặt hàng",
                description: `Đặt hàng thất bại`,
                status: "error",
                duration: 4000,
                position: "top-right",
                isClosable: true,
            });
        }
    };

    const isDisableOrder = useMemo(() => {
        return !expectedTime || loadingCoupon || loadingAppFee || loadingCutlery || !deliveryFee;
    }, [deliveryFee, expectedTime, loadingAppFee, loadingCoupon, loadingCutlery]);

    const onApplyCoupon = useCallback(
        async (couponInput: string) => {
            const res = await apiServices.applyCoupon({
                coupon_code: couponInput,
                restaurant_id: cart?.restaurant_id,
                items:
                    cart?.cart_info?.map((item) => ({
                        sku_id: item.sku_id,
                        price_after_discount: item.price_after_discount,
                        packaging_price: item.packaging_info?.price,
                        qty_ordered: item.qty_ordered,
                    })) ?? [],
            });
            if (res) setDiscounts(res);
            return true;
        },
        [cart?.cart_info, cart?.restaurant_id],
    );

    const packageFee = useMemo(() => {
        return cart?.cart_info?.reduce(
            (prevValue, item) => prevValue + (item.packaging_info?.price ?? 0) * item.qty_ordered,
            0,
        );
    }, [cart?.cart_info]);

    const finalPrice = useMemo(() => {
        return (
            totalPrice +
            (applicationFee ?? 0) +
            (addCutlery ? cutleryFee ?? 0 : 0) +
            (packageFee ?? 0) +
            (deliveryFee?.deliveryFee ?? 0) -
            (discounts?.discount_amount ?? 0)
        );
    }, [
        totalPrice,
        applicationFee,
        addCutlery,
        cutleryFee,
        packageFee,
        deliveryFee?.deliveryFee,
        discounts?.discount_amount,
    ]);
    return {
        totalPrice,
        formRef,
        handleConfirm,
        paymentMethod,
        setPaymentMethod,
        cart,
        applicationFee: cart?.cart_info?.length ? applicationFee : 0,
        cutleryFee,
        setAddCutlery,
        addCutlery,
        couponList,
        totalDiscount: discounts?.discount_amount,
        packageFee,
        finalPrice: cart?.cart_info?.length ? finalPrice : 0,
        deliveryFee: cart?.cart_info?.length ? deliveryFee : undefined,
        isLoading,
        isDisableOrder,
        setDeliveryFee,
        onApplyCoupon,
        setExpectedTime,
    };
};

export default useConfirmOrder;
