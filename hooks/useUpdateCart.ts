"use client";

import { loginSuccessUrl } from "@/app/[locale]/providers";
import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import { cartState, cartSynced } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { store } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { setErrorScreenDes } from "@/store/reducers/appSlice";
import { CartItem } from "@/types/cart";
import { isLoggedIn } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { createStandaloneToast } from "@chakra-ui/react";
import { cloneDeep, debounce } from "lodash";
import { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
const { toast } = createStandaloneToast();

const useUpdateCart = () => {
    const [loading, setLoading] = useState(false);
    const [currentCart, setCart] = useRecoilState(cartState);
    const cartSync = useRecoilValue(cartSynced);

    const customerId = useAppSelector((state) => state.userInfo.userInfo?.customer_id);
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
            async (id?: number, name?: string) => {
                if (!isLoggedIn()) {
                    loginSuccessUrl.current = window.location.pathname;
                    store.dispatch(setErrorScreenDes(routes.SignIn));
                }
                const _customerId = currentCart?.customer_id || customerId;
                if (!id || !_customerId) return;
                setLoading(true);
                await apiServices
                    .quickAddCart({
                        customer_id: Number(_customerId),
                        menu_item_id: id,
                    })
                    .then((res) => {
                        if (res.data) {
                            setCart((prev) => ({ ...prev, ...res.data, cartUpdate: undefined }));
                            toast({
                                title: "Cập nhật giỏ hàng",
                                description: `Đã thêm ${name} vào giỏ hàng`,
                                status: "success",
                                duration: 4000,
                                position: "top",
                                isClosable: true,
                            });
                        }
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            },
            1000,
            { leading: true },
        ),
        [],
    );
    return { cart: currentCart, cartSync, handleUpdateCart, handleQuickAdd, loading };
};

export default useUpdateCart;
