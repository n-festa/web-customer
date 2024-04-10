"use client";

import { showCartState } from "@/recoil/recoilState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setErrorScreenDes } from "@/store/reducers/appSlice";
import { setDomain, setNavigationState } from "@/store/reducers/navigationSlice";
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

    //Get domain
    useEffect(() => {
        const domain = window ? window.location.hostname.replace("www.", "") : undefined;
        dispatch(setDomain(domain));
    }, [dispatch]);

    useEffect(() => {
        if (errorScreenDes) {
            const route = errorScreenDes;
            dispatch(setErrorScreenDes(null));
            router.push(route);
        }
    }, [dispatch, errorScreenDes, router, searchParams]);

    //Update navigation state
    useEffect(() => {
        dispatch(setNavigationState(pathName));
        setShow(false);
    }, [dispatch, pathName, setShow]);

    return null;
}
