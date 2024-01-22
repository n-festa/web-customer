import Cookies from "js-cookie";
import config from "@/config";

interface CookieConfig {
    auth_token_key: string;
}

const { cookieConfig }: { cookieConfig: CookieConfig } = config;

function getToken(): string | undefined {
    return Cookies.get(cookieConfig.auth_token_key);
}

function setToken(token: string, expires = 1): void {
    Cookies.set(cookieConfig.auth_token_key, token, { expires });
}

function removeToken(): void {
    Cookies.remove(cookieConfig.auth_token_key);
}

export { getToken, setToken, removeToken };
