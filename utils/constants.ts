import { FoodOtherFilterOptionsKeys, OrderStatusLogType } from "@/types/enum";

export const FoodOtherFilterOptions = (t: any) => [
    { key: FoodOtherFilterOptionsKeys.GT4Star, name: t("COMMON.STARS") },
    { key: FoodOtherFilterOptionsKeys.Vegetarian, name: t("COMMON.VEG") },
    { key: FoodOtherFilterOptionsKeys.LT500Kcal, name: "< 500 Kcal" },
];

export const storageKeys = {
    userProfile: "userProfile",
};

export const DEFAULT_ORIGINAL_VALUE = "-1";

export const RestaurantOtherFilterOptions = [{ key: FoodOtherFilterOptionsKeys.GT4Star, name: "> 4 Sao" }];

export const DefaultTasteOption = "7";
export const DefaultOtherOption = false;
export const PortionCustomization = "PortionCustomization";
export const TasteCustomization = "TasteCustomization";
export const OtherCustomization = "OtherCustomization";

// date

export const YYYYMMDD = "yyyy-MM-dd";
export const YYYYMMDDHHmm = "yyyy-MM-dd HH:mm";
export const YYYYMMDDhhmma = "yyyy-MM-dd hh:mm a";

export const hhmma = "hh:mm a";

export const HHmm = "HH:mm";
export const yyyMMdd = "yyyy/MM/dd";
export const ddMMyyyy = "dd/MM/yyyy";
export const EEE = "EEE";

export const localeOption = [
    { val: "en", content: "ENG" },
    { val: "vi", content: "VIE" },
];
export const timeIdle = {
    millisecondIdle: 1000,
    secondIdle: 60,
    idleInMinute: 1,
};

export const listCountry = [
    {
        img: "/images/vi.svg",
        code: "84",
        name: "Viet Nam",
    },
    {
        img: "/images/en.svg",
        code: "1",
        name: "United States",
    },
    {
        img: "/images/countries/au.png",
        code: "61",
        name: "Australia",
    },
    {
        img: "/images/countries/ph.png",
        code: "63",
        name: "Philippines",
    },
    {
        img: "/images/countries/br.png",
        code: "55",
        name: "Brazil",
    },
    {
        img: "/images/countries/es.png",
        code: "34",
        name: "Spain",
    },
    {
        img: "/images/countries/jp.png",
        code: "81",
        name: "Japan",
    },
    {
        img: "/images/countries/de.png",
        code: "49",
        name: "Germany",
    },
    {
        img: "/images/countries/fr.png",
        code: "33",
        name: "France",
    },
    {
        img: "/images/countries/uk.png",
        code: "44",
        name: "United Kingdom",
    },
];
export const optiopnDiet = (t: any) => [
    t("FORM_DATA.VEGAN2"),
    t("FORM_DATA.EAT_CLEAN"),
    t("FORM_DATA.MUSCLE_GAIN"),
    t("FORM_DATA.FIBER_SUPPLEMENT"),
    t("FORM_DATA.MIXED_DIET"),
    t("FORM_DATA.MIXED"),
    t("FORM_DATA.CARNIVORE"),
    t("FORM_DATA.NO_DIET"),
];

export const OrderStatusLogTypeColor: { [key: string]: string } = {
    [OrderStatusLogType.CANCELLED]: "#F04438",
    [OrderStatusLogType.FAILED]: "#F04438",
    //
    [OrderStatusLogType.COMPLETED]: "#17B26A",
    //
    [OrderStatusLogType.PICKED_UP]: "#FEC84B",
    [OrderStatusLogType.STARTED_TO_PROCESS]: "#FEC84B",
    [OrderStatusLogType.CONFIRMED]: "#FEC84B",
    [OrderStatusLogType.CREATED]: "#FEC84B",
    UNKOWN: "#F04438",
};

export const evaluateLevel = (t: any) => ({
    0: "",
    1: t("RATING_LEVEL.VERY_BAD") || "",
    2: t("RATING_LEVEL.BAD") || "",
    3: t("RATING_LEVEL.NORMAL") || "",
    4: t("RATING_LEVEL.GOOD") || "",
    5: t("RATING_LEVEL.VERY_SATISFIED") || "",
});
