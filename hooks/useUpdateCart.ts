"use client";

import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import command from "@/config/observable.config";
import { cartState, cartSynced } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { store } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { setErrorScreenDes } from "@/store/reducers/appSlice";
import { Cart, CartItem } from "@/types/cart";
import { isLoggedIn } from "@/utils/functions";
import { loadState } from "@/utils/localstorage";
import { routes } from "@/utils/routes";
import { useToast } from "@chakra-ui/react";
import Axios, { CancelTokenSource } from "axios";
import { cloneDeep, debounce, isEqual } from "lodash";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable, waitForAll } from "recoil";
import { getRecoil } from "recoil-nexus";
import useObservable, { observer } from "./useObservable";
interface MaxValues {
    [key: string]: {
        totalMenuItemQty: number;
        available: number;
        items: {
            [key: string]: {
                id?: number;
                value: number;
                max: number;
            };
        };
    };
}
const useUpdateCart = () => {
    const [loading, setLoading] = useState(false);
    const [_, setCart] = useRecoilStateLoadable(cartState);
    const [rawCart] = useRecoilValue(waitForAll([cartState]));
    const { subcribe, unsubscribe, setUpdateFunction } = useObservable("updateCart");
    const cartRef = useRef<Cart>();
    const cartSync = useRecoilValueLoadable(cartSynced).valueMaybe();
    const [tempCart, setTempCart] = useState<Cart>();
    const listFoodIdsRef = useRef<string[]>([]);
    const [maxQtyValues, setMaxQtyValues] = useState<MaxValues>({});
    const t = useTranslations("COMMON.CART");
    const toast = useToast();
    useEffect(() => {
        if (cartSync && Object.keys(cartSync).length) {
            cartRef.current = cartSync;
            observer.update(command.loginCallback);
        }
    }, [cartSync]);

    const customerId = useAppSelector((state) => state.userInfo.userInfo?.customer_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleUpdateCart = useCallback(
        debounce(async (cartItem: CartItem) => {
            unsubscribe(command.loginCallback);
            if (cartItem.qty_ordered <= 0) return;

            if (!isLoggedIn() && typeof window != "undefined") {
                subcribe(command.loginCallback);
                setUpdateFunction(() => handleUpdateCart(cartItem));
                store.dispatch(setErrorScreenDes(routes.SignIn));
                return;
            }
            const _newCart = cloneDeep(getRecoil(cartState));
            let cartInfo = cloneDeep(_newCart?.cart_info ?? []);
            const { userId } = loadState("infoSign");
            const _customerId = _newCart?.customer_id || customerId || userId;

            if (
                (cartItem?.restaurant_id != _newCart?.restaurant_id &&
                    _newCart?.restaurant_id != undefined &&
                    _newCart?.cart_info?.length) ??
                0 > 0
            ) {
                //Show Dialog Clear Current Cart
                const result = await dialogRef.current?.show({
                    title: t("RESTAURANT_CHANGE"),
                    message: t("RESTAURANT_CHANGE_MESSAGE"),
                    positive: {
                        onClick: async () => {
                            cartInfo = [];
                        },
                    },
                });
                if (!result || !_customerId) return;
                await apiServices.deleteWholdCart({ customerId: _customerId });
            }

            const newCart = {
                ..._newCart,
                cart_info: cartInfo,
                restaurant_id: cartItem.restaurant_id,
                cartUpdate: cartItem,
            };
            setCart(newCart);
        }, 300),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(rawCart), setCart, setUpdateFunction, subcribe, t, unsubscribe],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleQuickAdd = useCallback(
        debounce(
            async (id?: number, name?: string, restaurant_id?: number | string) => {
                try {
                    unsubscribe(command.loginCallback);
                    if (!isLoggedIn()) {
                        subcribe(command.loginCallback);
                        setUpdateFunction(() => handleQuickAdd(id, name, restaurant_id));
                        store.dispatch(setErrorScreenDes(routes.SignIn));
                        return;
                    }
                    const cartValue = cartRef.current ?? rawCart;

                    const { userId } = loadState("infoSign");
                    const _customerId = cartValue?.customer_id || customerId || userId;
                    if (!id || !_customerId) return;
                    setLoading(true);

                    if (restaurant_id != cartValue?.restaurant_id && cartValue?.restaurant_id != undefined) {
                        //Show Dialog Clear Current Cart
                        const result = await dialogRef.current?.show({
                            title: t("RESTAURANT_CHANGE"),
                            message: t("RESTAURANT_CHANGE_MESSAGE"),
                            positive: {},
                        });
                        if (!result || !_customerId) {
                            setLoading(false);
                            return;
                        }
                        await apiServices.deleteWholdCart({ customerId: _customerId });
                    }

                    await apiServices
                        .quickAddCart({
                            customer_id: Number(_customerId),
                            menu_item_id: id,
                        })
                        .then((res) => {
                            if (res.data) {
                                setCart((prev) => ({
                                    ...prev,
                                    ...res.data,
                                    restaurant_id: res.data.restaurant_id,
                                    cartUpdate: undefined,
                                }));
                                toast({
                                    title: t("UPDATE_CART"),
                                    description: t("ADDED_TO_CART", { name: name }),
                                    status: "success",
                                    duration: 4000,
                                    position: "top",
                                    isClosable: true,
                                });
                            }
                        });
                    setLoading(false);
                } catch (err) {
                    const message: string | undefined = (err as any)?.error.response?.data?.message;
                    toast({
                        title: t("UPDATE_CART"),
                        description: t("FAILED_UPDATE", { message: message ?? "" }),
                        status: "error",
                        duration: 4000,
                        position: "top",
                        isClosable: true,
                    });

                    setLoading(false);
                }
            },
            1000,
            { leading: true },
        ),
        [JSON.stringify(rawCart), customerId],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleChangeCartQuantity = useCallback(
        debounce(async (id?: number, value?: number, _cts?: null | CancelTokenSource) => {
            if (!id || !cartSync?.customer_id || !value) return;
            _cts?.cancel();
            _cts = Axios.CancelToken.source();
            const tempCart = cloneDeep(rawCart);
            tempCart?.cart_info?.forEach((item) => {
                if (item.item_id === id) {
                    item.qty_ordered = value;
                }
            });
            setTempCart(tempCart);
            try {
                const res = await apiServices.basicUpdateCart(
                    {
                        customer_id: Number(cartSync?.customer_id),
                        updated_items: [
                            {
                                item_id: id,
                                qty_ordered: value,
                            },
                        ],
                    },
                    _cts.token,
                );

                if (res?.data) {
                    setCart((prev) => ({ ...prev, ...res.data, cartUpdate: undefined }));
                }
            } catch (err) {
                const message: string | undefined = (err as any)?.error.response?.data?.message;
                toast({
                    title: t("UPDATE_CART"),
                    description: t("FAILED_UPDATE", { message: message ?? "" }),
                    status: "error",
                    duration: 4000,
                    position: "top",
                    isClosable: true,
                });
            }
        }, 300),
        [],
    );
    const totalPrice = useMemo(() => {
        const _cart = tempCart ?? cartSync;
        const totalPrice =
            _cart?.cart_info?.reduce?.((prev, cur) => prev + cur.qty_ordered * (cur.price_after_discount ?? 0), 0) ??
            -1;
        return totalPrice;
    }, [cartSync, tempCart]);

    useEffect(() => {
        const listFoodIds = cartSync?.cart_info?.map((item) => String(item.item_id)) ?? [];

        const isNeedUpdated = !isEqual(listFoodIds, listFoodIdsRef.current);
        listFoodIdsRef.current = listFoodIds;

        if (isNeedUpdated) {
            const menuItemQty: { [key: string]: number } = {};
            const _maxQtyValues = cartSync?.cart_info?.reduce<MaxValues>((prevValue, item) => {
                if (!item.item_id || !item.menu_item_id) return prevValue;
                menuItemQty[item.menu_item_id] = (menuItemQty[item.menu_item_id] ?? 0) + item.qty_ordered;
                const totalMenuItemQty = menuItemQty[item.menu_item_id];
                const available = item.quantity_available ?? 0;
                const items = cloneDeep(prevValue[item.menu_item_id]?.items ?? {});
                items[item.item_id] = {
                    id: item.item_id,
                    max: Math.max(0, available - totalMenuItemQty + item.qty_ordered),
                    value: item.qty_ordered,
                };
                Object.keys(items).forEach((key) => {
                    const item = items[key];
                    items[key] = {
                        id: item.id,
                        max: Math.max(0, available - totalMenuItemQty + item.value),
                        value: item.value,
                    };
                });

                return {
                    ...prevValue,
                    [item.menu_item_id]: {
                        totalMenuItemQty: totalMenuItemQty,
                        available: available,
                        items: items,
                    },
                };
            }, {});
            setMaxQtyValues(_maxQtyValues ?? {});
        }
    }, [cartSync?.cart_info, maxQtyValues]);
    const handleChangeQtyRaw = (id?: number, menuId?: number, value?: number) => {
        if (menuId && maxQtyValues[menuId] && id) {
            setMaxQtyValues((prevValue) => {
                const prevMenuItem = prevValue?.[String(menuId)];
                const menuItems = cloneDeep(prevMenuItem.items);
                const newTotalMenuItemQty = Object.values(menuItems).reduce((prevValue, item) => {
                    return prevValue + ((String(item.id) === String(id) ? value : item?.value) ?? 0);
                }, 0);

                Object.keys(menuItems).forEach((key) => {
                    const item = menuItems[key];
                    const _value = (String(item.id) === String(id) ? value : item?.value) ?? 0;
                    menuItems[key] = {
                        id: item.id,
                        max: Math.max(0, prevMenuItem.available - newTotalMenuItemQty + _value),
                        value: _value,
                    };
                });
                return {
                    ...prevValue,
                    [menuId]: { ...prevMenuItem, items: menuItems, totalMenuItemQty: newTotalMenuItemQty },
                };
            });
        }
    };
    return {
        cart: rawCart,
        cartSync,
        handleUpdateCart: handleUpdateCart,
        handleQuickAdd,
        loading,
        maxQtyValues,
        tempCart,
        setTempCart,
        handleChangeCartQuantity,
        handleChangeQtyRaw,
        totalPrice,
    };
};

export default useUpdateCart;
