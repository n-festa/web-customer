import { errorReOrder } from "@/components/pages/order/history/HistoryList";
import apiServices from "@/services/sevices";
import { store } from "@/store";
import { Cart } from "@/types/cart";
import { getLocale, isLoggedIn } from "@/utils/functions";
import { createStandaloneToast } from "@chakra-ui/react";
import { createTranslator } from "use-intl";
import messagesEn from "../messages/en.json";
import messagesVi from "../messages/vi.json";

const { toast } = createStandaloneToast();
const tEn = createTranslator({ locale: "en", messages: messagesEn });
const tVi = createTranslator({ locale: "en", messages: messagesVi });

import { loadState } from "@/utils/localstorage";
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
                try {
                    const res = await apiServices.getCartDetail(`${userId}`);

                    if (res?.data) {
                        return {
                            ...res.data,
                            restaurant_id: res.data.restaurant_id || res.data.cart_info?.[0]?.restaurant_id,
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
        const t = getLocale() == "en" ? tEn : tVi;
        const { cartUpdate: cartItem, ...currentCart } = get(cartState) ?? {};
        if (cartItem) {
            try {
                const { userId } = loadState("infoSign");
                const res = await apiServices.addCart({
                    ...cartItem,
                    item_id: undefined,
                    customer_id: cartItem.customer_id == -1 ? userId : cartItem.customer_id ?? userId,
                });
                !cartItem.isUpdateAll &&
                    toast({
                        id: `update_success_${cartItem.item_id}`,
                        title: t("COMMON.CART.UPDATE_CART"),
                        description: t("COMMON.CART.ADD_TO_CART_SUCCESS"),
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

                if (cartItem.isUpdateAll) {
                    errorReOrder.current = message ?? "error";
                    toast({
                        title: t("COMMON.CART.REORDER"),
                        description: t("COMMON.CART.FAILED_REORDER"),
                        status: "error",
                        duration: 4000,
                        position: "top",
                        isClosable: true,
                    });
                    return currentCart;
                }
                toast({
                    title: t("COMMON.CART.UPDATE_CART"),
                    description: t("COMMON.CART.FAILED_UPDATE", { message: message ?? "" }),
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
