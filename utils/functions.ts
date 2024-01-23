import { locationRef } from "@/app/providers";

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

export const createQueryString = (queries: { name: string; value: string }[]) => {
    const params = new URLSearchParams();
    queries.forEach((el) => {
        params.set(el.name, el.value);
    });

    return params.toString();
};
