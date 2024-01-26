import { HStack, Img, Text, VStack } from "@chakra-ui/react";

const ProductInfo = () => {
    return (
        <VStack w="100%" align="flex-start" spacing="1rem">
            <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="2.4rem">
                Cơm Ức Gà Gạo Lứt
            </Text>
            <Text as="span" className="chef-name" fontSize="1.4rem" lineHeight="2rem" color="var(--gray-600)">
                <Text as="span">by </Text>
                <Text as="span" fontWeight="bold" color="var(--color-mediumslateblue)">
                    The Chef Town
                </Text>
            </Text>
            <HStack w="100%" fontSize="1.6rem" color="var(--gray-500)" justifyContent="flex-start">
                <HStack spacing="0.4rem">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/timer.svg" />
                    <Text wordBreak="keep-all" className="text">
                        Còn 5 phần
                    </Text>
                </HStack>
                <HStack spacing="0.4rem">
                    <Img w="1.8rem" h="1.8rem" alt="" src="/images/icons/receipt-check.svg" />
                    <Text wordBreak="keep-all" className="text">
                        Đã bán 50+
                    </Text>
                </HStack>

                <HStack spacing="0.4rem" className="d-flex align-items-center gap-1">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/star-icon1.svg" />
                    <Text wordBreak="keep-all" className="text">
                        Nhận xét 100+
                    </Text>
                </HStack>
            </HStack>

            <HStack h="3rem" color="black" fontSize="1.6rem" spacing="0.8rem">
                <Text textDecoration="line-through" textDecorationThickness="1px">
                    95,000
                </Text>
                <Text fontSize="2.4rem" fontWeight="bold">
                    80,000
                </Text>
            </HStack>
            <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                <Img w="2.4rem" h="2.4rem" alt="" src="/images/frame-2729.svg" />
                <Text>Ưu đãi đến 50k</Text>
            </HStack>
            <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                <Img w="2rem" h="2rem" alt="" src="/images/icons/archive.svg" />
                <Text>Đóng gói bằng hộp bã mía (+3,000đ)</Text>
            </HStack>
            <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                <Img w="2.4rem" h="2.4rem" alt="" src="/images/frame-2725.svg" />
                <Text>Đặt trước 09:00 giờ sáng để điều chỉnh vị</Text>
            </HStack>
        </VStack>
    );
};
export default ProductInfo;
