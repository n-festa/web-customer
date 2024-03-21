"use client";
import { store } from "@/store";
import { setErrorScreenDes } from "@/store/reducers/appSlice";
import { setUserInfo } from "@/store/reducers/userInfo";
import { getTokenRefresh, removeToken, removeTokenRefresh, setToken, setTokenRefresh } from "@/utils/auth";
import { routes } from "@/utils/routes";
import apiServices from "./sevices";
let isHandleRefreshToken = false;

export const handleRefreshToken = async (errDest?: string): Promise<string | undefined> => {
    if (isHandleRefreshToken) return;
    removeToken();
    const refresh_token = getTokenRefresh();

    if (refresh_token) {
        isHandleRefreshToken = true;
        const res = await apiServices.requestToken(refresh_token);
        if (res?.data) {
            const { access_token, refresh_token } = res.data;
            setToken(access_token);
            console.log("TEETSTS", refresh_token);
            setTokenRefresh(refresh_token);

            return Promise.resolve(access_token);
        }
        isHandleRefreshToken = false;
    }
    store.dispatch(setUserInfo(undefined));
    removeTokenRefresh();

    if (typeof window !== "undefined") {
        store.dispatch(setErrorScreenDes(errDest ?? routes.SignIn));
    }
    return;
};
