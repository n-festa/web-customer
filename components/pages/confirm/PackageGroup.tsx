import { Box, Flex, HStack, Image, Switch, Text, VStack } from "@chakra-ui/react";
import GroupWrapper from "./GroupWrapper";

const PackageGroup = () => {
    return (
        <GroupWrapper title="Đóng gói">
            <VStack w="100%" spacing="0.8rem" color="black">
                <Flex alignItems="center" mt="0.8rem" w="100%" color="black">
                    <VStack fontSize="1.6rem" flex={1} alignItems="flex-start">
                        <Text fontWeight={600}>Đóng gói bằng hộp bã mía</Text>
                        <Text>3,000 đ</Text>
                    </VStack>
                    <HStack flex={1}>
                        <Box w="10rem" h="10rem">
                            <Image borderRadius="0.8rem" src="/images/image-2.svg" alt="food-container-1" />
                        </Box>
                        <Box w="10rem" h="10rem">
                            <Image borderRadius="0.8rem" src="/images/image-3.svg" alt="food-container-2" />
                        </Box>
                    </HStack>
                </Flex>
                <Flex minW="fit-content" alignItems="center" mt="0.8rem" w="100%" color="black">
                    <VStack fontSize="1.6rem" flex={1} alignItems="flex-start">
                        <Text fontWeight={600}>Dụng cụ ăn uống</Text>
                        <Text>Chỉ yêu cầu dụng dụ ăn uống khi bạn thực sự cần</Text>
                    </VStack>
                    <Flex flex={1}>
                        <Switch id="isCheckedr" variant={"green"} size="lg"></Switch>
                    </Flex>
                </Flex>
            </VStack>
        </GroupWrapper>
    );
};

export default PackageGroup;
