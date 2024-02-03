import { locationRef, loginSuccessUrl } from "@/app/providers";
import { CartItem } from "@/types/cart";
import { formatDate } from "@/utils/date";
import { isBefore } from "date-fns/isBefore";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getToken } from "./auth";
import { routes } from "./routes";

/// Client side only
export const requestGEOPermission = () => {
    if (navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                locationRef.current = { lng: position.coords.longitude, lat: position.coords.latitude };
            },
            (e) => {
                console.error("Request GEO Failed", e);
                locationRef.current = null;
            },
        );
    }
};

export const isTimeDiffMoreThan30Min = (afterCurrent: number) => {
    const currentTime = new Date().getTime();
    afterCurrent < currentTime ? currentTime : afterCurrent;
    const timeDifferenceInMinutes = (afterCurrent - currentTime) / (1000 * 60);
    const beingLocked = timeDifferenceInMinutes > 0;
    return { beingLocked, timeDifferenceInMinutes };
};

export const convertToInternationalFormat = (phoneNumber: string): string => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const phoneSubmit = `84${phoneNumber}`;
    if (phoneSubmit.match(regexPhoneNumber)) {
        return `84${phoneNumber.slice(1)}`;
    }
    return phoneSubmit;
};

export const createQueryString = (queries: { name: string; value: string }[]) => {
    const params = new URLSearchParams();
    queries.forEach((el) => {
        params.set(el.name, el.value);
    });

    return params.toString();
};

export const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        return true;
    }
    return false;
};

export const formatMoney = (input?: string | number) => {
    if (input === undefined) return "-";
    return `${input.toLocaleString()} đ`;
};

export const getCutoffTime = (cutoffTime?: string | string[]) => {
    if (!cutoffTime) return;
    if (typeof cutoffTime === "string") {
        const split = cutoffTime.split(":");
        if (split.length > 1) {
            return `${split[0]}:${split[1]}`;
        }
        return;
    }

    const _cutoffTime = cutoffTime ?? [];
    let date: Date | null = null;
    if (_cutoffTime.length > 0) {
        const currentData = new Date();

        _cutoffTime.forEach((el) => {
            const dateString = formatDate(new Date());
            if (!isNullOrEmpty(el) && date == null) {
                const _itemDate = new Date(`${dateString} ${el}`);
                if (isBefore(currentData, _itemDate)) {
                    date = _itemDate;
                }
            }
        });
    }
    if (date) {
        return formatDate(date, "HH:mm aa");
    }
    return;
};

export const redirectAfterLogin = (router: AppRouterInstance) => {
    const destination = loginSuccessUrl.current ?? routes.Home;
    loginSuccessUrl.current = null;
    router.push(destination);
};

export const genCartNote = (cartItem: CartItem) => {
    const mapString = [];
    cartItem.portion_customization && mapString.push(cartItem.portion_customization);
    cartItem.advanced_taste_customization && mapString.push(cartItem.advanced_taste_customization);
    cartItem.basic_taste_customization && mapString.push(cartItem.basic_taste_customization);
    cartItem.notes && mapString.push(cartItem.notes);
    //<portion> - <advanced> - <basic> - <note>
    return mapString.join(" - ");
};

export const isNullOrEmpty = (value?: number | string | Date | null): value is null | undefined => {
    return (value ?? "") === "";
};
