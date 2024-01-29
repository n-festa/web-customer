import { getTokenRefresh, setToken, setTokenRefresh } from "@/utils/auth";
import { routes } from "@/utils/routes";
import Router from "next/router";
import apiServices from "./sevices";

export const handleRefreshToken = async (): Promise<string | undefined> => {
    const refresh_token = getTokenRefresh();
    if (refresh_token) {
        const res = await apiServices.requestToken(refresh_token);
        if (res.data) {
            const { access_token, refresh_token } = res.data;
            setToken(access_token);
            setTokenRefresh(refresh_token);

            return Promise.resolve(access_token);
        }
    }
    Router.push(routes.SignIn);
    return;
};
