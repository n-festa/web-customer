"use client";
import { svnGilroy } from "@/theme/fonts";
import { routes } from "@/utils/routes";
import { Button, Flex, Img, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
const Banner = () => {
    const router = useRouter();
    return (
        <Flex
            p="4rem"
            bg="var(--primary-color)"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            fontSize="6rem"
            color="white"
        >
            <Flex
                flexDir={{
                    base: "column-reverse",
                    md: "row",
                }}
                maxW="1240px"
                alignItems="center"
            >
                <Flex flexDir="column" flex={1}>
                    <Flex fontWeight="bold" flexDir="column">
                        <Text lineHeight="7.4rem" color="var(--sub-text-color)" className="mb-0">
                            Đặt ngay bữa ăn
                        </Text>
                        <Text lineHeight="7.4rem" color="var(--icterine-500)">
                            ngon & lành
                        </Text>
                        <Text lineHeight="7.4rem" color="var(--sub-text-color)">
                            của riêng bạn
                        </Text>
                        <Text className={svnGilroy.className} my="3rem" fontSize="1.8rem" lineHeight="2.4rem">
                            Một bữa ăn ngon lành, đầy đủ dưỡng chất, được chế biến theo khẩu vị của bạn. Không cần lo
                            nghĩ, không cần nấu, hẹn giờ giao linh hoạt.
                        </Text>
                    </Flex>
                    <InputGroup
                        p="1rem 1.6rem"
                        alignItems="center"
                        display="flex"
                        borderRadius="99px"
                        border="1px solid var(--gray-300)"
                        bg="var(--color-floralwhite)"
                        h="5.6rem"
                    >
                        <InputLeftElement ml="1.6rem" h="100%" pointerEvents="none">
                            <Img className="small-icon" alt="" src="/images/markerpin03.svg" />
                        </InputLeftElement>
                        <Input
                            placeholder="Nhập địa chỉ để tìm món ngon gần bạn"
                            ml="1.6rem"
                            fontSize="1.8rem"
                            mr="10.7rem"
                            variant="search"
                        />
                        <InputRightElement mr="1.6rem" h="100%" w="9.1rem">
                            <Button
                                h="3.6rem"
                                borderRadius="9rem"
                                variant="solid"
                                onClick={() => {
                                    router.push(routes.Search);
                                }}
                            >
                                Tìm món
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
                <Flex flex={1} ml="-2rem">
                    <Img maxW="100%" h="auto" src="images/screen-shot-20230829-at-11-28-37-pmtransformed-5@2x.png" />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Banner;
