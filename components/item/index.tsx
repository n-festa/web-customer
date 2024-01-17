import { Flex, HStack, Img, Text, VStack } from "@chakra-ui/react";
import { ProductTypeList } from "types";

const MenuItem = ({
    name,
    price,
    images,
    merchart,
    currentPrice,
    cook_method,
    time,
    ingredient,
    distance,
    ratings,
    kcal,
}: ProductTypeList) => {
    return (
        <Flex
            overflow="hidden"
            h="100%"
            borderRadius="2.4rem"
            boxShadow="var(--box-shadow-md)"
            bg="white"
            w="100%"
            flexDir="column"
        >
            <Flex flexDir="column" background="var(--primary-color)" p="0.8rem 1.6rem 3.2rem 1.6rem">
                {price && (
                    <Text fontWeight="bold" lineHeight="2rem" fontSize="1.6rem" color="var(--color-gold)">
                        GIẢM GIÁ
                    </Text>
                )}
                <Img px="2rem" src={images ? images[0] : ""} alt="product" />
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
                            <Text className="kcal font-weight-600">{kcal} Kcal</Text>
                        </HStack>
                        <HStack spacing="0.4rem" className="d-flex align-items-center gap-1">
                            <Img w="2.4rem" h="2.4rem" alt="" src="/images/star-icon1.svg" />

                            <Text className="text">{ratings}</Text>
                        </HStack>
                    </HStack>
                    <HStack spacing="0.8rem">
                        <HStack spacing="0.4rem">
                            <Img w="2.4rem" h="2.4rem" alt="" src="/images/markerpin021.svg" />

                            <Text className="text">{distance} km</Text>
                        </HStack>
                        <HStack spacing="0.4rem">
                            <Img w="2.4rem" h="2.4rem" alt="" src="/images/timer.svg" />
                            <Text className="text">{time} min</Text>
                        </HStack>
                    </HStack>
                </Flex>
                <Text minH="4rem" color="var(--gray-600)" as="span" fontSize="1.4rem" className="text-ellipsis">
                    <Text as="span" wordBreak="keep-all" color="var(--color-mediumslateblue)" fontWeight="bold">
                        {cook_method}
                    </Text>
                    <Text wordBreak="break-word" fontWeight="medium" as="span">
                        {` | ${ingredient.map((item) => item.name).join(", ")}`}{" "}
                    </Text>
                </Text>
                <HStack h="3rem" color="black" fontSize="1.6rem" spacing="0.8rem">
                    <Text textDecoration="line-through" textDecorationThickness="1px">
                        {price}
                    </Text>
                    <Text fontSize="2.4rem" fontWeight="bold">
                        {currentPrice}
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
        </Flex>
    );
};

export default MenuItem;
