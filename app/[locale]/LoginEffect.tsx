"use client";
import { cartState } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { useAppSelector } from "@/store/hooks";
import { setUserInfo } from "@/store/reducers/userInfo";
import { getAuthId, logout } from "@/utils/auth";
import { isLoggedIn } from "@/utils/functions";
import { saveState } from "@/utils/localstorage";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRecoilState } from "recoil";

const LoginEffect = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();

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
    const getUserInfo = useCallback(async () => {
        const userId = getAuthId();
        if (!userId) {
            logout(pathname);
            return;
        }
        const { data: customerData } = await apiServices.customerProfile({ userId: Number(userId) });
        saveState("infoSign", { userId });
        dispatch(setUserInfo(customerData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (customerId && cart?.customer_id != customerId && isLoggedIn()) {
            getCart(customerId.toString());
        }
        if (!customerId) {
            setCart({});
            if (isLoggedIn()) {
                getUserInfo();
            }
        }
    }, [cart?.customer_id, customerId, getCart, getUserInfo, setCart]);

    return null;
};

export default LoginEffect;
