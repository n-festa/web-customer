import { FoodOtherFilterOptionsKeys } from "@/types/enum";

export const FoodOtherFilterOptions = [
    { key: FoodOtherFilterOptionsKeys.GT4Star, name: "> 4 Sao" },
    { key: FoodOtherFilterOptionsKeys.Vegetarian, name: "Chay" },
    { key: FoodOtherFilterOptionsKeys.LT500Kcal, name: "< 500 Kcal" },
];

export const TabReview = {
    quick: 1,
    detail: 2,
};

export const storageKeys = {
    userProfile: "userProfile",
};

export const RestaurantOtherFilterOptions = [{ key: FoodOtherFilterOptionsKeys.GT4Star, name: "> 4 Sao" }];

export const DefaultTasteOption = "7";
export const DefaultOtherOption = false;
export const PortionCustomization = "PortionCustomization";
export const TasteCustomization = "TasteCustomization";
export const OtherCustomization = "OtherCustomization";
