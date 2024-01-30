import CartItem from "@/components/organism/CartItem";
import { formatMoney } from "@/utils/functions";
import { Button, Flex, FlexProps, Image, Text, VStack } from "@chakra-ui/react";

const PaymentGroup = (props: FlexProps) => {
    return (
        <Flex
            color="black"
            position="relative"
            flexDir="column"
            borderRadius="0"
            p="2.4rem .8rem 2.4rem .8rem"
            w="42.6rem"
            bg="white"
            h="fit-content"
            {...props}
        >
            <VStack borderBottom="1px solid var(--gray-300)" pb="1.6rem" spacing="0.8rem" color="black">
                <Text fontSize="2.4rem" textAlign="center" fontWeight="600">
                    Thanh toán
                </Text>
            </VStack>
            <Flex flexDir="column" flex={1}>
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
                </VStack>
            </Flex>
            <VStack
                w="100%"
                mt="0.8rem"
                spacing="0.4rem"
                px="1.6rem"
                alignItems="flex-start"
                pb="1.2rem"
                borderBottom="1px solid var(--gray-300)"
            >
                <Text fontSize="1.6rem" fontWeight={700}>
                    Thông tin thanh toán
                </Text>
                <Flex w="100%" justifyContent="space-between">
                    <Text fontSize="1.4rem">Tổng món ăn</Text>
                    <Text fontSize="1.4rem"> {formatMoney(150000)}</Text>
                </Flex>
                <Flex w="100%" justifyContent="space-between">
                    <Text fontSize="1.4rem">Phí đóng gói</Text>
                    <Text fontSize="1.4rem"> {formatMoney(9000)}</Text>
                </Flex>
                <Flex pb="0.4rem" w="100%" justifyContent="space-between" borderBottom="var(--divider)">
                    <Text fontSize="1.4rem">Dụng cụ ăn</Text>
                    <Text fontSize="1.4rem"> {formatMoney(0)}</Text>
                </Flex>
                <Flex w="100%" justifyContent="space-between">
                    <Text fontSize="1.4rem">Phí giao hàng | 0.8 km</Text>
                    <Text fontSize="1.4rem"> {formatMoney(10000)}</Text>
                </Flex>
                <Flex w="100%" pb="0.4rem" justifyContent="space-between" borderBottom="var(--divider)">
                    <Text fontSize="1.4rem">Phí nền tảng</Text>
                    <Text fontSize="1.4rem"> {formatMoney(2000)}</Text>
                </Flex>
                <Flex w="100%" justifyContent="space-between">
                    <Text fontSize="1.4rem">Khuyến mãi</Text>
                    <Text fontSize="1.4rem"> {formatMoney(-2000)}</Text>
                </Flex>
            </VStack>
            <Flex p="1.6rem" h="13.6rem" flexDir="column" gap="2.4rem">
                <Flex justifyContent="space-between">
                    <Text fontSize="2rem" fontWeight={600}>
                        Tổng thanh toán
                    </Text>
                    <Text color="var(--gray-900)" fontSize="2.4rem" fontWeight="600">
                        {formatMoney(160000)}
                    </Text>
                </Flex>
                <Button h="4.8rem" borderRadius="2.4rem">
                    ĐẶT HÀNG
                </Button>
            </Flex>
        </Flex>
    );
};

export default PaymentGroup;
