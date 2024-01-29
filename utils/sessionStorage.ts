export const getWebStorage = <T = any>(key: string, fallbackValue = {}): T => {
    if (typeof sessionStorage === "undefined") {
        return fallbackValue as T;
    }
    const data = sessionStorage.getItem(key);
    try {
        return (JSON.parse(data as string) || fallbackValue) as T;
    } catch (e) {
        return (data || fallbackValue) as T;
    }
};

export const setWebStorage = <T>(key: string, value?: string | object | number | T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeWebStorage = (key: string) => {
    sessionStorage.removeItem(key);
};
