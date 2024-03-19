import useSWRAPI from "@/hooks/useApi";
import useDeleteCartItem from "@/hooks/useDeleteCartItem";
import useRenderText from "@/hooks/useRenderText";
import useUpdateCart from "@/hooks/useUpdateCart";
import { cartState, cartSynced, showCartState } from "@/recoil/recoilState";
import { useAppSelector } from "@/store/hooks";
import { YYYYMMDD } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import { genCartNote, parseStringToObj } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Button, Center, Flex, FlexProps, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { CancelTokenSource } from "axios";
import { isToday, isTomorrow } from "date-fns";
import isEqual from "lodash/isEqual";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { BeatLoader } from "react-spinners";
import { useRecoilStateLoadable, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import CartItem from "../CartItem";

let _cts: CancelTokenSource | null = null;

const Cart = ({
    restaurant_id,
    ignoreAuthError,
    ...props
}: FlexProps & { restaurant_id?: number | string; ignoreAuthError?: boolean }) => {
    const { renderTxt } = useRenderText();
    const t = useTranslations("CART");
    const tCommon = useTranslations("COMMON");
    const router = useRouter();
    const setShow = useSetRecoilState(showCartState);
    const cart = useRecoilValueLoadable(cartSynced).getValue();
    const [rawCart, setCart] = useRecoilStateLoadable(cartState);
    const { totalPrice, handleChangeCartQuantity, maxQtyValues, handleChangeQtyRaw } = useUpdateCart();
    const { handleDeleteCartItem, handleDeleteWholeCart } = useDeleteCartItem();
    const profile = useAppSelector((app) => app.userInfo.userInfo);
    const isCartEmpty = !cart?.cart_info?.length || (restaurant_id != undefined && cart.restaurant_id != restaurant_id);
    const { GetAvailableTime } = useSWRAPI();
    const { data: timeDate, isLoading: isLoadingTime } = GetAvailableTime(
        {
            lat: profile?.latAddress,
            long: profile?.longAddress,
            utc_offset: -(new Date().getTimezoneOffset() / 60),
            menu_item_ids: Array.from(new Set(cart?.cart_info?.map((item) => item.menu_item_id))),
            now: new Date().getTime(),
            having_advanced_customization: cart.cart_info?.some(
                (item) => parseStringToObj(item.advanced_taste_customization_obj)?.length,
            ),
        },
        undefined,
        ignoreAuthError ? [401] : undefined,
    );

    //Sync
    useEffect(() => {
        if (!isEqual(rawCart.valueMaybe()?.cart_info, cart?.cart_info)) {
            setCart((prev) => ({ ...prev, ...cart, cartUpdate: undefined }));
        }
        return () => {
            _cts?.cancel();
            _cts = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const receiveTimePredict = useMemo(() => {
        if (typeof timeDate?.data === "number") return { backTime: timeDate?.data as number };
        if (!timeDate?.data?.[0] || !timeDate?.data?.[0].hours || !timeDate?.data?.[0].minutes) return;
        const date = timeDate?.data?.[0].date;
        const predictDate =
            !date || isToday(date) ? "" : isTomorrow(date) ? tCommon("TOMORROW") + " " : date + " " ?? "";
        const predictTime = `${timeDate?.data?.[0].hours}:${timeDate?.data?.[0].minutes}`;
        const nextMinutes = Number(timeDate.data[0].minutes) + 30;
        const predictTimeBuffer =
            nextMinutes > 60
                ? `${Number(timeDate?.data?.[0].hours) + 1}:${nextMinutes - 60}`
                : `${timeDate?.data?.[0].hours}:${nextMinutes}`;
        return { predictDate, predictTimeBuffer, predictTime };
    }, [tCommon, timeDate?.data]);

    return (
        <Flex
            color="black"
            position="relative"
            flexDir="column"
            borderRadius="0"
            p="2.4rem .8rem 2.4rem .8rem"
            w="42.6rem"
            h="68rem"
            border="var(--divider)"
            boxShadow="0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)"
            bg="white"
            {...props}
        >
            <VStack borderBottom="1px solid var(--gray-300)" pb="1.6rem" spacing="0.8rem" color="black">
                <Text fontSize="2.4rem" textAlign="center" fontWeight="600">
                    {t("FOOD_BASKET")}
                </Text>
                {!isCartEmpty && !isLoadingTime && (
                    <>
                        {receiveTimePredict?.backTime ? (
                            <Flex
                                alignItems="center"
                                bg="var(--error-50)"
                                w="100%"
                                h="8rem"
                                flexDir="column"
                                px="1.7rem"
                                py="0.8rem"
                            >
                                <HStack spacing="1rem">
                                    <Image alt="warning" src="/images/icons/warning.svg" />
                                    <Text whiteSpace="nowrap" fontSize="1.6rem" textAlign="center">
                                        {t("CART_UNAVAILABLE", {
                                            time: formatDate(receiveTimePredict.backTime, YYYYMMDD),
                                        })}
                                    </Text>
                                </HStack>
                                <Button
                                    onClick={() => {
                                        handleDeleteWholeCart(cart.customer_id);
                                    }}
                                    borderRadius="0.8rem"
                                    mt="0.4rem"
                                    w="11.7rem"
                                    h="3.6rem"
                                    variant="error"
                                >
                                    {t("CLEAR_CART")}
                                </Button>
                            </Flex>
                        ) : (
                            receiveTimePredict?.predictTime &&
                            receiveTimePredict?.predictTimeBuffer && (
                                <Text fontSize="1.6rem" textAlign="center">
                                    {t("NEAREST_DELIVERY_TIME", {
                                        date: receiveTimePredict?.predictDate,
                                        timeAfter: receiveTimePredict?.predictTime,
                                        timeBefore: receiveTimePredict?.predictTimeBuffer,
                                    })}
                                </Text>
                            )
                        )}
                    </>
                )}
                {isLoadingTime && !receiveTimePredict?.predictTime && !receiveTimePredict?.predictTimeBuffer && (
                    <BeatLoader cssOverride={{ height: "2.4rem" }} size="5px" />
                )}
            </VStack>
            {!isCartEmpty ? (
                <>
                    <Flex
                        flexDir="column"
                        mt="0.8rem"
                        flex={1}
                        overflow="hidden"
                        borderBottom="1px solid var(--gray-300)"
                    >
                        {cart?.restaurant_id !== undefined && (
                            <Flex
                                cursor="pointer"
                                onClick={() => {
                                    router.push(routes.RestaurantDetail + `/${cart?.restaurant_id}`);
                                }}
                                alignItems="center"
                                px="0.8rem"
                                bg="var(--gray-100)"
                                h="5.6rem"
                                gap="1.2rem"
                            >
                                <Image
                                    w="4rem"
                                    h="4rem"
                                    fallbackSrc="/images/chef_avatar.svg"
                                    src={cart?.restaurant_logo_img}
                                    alt="restaurant-icon"
                                ></Image>
                                <Text fontWeight="bold" fontSize="1.6rem" color="var(--color-mediumslateblue)">
                                    {renderTxt(cart?.restaurant_name)}
                                </Text>
                            </Flex>
                        )}
                        <VStack flex={1} overflow="auto" mt="0.8rem" spacing="0.8rem">
                            {cart.cart_info?.map((item) => (
                                <CartItem
                                    onChangeValue={(value) => {
                                        handleChangeQtyRaw(item.item_id, item.menu_item_id, value);
                                        handleChangeCartQuantity(item.item_id, value, _cts);
                                    }}
                                    onDeleteCartItem={() => {
                                        if (item.item_id != undefined && cart.customer_id != undefined)
                                            handleDeleteCartItem(item.item_id, cart.customer_id);
                                    }}
                                    numberInputProps={{
                                        value: maxQtyValues[String(item.menu_item_id)]?.items?.[String(item.item_id)]
                                            .value,
                                        max: maxQtyValues[String(item.menu_item_id)]?.items?.[String(item.item_id)].max,
                                    }}
                                    key={item.item_id}
                                    image={item.item_img ?? ""}
                                    name={renderTxt(item.item_name) ?? "-"}
                                    note={genCartNote(item)}
                                    price={item.price?.toLocaleString()}
                                    nowPrice={item.price_after_discount?.toLocaleString()}
                                    quantity={item.qty_ordered}
                                />
                            ))}
                        </VStack>
                    </Flex>
                    <Flex p="1.6rem" h="19rem" flexDir="column" gap="2.4rem">
                        <Flex justifyContent="space-between">
                            <Flex flex={1} flexDir="column" justifyContent="space-between" pr="2rem">
                                <Text fontSize="2rem" fontWeight={600}>
                                    {t("TOTAL")}
                                </Text>
                                <Text fontSize="1.6rem" lineHeight="2.4rem">
                                    {t("DELIVERY_FEE_NOTICE")}
                                </Text>
                            </Flex>
                            <Flex justifyContent="flex-end" alignItems="center">
                                <Text color="var(--gray-900)" fontSize="2.4rem" fontWeight="600">
                                    {`${totalPrice.toLocaleString()}`} đ
                                </Text>
                            </Flex>
                        </Flex>
                        <Button
                            h="4.8rem"
                            isDisabled={!!receiveTimePredict?.backTime}
                            borderRadius="2.4rem"
                            onClick={() => {
                                setShow(false);
                                //TODO: SYNC CART TEMP AND CART SYNC BEFORE CHECKOUT
                                router.push(routes.ConfirmOrder);
                            }}
                        >
                            {t("VIEW_ORDER")}
                        </Button>
                    </Flex>
                </>
            ) : (
                <Center w="42.6rem" h="100%">
                    <VStack w="100%" alignItems="center">
                        <Image alt="cart-empty" src="/images/icons/cart.svg" />
                        <Text
                            textAlign="center"
                            whiteSpace="pre-line"
                            fontSize="2rem"
                            fontWeight="500"
                            color="var(--gray-600)"
                        >
                            {t.rich("ADD_NOW", {
                                br: () => <br />,
                            })}
                        </Text>
                    </VStack>
                </Center>
            )}
        </Flex>
    );
};
const CartSuspenseWrapper = (props: FlexProps & { restaurant_id?: number | string; ignoreAuthError?: boolean }) => (
    <Suspense>
        <Cart {...props} />
    </Suspense>
);
export default CartSuspenseWrapper;
