import { FoodOtherFilterOptionsKeys } from "@/types/enum";

export const FoodOtherFilterOptions = (t: any) => [
    { key: FoodOtherFilterOptionsKeys.GT4Star, name: t("COMMON.STARS") },
    { key: FoodOtherFilterOptionsKeys.Vegetarian, name: t("COMMON.VEG") },
    { key: FoodOtherFilterOptionsKeys.LT500Kcal, name: "< 500 Kcal" },
];

export const storageKeys = {
    userProfile: "userProfile",
};

export const RestaurantOtherFilterOptions = [{ key: FoodOtherFilterOptionsKeys.GT4Star, name: "> 4 Sao" }];

export const DefaultTasteOption = "7";
export const DefaultOtherOption = false;
export const PortionCustomization = "PortionCustomization";
export const TasteCustomization = "TasteCustomization";
export const OtherCustomization = "OtherCustomization";

// date

export const YYYYMMDD = "yyyy-MM-dd";
export const YYYYMMDDHHmm = "yyyy-MM-dd HH:mm";
export const HHmm = "HH:mm";
export const yyyMMdd = "yyyy/MM/dd";
export const EEE = "EEE";

export const localeOption = [
    { val: "en", content: "ENG" },
    { val: "vi", content: "VIE" },
];
