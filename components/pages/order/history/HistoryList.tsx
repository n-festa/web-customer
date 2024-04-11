import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import Empty from "@/components/molecules/Empty";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import HistoryItem from "@/components/pages/order/history/HistoryItem";
import OrderHistoryRestaurantItem from "@/components/pages/order/history/OrderHistoryRestaurantItem";
import useDeleteCartItem from "@/hooks/useDeleteCartItem";
import useUpdateCart from "@/hooks/useUpdateCart";
import { useAppSelector } from "@/store/hooks";
import { setGlobalLoading } from "@/store/reducers/appSlice";
import { CartItem } from "@/types/cart";
import { FilterType } from "@/types/enum";
import { OrderItem } from "@/types/order";
import {
    GetHistoryOrderByFoodResponse,
    GetHistoryOrderByRestaurantResponse,
    HistoricalOrderByFood,
    HistoricalOrderByRestaurant,
} from "@/types/response/GetHistoryOrderResponse";
import { RestaurantInfo } from "@/types/response/base";
import { sleep } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { createRef, useMemo } from "react";
import { useDispatch } from "react-redux";
export const errorReOrder: React.MutableRefObject<string | null> = createRef();
interface Props {
    histories: {
        food?: GetHistoryOrderByFoodResponse;
        restaurant?: GetHistoryOrderByRestaurantResponse;
    };
    type: FilterType;
    isLoading?: boolean;
}

const HistoryList = ({ histories, isLoading, type }: Props) => {
    const profile = useAppSelector((state) => state.userInfo.userInfo);
    const router = useRouter();
    const dispatch = useDispatch();
    const data = useMemo(() => {
        if (type == FilterType.Food) return histories.food?.hitorical_oders ?? [];
        return histories.restaurant?.hitorical_oders ?? [];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, JSON.stringify(histories)]);

    const { handleDeleteWholeCart, cartTranslate } = useDeleteCartItem();
    const { cartSync, handleUpdateCart } = useUpdateCart();
    const handleAddToCart = async (items: (OrderItem | undefined)[] = [], restaurant?: RestaurantInfo) => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const cartItem: CartItem = {
                sku_id: Number(item?.sku_id),
                customer_id: Number(profile?.customer_id),
                qty_ordered: Number(item?.qty_ordered),
                advanced_taste_customization: item?.advanced_taste_customization,
                basic_taste_customization: item?.basic_taste_customization,
                portion_customization: item?.portion_customization,
                restaurant_id: restaurant?.restaurant_id,
                menu_item_id: item?.menu_item_id,
                advanced_taste_customization_obj: item?.advanced_taste_customization_obj,
                basic_taste_customization_obj: item?.basic_taste_customization_obj,
                notes: item?.notes ?? "",
                price: item?.price,
                item_name: item?.item_name ?? [],
                packaging_id: item?.packaging_info?.packaging_id,
                packaging_info: item?.packaging_info,
                isUpdateAll: true,
            };
            await handleUpdateCart(cartItem);
            await sleep(500);
        }
        dispatch(setGlobalLoading(false));
        if (errorReOrder.current) {
            errorReOrder.current = null;
            return;
        }
        router.push(routes.ConfirmOrder);
    };
    const handleReorder = async (items: (OrderItem | undefined)[] = [], restaurant?: RestaurantInfo) => {
        if (!profile?.latAddress || !profile.longAddress) {
            await dialogRef.current?.show({
                title: cartTranslate("ADDRESS_MISSING"),
                message: cartTranslate("ADDRESS_MISSING_MESSAGE"),
                negative: { text: cartTranslate("CANCEL") },
                positive: {
                    text: cartTranslate("BACK_TO_HOME"),
                    onClick: async () => {
                        router.push(routes.Home);
                    },
                },
            });
            return;
        }
        if (cartSync?.cart_info?.length) {
            await dialogRef.current?.show({
                title: cartTranslate("REMOVE_ALL"),
                message: cartTranslate("REORDER_MESSAGE"),
                negative: { text: cartTranslate("CANCEL") },
                positive: {
                    text: cartTranslate("CONFIRM"),
                    onClick: async () => {
                        dispatch(setGlobalLoading(true));

                        handleDeleteWholeCart(profile?.customer_id)
                            .then(async () => {
                                try {
                                    await sleep(500);
                                    await handleAddToCart(items, restaurant);
                                    dispatch(setGlobalLoading(false));
                                } catch {
                                    //TODO
                                    dispatch(setGlobalLoading(false));
                                }
                            })
                            .catch(() => {
                                //TODO
                                dispatch(setGlobalLoading(false));
                            });
                    },
                },
            });
            return;
        }
        handleAddToCart(items, restaurant);
    };
    return (
        <VStack flexDirection={"column"} spacing={"0.8rem"} w="100%" bg={data.length === 0 ? "white" : "transparent"}>
            {isLoading ? (
                <>
                    <SkeletonBox isLoaded={false} />
                    <SkeletonBox isLoaded={false} />
                    <SkeletonBox isLoaded={false} />
                </>
            ) : data.length === 0 ? (
                <Empty />
            ) : type === FilterType.Food ? (
                data.map((el, index) => (
                    <HistoryItem
                        handleReorder={handleReorder}
                        key={String(index)}
                        orderInfo={el as HistoricalOrderByFood}
                    />
                ))
            ) : (
                data.map((el, index) => (
                    <OrderHistoryRestaurantItem
                        handleReorder={handleReorder}
                        key={String(index)}
                        orderInfo={el as HistoricalOrderByRestaurant}
                    />
                ))
            )}
        </VStack>
    );
};
export default HistoryList;
