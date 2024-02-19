"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setErrorScreenDes } from "@/store/reducers/appSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function NavigationEvents() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { errorScreenDes } = useAppSelector((state) => state.app);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (errorScreenDes) {
            router.push(errorScreenDes);
            dispatch(setErrorScreenDes(null));
        }
    }, [dispatch, errorScreenDes, router, searchParams]);

    return null;
}
