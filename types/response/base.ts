export interface BaseNameInterface {
    ISO_language_code: string;
    text: string;
}

export interface CookingSchedule {
    dayId: number;
    dayName: string;
    from: string;
    to: string;
    isAvailable: boolean;
}

export interface GeoCode {
    lng: string | number;
    lat: string | number;
}
