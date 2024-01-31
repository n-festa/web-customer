import apiServices from "@/services/sevices";
import { store } from "@/store";
import { Cart } from "@/types/cart";
import { isLoggedIn } from "@/utils/functions";

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

                const res = await apiServices.getCartDetail(`${userId}`, errDest);
                if (res?.data) {
                    return {
                        ...res.data,
                        restaurant_id: res.data.restaurant_id ?? res.data.cart_info?.[0].restaurant_id,
                    };
                }
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
            const res = await apiServices.addCart({ ...cartItem, item_id: undefined });
            return res.data;
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
