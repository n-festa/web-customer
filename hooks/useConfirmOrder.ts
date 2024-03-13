import { totalQuantityState } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { Discount } from "@/types/interfaces";
import { routes } from "@/utils/routes";
import { FormikProps } from "formik";
import { isUndefined } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWRAPI from "./useApi";
import useUpdateCart from "./useUpdateCart";

const useConfirmOrder = () => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<string>();
    const formRef = useRef<
        FormikProps<{
            province: string | undefined;
            district: string | undefined;
            ward: string | undefined;
            address: string | undefined;
            note: string;
        }>
    >(null);
    const totalItem = useRecoilValue(totalQuantityState);
    const [discounts, setDiscounts] = useState<{ [key: string]: Discount }>({});
    const { totalPrice, cartSync: cart } = useUpdateCart();
    const { GetApplicationFee, GetCutleryFee, GetCouponInfo } = useSWRAPI();
    const [cutleryFee, setCutleryFee] = useState<number>();
    const [addCutlery, setAddCutlery] = useState(false);

    const [applicationFee, setApplicationFee] = useState<number>();

    const { data: applicationFeeData } = GetApplicationFee({ itemTotal: totalPrice, exchangeRate: 1 });
    const { data: cutleryFeeData } = GetCutleryFee(addCutlery, {
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
    const { data: couponList } = GetCouponInfo({ restaurant_id: cart?.restaurant_id, sku_ids: sku_ids });
    useEffect(() => {
        if (cutleryFeeData) {
            setCutleryFee(cutleryFeeData.cutlery_fee);
        }
    }, [cutleryFeeData]);
    useEffect(() => {
        if (applicationFeeData) {
            setApplicationFee(applicationFeeData.application_fee);
        }
    }, [applicationFeeData]);

    const handleConfirm = () => {
        // formRef.current?.submitForm();
        //TODO: orderId
        router.push(routes.OrderDetail + `/${123}`);
    };

    const onApplyCoupon = useCallback(
        (couponInput: string) => {
            apiServices
                .applyCoupon({
                    coupon_code: couponInput,
                    restaurant_id: cart?.restaurant_id,
                    items:
                        cart?.cart_info?.map((item) => ({
                            sku_id: item.sku_id,
                            price_after_discount: item.price_after_discount,
                            packaging_price: item.packaging_info?.price,
                            qty_ordered: item.qty_ordered,
                        })) ?? [],
                })
                .then((res) => {
                    if (!discounts[res.coupon_code]) {
                        setDiscounts((prev) => ({ ...prev, [res.coupon_code]: res }));
                    }
                });
        },
        [cart?.cart_info, cart?.restaurant_id, discounts],
    );

    const totalDiscount = useMemo(() => {
        return Object.values(discounts).reduce((prevValue, item) => prevValue + item.discount_amount, 0);
    }, [discounts]);

    const packageFee = useMemo(() => {
        return cart?.cart_info?.reduce((prevValue, item) => prevValue + (item.packaging_info?.price ?? 0), 0);
    }, [cart?.cart_info]);

    const deliveryFee = 10000;
    const finalPrice = useMemo(() => {
        return totalPrice + (applicationFee ?? 0) + (cutleryFee ?? 0) + (packageFee ?? 0) + deliveryFee - totalDiscount;
    }, [totalPrice, applicationFee, cutleryFee, totalDiscount, packageFee, deliveryFee]);
    return {
        totalPrice,
        formRef,
        handleConfirm,
        paymentMethod,
        setPaymentMethod,
        cart,
        applicationFee,
        cutleryFee,
        setAddCutlery,
        addCutlery,
        couponList,
        totalDiscount,
        packageFee,
        finalPrice,
        deliveryFee,
        onApplyCoupon,
    };
};

export default useConfirmOrder;
