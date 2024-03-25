"use client";
import { loginSuccessUrl } from "@/app/[locale]/providers";
import { store } from "@/store";
import { setErrorScreenDes } from "@/store/reducers/appSlice";
import { setUserInfo } from "@/store/reducers/userInfo";
import { getToken, getTokenRefresh, removeToken, removeTokenRefresh, setToken, setTokenRefresh } from "@/utils/auth";
import { routes } from "@/utils/routes";
import apiServices from "./sevices";
let isHandleRefreshToken = false;

const checkAccessToken = async (count = 0) => {
    const currentTask: Promise<string | undefined> = new Promise((resolve) => {
        setTimeout(async () => {
            const access_token = getToken();
            if (!access_token && count < 5) {
                return resolve(await checkAccessToken(count + 1));
            }
            return resolve(access_token);
        }, 500);
    });
    return await currentTask;
};

export const handleRefreshToken = async (errDest?: string): Promise<string | undefined> => {
    if (isHandleRefreshToken) {
        const token = await checkAccessToken();
        if (token) return Promise.resolve(token);
        return;
    }
    removeToken();
    const refresh_token = getTokenRefresh();

    if (refresh_token) {
        isHandleRefreshToken = true;
        const res = await apiServices.requestToken(refresh_token);
        if (res?.data) {
            const { access_token, refresh_token } = res.data;
            setToken(access_token);
            setTokenRefresh(refresh_token);

            return Promise.resolve(access_token);
        }
        isHandleRefreshToken = false;
    }
    store.dispatch(setUserInfo(undefined));
    removeTokenRefresh();

    if (typeof window !== "undefined") {
        loginSuccessUrl.current = window.location.pathname;
        store.dispatch(setErrorScreenDes(errDest ?? routes.SignIn));
    }
    return;
};
