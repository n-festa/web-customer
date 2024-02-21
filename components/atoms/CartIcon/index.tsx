"use client";
import { totalQuantityState } from "@/recoil/recoilState";
import { useRecoilValue } from "recoil";
import CartIconFallBack from "./CartIconFallback";

const CartIcon = () => {
    const totalQuantity = useRecoilValue(totalQuantityState);

    return <CartIconFallBack totalQuantity={totalQuantity} />;
};

export default CartIcon;
