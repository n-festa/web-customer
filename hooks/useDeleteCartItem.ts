import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import { cartState } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

const useDeleteCartItem = () => {
    const setCart = useSetRecoilState(cartState);
    const handleDeleteCartItem = useCallback(
        async (id: number, customer_id: string | number) => {
            await dialogRef.current?.show({
                title: "Xóa khỏi giỏ hàng",
                message: "Bạn muốn xóa món ăn khỏi giỏ hàng?",
                negative: { text: "Hủy" },
                positive: {
                    text: "Xác nhận",
                    onClick: async () => {
                        const res = await apiServices.deleteCartItem({ customer_id: customer_id, cart_items: [id] });
                        if (res.data) setCart(res.data);
                    },
                },
            });
        },
        [setCart],
    );
    const handleDeleteWholeCart = useCallback(
        async (customer_id?: string | number) => {
            if (!customer_id) return;
            await apiServices.deleteWholdCart({ customerId: customer_id });
            setCart(undefined);
        },
        [setCart],
    );
    return { handleDeleteCartItem, handleDeleteWholeCart };
};

export default useDeleteCartItem;
