"use client";

import { showCartState } from "@/recoil/recoilState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setErrorScreenDes } from "@/store/reducers/appSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export function NavigationEvents() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const { errorScreenDes } = useAppSelector((state) => state.app);
    const [, setShow] = useRecoilState(showCartState);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (errorScreenDes) {
            router.push(errorScreenDes);
            dispatch(setErrorScreenDes(null));
        }
    }, [dispatch, errorScreenDes, router, searchParams]);

    useEffect(() => {
        setShow(false);
    }, [pathName, setShow]);

    return null;
}
