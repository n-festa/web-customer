import apiServices from "@/services/sevices";
import { store } from "@/store";
import { Cart } from "@/types/cart";
import { isLoggedIn } from "@/utils/functions";
import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

import { DefaultValue, WrappedValue, atom, selector } from "recoil";
export type SetSelf<T> = (
    param:
        | T
        | DefaultValue
        | Promise<T | DefaultValue>
        | WrappedValue<T>
        | ((param: T | DefaultValue) => T | DefaultValue | WrappedValue<T>),
) => void;

//Use for get cart default
export const cartApiState = selector({
    key: "cartApiSelector",
    get: async () => {
        if (isLoggedIn()) {
            const { customer_id: userId } = store.getState().userInfo.userInfo ?? {};
            if (userId) {
                const errDest = window.location.pathname;
                try {
                    const res = await apiServices.getCartDetail(`${userId}`, errDest);
                    if (res?.data) {
                        return {
                            ...res.data,
                            restaurant_id: res.data.restaurant_id ?? res.data.cart_info?.[0]?.restaurant_id,
                        };
                    }
                } catch {}
            }
        }

        return;
    },
});

export const cartState = atom<Cart | undefined>({
    key: "cart",
    default: cartApiState,
});

export const showCartState = atom<boolean>({
    key: "cartModal",
    default: false,
});
export const cartSynced = selector({
    key: "cartSynced",
    get: async ({ get }) => {
        const { cartUpdate: cartItem, ...currentCart } = get(cartState) ?? {};
        if (cartItem) {
            try {
                const res = await apiServices.addCart({ ...cartItem, item_id: undefined });
                toast({
                    title: "Cập nhật giỏ hàng",
                    description: `Đã thêm vào giỏ hàng`,
                    status: "success",
                    duration: 4000,
                    position: "top",
                    isClosable: true,
                });
                if (res?.data) {
                    return res.data;
                }
            } catch (err) {
                const message: string | undefined = (err as any)?.error.response?.data?.message;

                toast({
                    title: "Cập nhật giỏ hàng",
                    description: `Cập nhật giỏ hàng thất bại\r\n${message ? message : ""}`,
                    status: "error",
                    duration: 4000,
                    position: "top",
                    isClosable: true,
                });
                return currentCart;
            }
        }
        return currentCart;
    },
});

export const totalQuantityState = selector({
    key: "totalQuantity",
    get: async ({ get }) => {
        const cart = get(cartSynced);

        const totalQuantity = cart?.cart_info?.reduce?.((prev, cur) => prev + cur.qty_ordered, 0) ?? -1;
        return totalQuantity;
    },
});
