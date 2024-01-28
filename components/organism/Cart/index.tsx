import { showCartState } from "@/recoil/recoilState";
import { routes } from "@/utils/routes";
import { Button, Flex, FlexProps, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import CartItem from "../CartItem";

const Cart = (props: FlexProps) => {
    const router = useRouter();
    const setShow = useSetRecoilState(showCartState);

    // const _cart = useRecoilValue(cartState);

    return (
        <Flex
            color="black"
            position="relative"
            flexDir="column"
            borderRadius="0"
            p="2.4rem .8rem 2.4rem .8rem"
            w="42.6rem"
            h="68rem"
            {...props}
        >
            <VStack borderBottom="1px solid var(--gray-300)" pb="1.6rem" spacing="0.8rem" color="black">
                <Text fontSize="2.4rem" textAlign="center" fontWeight="600">
                    Giỏ đồ ăn
                </Text>
                <Text fontSize="1.6rem" textAlign="center">
                    Thời gian nhận đồ ăn gần nhất: 12:00 - 12:30
                </Text>
            </VStack>
            <Flex flexDir="column" flex={1} overflow="hidden" borderBottom="1px solid var(--gray-300)">
                <Flex alignItems="center" px="0.8rem" bg="var(--gray-100)" h="5.6rem" gap="1.2rem">
                    <Image w="4rem" h="4rem" src="/images/chef_avatar.svg" alt="restaurant-icon"></Image>
                    <Text fontWeight="bold" fontSize="1.6rem" color="var(--color-mediumslateblue)">
                        {"The Chef Town"}
                    </Text>
                </Flex>
                <VStack flex={1} overflow="auto" mt="0.8rem" spacing="0.8rem">
                    <CartItem
                        image={"/images/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-3@2x.png"}
                        name="Mỳ Cá Cờ Sốt Yakitori"
                        note="Ghi chú 1  - Lorem ipsum dolor sit amet Ghi chú 1  - Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"
                        price="90,000"
                        nowPrice="75,000"
                    />
                    <CartItem
                        image={"/images/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-3@2x.png"}
                        name="Mỳ Cá Cờ Sốt Yakitori"
                        note="Ghi chú 1  - Lorem ipsum dolor sit amet Ghi chú 1  - Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"
                        price="90,000"
                        nowPrice="75,000"
                    />
                    <CartItem
                        image={"/images/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-3@2x.png"}
                        name="Mỳ Cá Cờ Sốt Yakitori"
                        note="Ghi chú 1  - Lorem ipsum dolor sit amet Ghi chú 1  - Lorem ipsum dolor sit amet Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"
                        price="90,000"
                        nowPrice="75,000"
                    />
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
        </Flex>
    );
};
export default Cart;
