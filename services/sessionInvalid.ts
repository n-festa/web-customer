import { store } from "@/store";
import { setAccessToken, setRefreshToken, setUserInfo } from "@/store/reducers/auth";
import { getTokenRefresh, setToken, setTokenRefresh } from "@/utils/auth";
import { routes } from "@/utils/routes";
import Router from "next/router";
import apiServices from "./sevices";

export const handleRefreshToken = async () => {
    const refresh_token = getTokenRefresh();
    if (refresh_token) {
        const res = await apiServices.requestToken(refresh_token);
        if (res.data) {
            const { access_token, userType, userId, userName, permissions, refresh_token } = res.data;
            setToken(access_token);
            setTokenRefresh(refresh_token);
            setUserInfo({
                userType,
                userId,
                userName,
                permissions,
            });
            store.dispatch(setAccessToken(access_token));
            store.dispatch(setRefreshToken(refresh_token));
        }
        return;
    }
    Router.push(routes.SignIn);
};
