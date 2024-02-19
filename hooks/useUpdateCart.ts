"use client";

import { loginSuccessUrl } from "@/app/providers";
import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import { cartState } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { store } from "@/store";
import { setErrorScreenDes } from "@/store/reducers/appSlice";
import { CartItem } from "@/types/cart";
import { isLoggedIn } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { cloneDeep, debounce } from "lodash";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";

const useUpdateCart = () => {
    const [loading, setLoading] = useState(false);
    const [currentCart, setCart] = useRecoilState(cartState);
    const handleUpdateCart = useCallback(
        async (cartItem: CartItem) => {
            if (cartItem.qty_ordered <= 0) return;
            if (!isLoggedIn() && typeof window != "undefined") {
                loginSuccessUrl.current = window.location.pathname;
                store.dispatch(setErrorScreenDes(routes.SignIn));
                return;
            }
            let cartInfo = cloneDeep(currentCart?.cart_info ?? []);
            if (cartItem?.restaurant_id != currentCart?.restaurant_id && currentCart?.restaurant_id != undefined) {
                //Show Dialog Clear Current Cart
                const result = await dialogRef.current?.show({
                    title: "Bạn muốn đặt món ở nhà hàng này?",
                    message: "Chuyện nhỏ! Nhưng những món bạn đã chọn từ nhà hàng trước sẽ bị xóa khỏi giỏ hàng nhé!",
                    positive: {
                        onClick: async () => {
                            cartInfo = [];
                        },
                    },
                });
                if (!result || !cartItem.customer_id) return;
                await apiServices.deleteWholdCart({ customerId: cartItem.customer_id });
            }

            const newCart = {
                ...currentCart,
                cart_info: cartInfo,
                restaurant_id: cartItem.restaurant_id,
                cartUpdate: cartItem,
            };
            setCart(newCart);
        },
        [currentCart, setCart],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleQuickAdd = useCallback(
        debounce(
            async (id?: number) => {
                if (!isLoggedIn()) {
                    loginSuccessUrl.current = window.location.pathname;
                    store.dispatch(setErrorScreenDes(routes.SignIn));
                }
                if (!id || !currentCart?.customer_id) return;
                setLoading(true);
                const res = await apiServices.quickAddCart({
                    customer_id: Number(currentCart?.customer_id),
                    menu_item_id: id,
                });
                if (res.data) {
                    setCart((prev) => ({ ...prev, ...res.data, cartUpdate: undefined }));
                    setLoading(false);
                }
            },
            1000,
            { leading: true },
        ),
        [],
    );
    return { cart: currentCart, handleUpdateCart, handleQuickAdd, loading };
};

export default useUpdateCart;
