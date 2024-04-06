import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import { cartState } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

const useDeleteCartItem = () => {
    const setCart = useSetRecoilState(cartState);
    const t = useTranslations("COMMON.CART");
    const handleDeleteCartItem = useCallback(
        async (id: number, customer_id: string | number) => {
            await dialogRef.current?.show({
                title: t("REMOVE_CART"),
                message: t("CONFIRM_REMOVE"),
                negative: { text: t("CANCEL") },
                positive: {
                    text: t("CONFIRM"),
                    onClick: async () => {
                        const res = await apiServices.deleteCartItem({ customer_id: customer_id, cart_items: [id] });
                        if (res.data) setCart(res.data);
                    },
                },
            });
        },
        [setCart, t],
    );
    const handleDeleteWholeCart = useCallback(
        async (customer_id?: string | number) => {
            if (!customer_id) return;
            await apiServices.deleteWholdCart({ customerId: customer_id });
            setCart(undefined);
        },
        [setCart],
    );
    return { handleDeleteCartItem, handleDeleteWholeCart, cartTranslate: t };
};

export default useDeleteCartItem;
