import { locationRef } from "@/app/providers";
import { getToken } from "./auth";

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
    if (!phoneNumber.startsWith("84")) {
        return `84${phoneNumber.slice(1)}`;
    }
    return phoneNumber;
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

export const getCutoffTime = (cutoffTime?: string) => {
    if (cutoffTime) {
        const split = cutoffTime.split(":");
        if (split.length > 1) {
            return `${split[0]}:${split[1]}`;
        }
        return "-";
    }
    return "-";
};
