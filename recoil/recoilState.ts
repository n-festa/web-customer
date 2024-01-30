import apiServices from "@/services/sevices";
import { CartByCustomer } from "@/types/cart";
import { isLoggedIn } from "@/utils/functions";
import { getWebStorage } from "@/utils/sessionStorage";
import { DefaultValue, WrappedValue, atom, selector } from "recoil";
export type SetSelf<T> = (
    param:
        | T
        | DefaultValue
        | Promise<T | DefaultValue>
        | WrappedValue<T>
        | ((param: T | DefaultValue) => T | DefaultValue | WrappedValue<T>),
) => void;

export const cartSelector = selector({
    key: "cartSelector",
    get: async ({}) => {
        if (isLoggedIn()) {
            const { userId } = getWebStorage("userInfo", { userId: undefined });
            if (userId) {
                const res = await apiServices.getCartDetail(userId);
                if (res?.data)
                    return {
                        [userId]: { ...res.data, restaurant_id: res.data.cart_info?.[0]?.restaurant_id },
                    };
            }
        }

        return {
            quickCart: {
                customer_id: "quickCart",
            },
        };
    },
});

export const cartState = atom<CartByCustomer | undefined>({
    key: "cart",
    default: cartSelector,
});

export const showCartState = atom<boolean>({
    key: "cartModal",
    default: false,
});

export const totalQuantityState = selector({
    key: "totalQuantity",
    get: async ({ get }) => {
        const cart = get(cartState);
        const { userId } = getWebStorage("userInfo", { userId: undefined });

        const totalQuantity =
            cart?.[userId ?? "quickCart"]?.cart_info?.reduce?.((prev, cur) => prev + cur.qty_ordered, 0) ?? -1;
        return totalQuantity;
    },
});
