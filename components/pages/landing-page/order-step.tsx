import { Box, Flex, Img, Text } from "@chakra-ui/react";

const StepItem = ({
    title,
    description,
    index,
    image,
}: {
    title: string;
    description: string;
    index: number;
    image: string;
}) => {
    return (
        <Flex
            mx="1rem"
            position="relative"
            maxW={{ base: "100%", lg: "30.5rem" }}
            flexDir={{ base: "row", lg: "column" }}
            alignItems="center"
            justifyContent={{ base: "space-between", lg: "flex-start" }}
        >
            {index != 4 && (
                <Box
                    w="50%"
                    position={{ base: "absolute", lg: "relative" }}
                    top={{ base: "100%", lg: "unset" }}
                    left={{ base: "-6rem", lg: "unset" }}
                    transform={{ base: "rotate(90deg)", lg: "translate(100%,2.8rem)" }}
                    borderTop="2px dashed var(--color-yellowgreen-100)"
                />
            )}
            <Flex
                alignItems="center"
                justifyContent="center"
                w="5.6rem"
                h="5.6rem"
                fontSize="2.6rem"
                color="var(--green-light-500)"
                borderRadius="50%"
                fontWeight="600"
                backgroundColor=" var(--color-honeydew-100)"
                border="1.4px solid var(--color-yellowgreen-100)"
            >
                {index}
            </Flex>
            <Flex maxW="30.5rem" alignItems="center" flexDir="column">
                <Text fontSize="3rem" fontWeight="bold" lineHeight="2.4rem" mt="3.6rem" className="step-name">
                    {title}
                </Text>
                <Img my="2.4rem" w="18.6rem" h="18.6rem" alt="" src={image} />
                <Text textAlign="center" fontSize="1.8rem" fontWeight="medium">
                    {description}
                </Text>
            </Flex>
        </Flex>
    );
};
const OrderStep = () => {
    return (
        <Flex
            scrollMarginTop="8rem"
            id="order-section"
            alignItems="center"
            py="5rem"
            px={{ base: "unser", lg: "6.7rem" }}
            flexDir="column"
            justifyContent="space-between"
        >
            <Text fontSize="4.8rem" fontWeight="bold" textAlign="center" color="var(--sub-text-color)">
                Cách đặt hàng
            </Text>
            <Flex mt="3.6rem" flexDir={{ base: "column", lg: "row" }} justifyContent="space-between">
                <StepItem
                    title="Tìm món ăn"
                    index={1}
                    description="Tìm các món ngon gần bạn hoặc theo gợi ý của nền tảng 2ALL"
                    image="/images/mask-group@2x.png"
                />
                <StepItem
                    title="Chọn món"
                    index={2}
                    description="Chọn và điều chỉnh món ăn theo khẩu vị hoặc nhu cầu dinh dưỡng của bạn"
                    image="/images/mask-group1@2x.png"
                />

                <StepItem
                    title="Đặt hàng"
                    index={3}
                    description="Đặt hàng linh hoạt. Đảm bảo bạn nhận được món ăn theo khung giờ mong muốn"
                    image="/images/mask-group2@2x.png"
                />

                <StepItem
                    title="Thưởng thức"
                    index={4}
                    description="Tận hưởng món ăn ngon, lành và được chế biến theo khẩu vị của riêng bạn"
                    image="/images/mask-group3@2x.png"
                />
            </Flex>
        </Flex>
    );
};

export default OrderStep;
