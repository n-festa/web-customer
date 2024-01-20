import { svnGilroy } from "@/theme/fonts";
import { Box, Flex, Img, Text, VStack } from "@chakra-ui/react";

const WhyChoose = () => {
    return (
        <Flex scrollMarginTop="8rem">
            <Flex
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                bg="var(--primary-500)"
                flex={1}
                className="why-choose-us align-items-center justify-content-center"
            >
                <Text color="var(--icterine-500)" fontSize="4rem" fontWeight="600">
                    Tại sao chọn 2All
                </Text>
                <VStack spacing="2.4rem">
                    <VStack spacing="0.8rem" alignItems="center" flexDir="column">
                        <Flex
                            borderRadius="1.05rem"
                            backgroundColor="var(--color-gray-200)"
                            w="5.6rem"
                            h="5.6rem"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Img alt="" src="/images/enjoy_food.svg" />
                        </Flex>
                        <Text fontSize="2rem" fontWeight="600" color="var(--icterine-500)">
                            Bữa ăn theo nhu cầu
                        </Text>
                        <Text
                            maxW="34rem"
                            textAlign="center"
                            color="white"
                            fontSize="1.6rem"
                            className={svnGilroy.className}
                        >
                            Lựa chọn thực phẩm, các món ăn theo nhu cầu dinh dưỡng, khẩu vị và thể trạng của bạn
                        </Text>
                    </VStack>
                    <VStack spacing="0.8rem" alignItems="center" flexDir="column">
                        <Flex
                            borderRadius="1.05rem"
                            backgroundColor="var(--color-gray-200)"
                            w="5.6rem"
                            h="5.6rem"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Img alt="" src="/images/nutrition.svg" />
                        </Flex>
                        <Text fontSize="2rem" fontWeight="600" color="var(--icterine-500)">
                            Thông tin dinh dưỡng đầy đủ
                        </Text>
                        <Text
                            maxW="34rem"
                            textAlign="center"
                            color="white"
                            fontSize="1.6rem"
                            className={svnGilroy.className}
                        >
                            Thông tin dinh dưỡng cho từng món ăn bao gồm số Kcal, protein, lipid,carb,...
                        </Text>
                    </VStack>

                    <VStack spacing="0.8rem" alignItems="center" flexDir="column">
                        <Flex
                            borderRadius="1.05rem"
                            backgroundColor="var(--color-gray-200)"
                            w="5.6rem"
                            h="5.6rem"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Img alt="" src="/images/delivery.svg" />
                        </Flex>
                        <Text fontSize="2rem" fontWeight="600" color="var(--icterine-500)">
                            Đặt hàng hẹn giờ linh hoạt
                        </Text>
                        <Text
                            maxW="34rem"
                            textAlign="center"
                            color="white"
                            fontSize="1.6rem"
                            className={svnGilroy.className}
                        >
                            Đặt hàng với khung giờ giao linh hoạt, phù hợp với nhu cầu của bạn.
                        </Text>
                    </VStack>
                </VStack>
            </Flex>
            <Flex bg="var(--color-honeydew-100)" display={{ base: "none", md: "flex" }} alignItems="center" flex={1}>
                <Box ml="2.5rem" mr="6.14rem">
                    <Img objectFit="cover" alt="" src="/images/group-427320333@2x.png" />
                </Box>
            </Flex>
        </Flex>
    );
};

export default WhyChoose;
