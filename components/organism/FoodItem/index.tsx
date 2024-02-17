import { Suspense } from "react";
import { ProductTypeList } from "types";
import FoodItemSuspense from "./FoodItemSuspense";

const FoodItem = (
    props: ProductTypeList & {
        isShowMerchart?: boolean;
        isShowRating?: boolean;
        isShowDistance?: boolean;
        isShowTime?: boolean;
        isShowUnitSold?: boolean;
        isShowQuantityAvailable?: boolean;
        isShowAddButton?: boolean;
    },
) => {
    return (
        <Suspense>
            <FoodItemSuspense {...props} />
        </Suspense>
    );
};

export default FoodItem;
