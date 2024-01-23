import { Flex, HStack, IconButton, Img, Text, VStack } from "@chakra-ui/react";
import { ProductTypeList } from "types";

const MenuItem = ({
    name,
    price,
    images,
    merchart,
    currentPrice,
    cook_method,
    time,
    ingredientName,
    distance,
    ratings,
    kcal,
}: ProductTypeList) => {
    return (
        <Flex
            position="relative"
            overflow="hidden"
            h="100%"
            borderRadius="2.4rem"
            boxShadow="var(--box-shadow-md)"
            bg="white"
            minW={{ base: "calc(100% - 5rem)", md: "38.4rem" }}
            maxW={{ base: "unset", md: "38.4rem" }}
            flexDir="column"
        >
            <Flex flexDir="column" background="var(--primary-color)" p="0.8rem 1.6rem 3.2rem 1.6rem">
                {price && (
                    <Text fontWeight="bold" lineHeight="2rem" fontSize="1.6rem" color="var(--color-gold)">
                        GIẢM GIÁ
                    </Text>
                )}
                <Img px="2rem" src={images} alt="product" />
            </Flex>
            <VStack align="flex-start" p="0.8rem 2.4rem" spacing="0.4rem">
                <Text variant="ellipse" color="var(--gray-900)" fontWeight="bold" fontSize="2.4rem">
                    {name}
                </Text>
                <Text as="span" className="chef-name" fontSize="1.4rem" lineHeight="2rem" color="var(--gray-600)">
                    <Text as="span">by </Text>
                    <Text as="span" fontWeight="bold" color="var(--color-mediumslateblue)">
                        {merchart}
                    </Text>
                </Text>
                <Flex w="100%" fontSize="1.6rem" color="var(--gray-500)" justifyContent="space-between">
                    <HStack spacing="0.8rem">
                        <HStack spacing="0.4rem">
                            <Img w="2.4rem" h="2.4rem" alt="" src="/images/markerpin02.svg" />
                            <Text wordBreak="keep-all" className="kcal font-weight-600">
                                {kcal} Kcal
                            </Text>
                        </HStack>
                        <HStack spacing="0.4rem" className="d-flex align-items-center gap-1">
                            <Img w="2.4rem" h="2.4rem" alt="" src="/images/star-icon1.svg" />
                            <Text wordBreak="keep-all" className="text">
                                {ratings}
                            </Text>
                        </HStack>
                    </HStack>
                    <HStack ml="0.5rem" spacing="0.8rem">
                        <HStack spacing="0.4rem">
                            <Img w="2.4rem" h="2.4rem" alt="" src="/images/markerpin021.svg" />
                            <Text wordBreak="keep-all" className="text">
                                {distance} km
                            </Text>
                        </HStack>
                        <HStack spacing="0.4rem">
                            <Img w="2.4rem" h="2.4rem" alt="" src="/images/timer.svg" />
                            <Text wordBreak="keep-all" className="text">
                                {time} min
                            </Text>
                        </HStack>
                    </HStack>
                </Flex>
                <Text minH="4rem" color="var(--gray-600)" as="span" fontSize="1.4rem" className="text-ellipsis">
                    <Text as="span" wordBreak="keep-all" color="var(--color-mediumslateblue)" fontWeight="bold">
                        {cook_method}
                    </Text>
                    <Text wordBreak="break-word" fontWeight="medium" as="span">
                        {ingredientName && ` |  ${ingredientName}`}
                    </Text>
                </Text>
                <HStack h="3rem" color="black" fontSize="1.6rem" spacing="0.8rem">
                    <Text textDecoration="line-through" textDecorationThickness="1px">
                        {price?.toLocaleString()}
                    </Text>
                    <Text fontSize="2.4rem" fontWeight="bold">
                        {currentPrice?.toLocaleString()}
                    </Text>
                </HStack>
                <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/frame-2729.svg" />
                    <Text>Ưu đãi đến 50k</Text>
                </HStack>
                <HStack color="var(--gray-600)" spacing="0.4rem" fontSize="1.6rem" fontWeight="medium">
                    <Img w="2.4rem" h="2.4rem" alt="" src="/images/frame-2725.svg" />
                    <Text>Đặt trước 09:00 giờ sáng để điều chỉnh vị</Text>
                </HStack>
            </VStack>
            <IconButton
                position="absolute"
                bottom="5rem"
                right="2.5rem"
                w="4rem"
                h="4rem"
                _hover={{ opacity: 0.7 }}
                _active={{ opacity: 0.5 }}
                borderRadius="50%"
                aria-label="add-btn"
                icon={<Img src="/images/plus.svg" />}
            />
        </Flex>
    );
};

export default MenuItem;