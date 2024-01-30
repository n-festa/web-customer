import { loadState, removeState } from "@/utils/localstorage";
import { DefaultValue } from "recoil";
import { SetSelf } from "./recoilState";

export const localStorageEffect =
    <T>(key: string) =>
    ({
        setSelf,
        onSet,
    }: {
        setSelf: SetSelf<T>;
        onSet: (param: (newValue: T, oldValue: T | DefaultValue, isReset: boolean) => void) => void;
    }) => {
        const savedValue = loadState(key);
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        }

        onSet((newValue, _, isReset) => {
            isReset ? removeState(key) : localStorage.setItem(key, JSON.stringify(newValue));
        });
    };
