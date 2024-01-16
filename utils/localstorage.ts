export const loadState = (key: any) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (key: any, value: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {}
};

export const removeState = (key: any) => {
    try {
        localStorage.removeItem(key);
    } catch (err) {}
};
