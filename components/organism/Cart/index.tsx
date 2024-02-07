import useSWRAPI from "@/hooks/useApi";
import { cartState, cartSynced, showCartState } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { useAppSelector } from "@/store/hooks";
import { genCartNote } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Button, Center, Flex, FlexProps, Image, Text, VStack } from "@chakra-ui/react";
import debounce from "lodash/debounce";
import isEqual from "lodash/isEqual";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CartItem from "../CartItem";

const Cart = ({ restaurant_id, ...props }: FlexProps & { restaurant_id?: number | string }) => {
    const router = useRouter();
    const setShow = useSetRecoilState(showCartState);
    const cart = useRecoilValue(cartSynced);
    const [rawCart, setCart] = useRecoilState(cartState);

    const profile = useAppSelector((app) => app.userInfo.userInfo);
    const isCartEmpty = !cart.cart_info?.length || (restaurant_id != undefined && cart.restaurant_id != restaurant_id);
    const { GetAvailableTime } = useSWRAPI();
    const { data: timeDate, isLoading: isLoadingTime } = GetAvailableTime({
        lat: profile?.latAddress,
        long: profile?.longAddress,
        utc_offset: -(new Date().getTimezoneOffset() / 60),
        menu_item_ids: cart.cart_info?.map((item) => item.item_id),
        now: new Date().getTime(),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleChangeCartQuantity = useCallback(
        debounce(
            async (id?: number, value?: number) => {
                if (!id || !cart?.customer_id || !value) return;
                const res = await apiServices.basicUpdateCart({
                    customer_id: Number(cart?.customer_id),
                    updated_items: [
                        {
                            item_id: id,
                            qty_ordered: value,
                        },
                    ],
                });
                if (res.data) {
                    setCart((prev) => ({ ...prev, ...res.data }));
                }
            },
            1000,
            { leading: true },
        ),
        [],
    );

    //Sync
    useEffect(() => {
        if (!isEqual(rawCart?.cart_info, cart.cart_info)) {
            setCart((prev) => ({ ...prev, ...cart }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            {...props}
        >
            <VStack borderBottom="1px solid var(--gray-300)" pb="1.6rem" spacing="0.8rem" color="black">
                <Text fontSize="2.4rem" textAlign="center" fontWeight="600">
                    Giỏ đồ ăn
                </Text>
                {!isCartEmpty && (
                    <Text fontSize="1.6rem" textAlign="center">
                        {!isLoadingTime
                            ? `Thời gian nhận đồ ăn gần nhất: ${timeDate?.data?.[0].hours}:${timeDate?.data?.[0].minutes}`
                            : "-"}
                    </Text>
                )}
            </VStack>
            {!isCartEmpty ? (
                <>
                    <Flex flexDir="column" flex={1} overflow="hidden" borderBottom="1px solid var(--gray-300)">
                        {cart?.restaurant_id !== undefined && (
                            <Flex alignItems="center" px="0.8rem" bg="var(--gray-100)" h="5.6rem" gap="1.2rem">
                                <Image
                                    w="4rem"
                                    h="4rem"
                                    fallbackSrc="/images/chef_avatar.svg"
                                    src={cart?.restaurant_logo_img}
                                    alt="restaurant-icon"
                                ></Image>
                                <Text fontWeight="bold" fontSize="1.6rem" color="var(--color-mediumslateblue)">
                                    {cart?.restaurant_name?.[0].text}
                                </Text>
                            </Flex>
                        )}
                        <VStack flex={1} overflow="auto" mt="0.8rem" spacing="0.8rem">
                            {cart.cart_info?.map((item) => (
                                <CartItem
                                    onChangeValue={(value) => {
                                        handleChangeCartQuantity(item.item_id, value);
                                    }}
                                    key={item.item_id}
                                    image={"/images/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-3@2x.png"} //TODO
                                    name="Mỳ Cá Cờ Sốt Yakitori" //TODO
                                    note={genCartNote(item)}
                                    price="90,000"
                                    nowPrice="75,000"
                                    quantity={item.qty_ordered}
                                />
                            ))}
                        </VStack>
                    </Flex>
                    <Flex p="1.6rem" h="19rem" flexDir="column" gap="2.4rem">
                        <Flex justifyContent="space-between">
                            <Flex flex={1} flexDir="column" justifyContent="space-between" pr="2.5rem">
                                <Text fontSize="2rem" fontWeight={600}>
                                    Tổng
                                </Text>
                                <Text fontSize="1.6rem" lineHeight="2.4rem">
                                    Phí giao hàng sẽ hiển thị khi bạn xem chi tiết đơn hàng
                                </Text>
                            </Flex>
                            <Flex justifyContent="flex-end" alignItems="center">
                                <Text color="var(--gray-900)" fontSize="2.4rem" fontWeight="600">
                                    160,000 đ
                                </Text>
                            </Flex>
                        </Flex>
                        <Button
                            h="4.8rem"
                            borderRadius="2.4rem"
                            onClick={() => {
                                setShow(false);
                                router.push(routes.ConfirmOrder);
                            }}
                        >
                            Xem đơn hàng
                        </Button>
                    </Flex>
                </>
            ) : (
                <Center h="100%">
                    <VStack alignItems="center">
                        <Image alt="cart-empty" src="/images/icons/cart.svg" />
                        <Text
                            textAlign="center"
                            whiteSpace="pre-line"
                            fontSize="2rem"
                            fontWeight="500"
                            color="var(--gray-600)"
                        >
                            {`Thêm ngay bữa ăn ngon lành\r\ncủa riêng bạn.`}
                        </Text>
                    </VStack>
                </Center>
            )}
        </Flex>
    );
};
export default Cart;
