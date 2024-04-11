import config from "@/config";
import { store } from "@/store";
import { setErrorScreenDes } from "@/store/reducers/appSlice";
import { clearKeepAddress } from "@/store/reducers/userInfo";
import Cookies from "js-cookie";
import { routes } from "./routes";

interface CookieConfig {
    auth_token_key: string;
    auth_refresh_token: string;
}

const { cookieConfig }: { cookieConfig: CookieConfig } = config;

// Access token
function getToken(): string | undefined {
    return Cookies.get(cookieConfig.auth_token_key);
}

function setToken(token: string, expires = 1): void {
    const domain = store.getState().navigation.domain;
    console.log("domain", domain);
    Cookies.set(cookieConfig.auth_token_key, token, { expires, domain: domain });
}

function removeToken(): void {
    const domain = store.getState().navigation.domain;
    console.log("remove domain", domain);
    Cookies.remove(cookieConfig.auth_token_key, { domain: domain });
}
// Refresh token
function getTokenRefresh(): string | undefined {
    return Cookies.get(cookieConfig.auth_refresh_token);
}

function setTokenRefresh(token: string, expires = 1): void {
    const domain = store.getState().navigation.domain;
    Cookies.set(cookieConfig.auth_refresh_token, token, { expires, domain: domain });
}

function removeTokenRefresh(): void {
    const domain = store.getState().navigation.domain;
    Cookies.remove(cookieConfig.auth_refresh_token, { domain });
}

const logout = (pathname: string) => {
    removeToken();
    removeTokenRefresh();
    store.dispatch(clearKeepAddress());
    if (pathname.includes("/order") || pathname.includes(routes.Profile)) {
        store.dispatch(setErrorScreenDes(routes.Home));
    }
};

export { getToken, getTokenRefresh, logout, removeToken, removeTokenRefresh, setToken, setTokenRefresh };
