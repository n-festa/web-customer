import config from "@/config";
import { store } from "@/store";
import { clearKeepAddress } from "@/store/reducers/userInfo";
import Cookies from "js-cookie";

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
    Cookies.set(cookieConfig.auth_token_key, token, { expires });
}

function removeToken(): void {
    Cookies.remove(cookieConfig.auth_token_key);
}
// Refresh token
function getTokenRefresh(): string | undefined {
    return Cookies.get(cookieConfig.auth_refresh_token);
}

function setTokenRefresh(token: string, expires = 1): void {
    Cookies.set(cookieConfig.auth_refresh_token, token, { expires });
}

function removeTokenRefresh(): void {
    Cookies.remove(cookieConfig.auth_refresh_token);
}

const logout = () => {
    removeToken();
    removeTokenRefresh();
    store.dispatch(clearKeepAddress());
};

export { getToken, getTokenRefresh, logout, removeToken, removeTokenRefresh, setToken, setTokenRefresh };
