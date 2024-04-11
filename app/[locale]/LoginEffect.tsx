"use client";
import { cartState } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { useAppSelector } from "@/store/hooks";
import { isLoggedIn } from "@/utils/functions";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

const LoginEffect = () => {
    const customerId = useAppSelector((state) => state.userInfo.userInfo?.customer_id);
    const [cart, setCart] = useRecoilState(cartState);
    const getCart = useCallback(
        async (userId: string) => {
            const res = await apiServices.getCartDetail(`${userId}`);
            if (res?.data) {
                setCart({
                    ...res.data,
                    restaurant_id: res.data.restaurant_id || res.data.cart_info?.[0]?.restaurant_id,
                });
            }
        },
        [setCart],
    );
    useEffect(() => {
        if (customerId && cart?.customer_id != customerId && isLoggedIn()) {
            getCart(customerId.toString());
        }
        if (!customerId) {
            setCart({});
        }
    }, [cart?.customer_id, customerId, getCart, setCart]);
    return null;
};

export default LoginEffect;
