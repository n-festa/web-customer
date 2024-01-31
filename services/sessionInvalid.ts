"use client";
import { store } from "@/store";
import { setErrorScreenDes } from "@/store/reducers/appSlice";
import { setUserInfo } from "@/store/reducers/userInfo";
import { getTokenRefresh, removeToken, setToken, setTokenRefresh } from "@/utils/auth";
import { routes } from "@/utils/routes";
import apiServices from "./sevices";

export const handleRefreshToken = async (errDest?: string): Promise<string | undefined> => {
    const refresh_token = getTokenRefresh();
    if (refresh_token) {
        const res = await apiServices.requestToken(refresh_token);
        if (res?.data) {
            const { access_token, refresh_token } = res.data;
            setToken(access_token);
            setTokenRefresh(refresh_token);

            return Promise.resolve(access_token);
        }
    }
    store.dispatch(setUserInfo(undefined));
    removeToken();

    if (typeof window !== "undefined") {
        store.dispatch(setErrorScreenDes(errDest ?? routes.SignIn));
    }
    return;
};
