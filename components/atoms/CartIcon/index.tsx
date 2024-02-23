"use client";
import { totalQuantityState } from "@/recoil/recoilState";
import { useRecoilValueLoadable } from "recoil";
import CartIconFallBack from "./CartIconFallback";

const CartIcon = () => {
    const totalQuantityLoadable = useRecoilValueLoadable(totalQuantityState);
    const isLoading = totalQuantityLoadable.state === "loading";
    return <CartIconFallBack isLoading={isLoading} totalQuantity={totalQuantityLoadable.valueMaybe()} />;
};

export default CartIcon;
