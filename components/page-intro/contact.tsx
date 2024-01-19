import {
    Button,
    Checkbox,
    Flex,
    FlexProps,
    HStack,
    Img,
    ImgProps,
    Input,
    Text,
    TextProps,
    Textarea,
    VStack,
} from "@chakra-ui/react";

const GroupBox = ({
    img,
    name,
    textProps,
    imgProps,
    ...props
}: FlexProps & { img: string; name: string; textProps?: TextProps; imgProps?: ImgProps }) => {
    return (
        <Flex
            position="absolute"
            borderRadius="1.8rem"
            background="white"
            justifyContent="center"
            gap="2.1rem"
            h="7.7rem"
            alignItems="center"
            zIndex={1}
            boxShadow="0px 24px 48px -12px rgba(16, 24, 40, 0.18)"
            {...props}
        >
            <Img alt="" src={img} {...imgProps} />
            <Text fontWeight="bold" fontSize="1.8rem" color="var(--gray-900)" {...textProps}>
                {name}
            </Text>
        </Flex>
    );
};
const Contact = () => {
    return (
        <Flex
            p="9.6rem 4.3rem"
            w="100%"
            bg="var(--light-bg-color)"
            alignItems="center"
            justifyContent={{ base: "center", lg: "space-between" }}
        >
            <Flex
                minH="76.8rem"
                w="57.6rem"
                borderRadius="2.4rem"
                flexDir="column"
                bg="white"
                boxShadow="var(--shadow-xl)"
                ml={{ base: "unset", lg: "3.1rem" }}
                p="5rem 4.8rem"
            >
                <Flex flexDir="column">
                    <Text fontWeight="bold" fontSize="3.6rem" color="var(--gray-900)" lineHeight="4.4rem" mb="2rem">
                        Liên hệ để trở thành đối tác của 2ALL hôm nay
                    </Text>
                    <Text fontSize="2rem" fontWeight="500" lineHeight="3rem" color="var(--gray-600)">
                        Chúng tôi chào đón đối tác trên toàn quốc để cùng cung cấp hàng triệu bữa ăn ngon và lành cho
                        khách hàng Việt Nam.
                    </Text>
                </Flex>
                <Flex flexDir="column" mt="4.8rem">
                    <VStack alignItems="flex-start" color="var(--gray-700)" spacing="0.6rem">
                        <Text fontSize="1.6rem" fontWeight={500} lineHeight="2rem">
                            Email
                        </Text>
                        <Input h="4.4rem" type="email" variant="email" placeholder="Vui lòng nhập email của bạn" />
                    </VStack>
                    <VStack mt="2.4rem" alignItems="flex-start" color="var(--gray-700)" spacing="0.6rem">
                        <Text fontSize="1.6rem" fontWeight={500} lineHeight="2rem">
                            Message
                        </Text>
                        <Textarea
                            outline={3}
                            h="13.4rem"
                            resize="none"
                            _active={{}}
                            _visited={{}}
                            _focusVisible={{}}
                            placeholder="Ví dụ: xin chào 2ALL, tôi có nhu cầu muốn hợp tác với bạn"
                            border="1px solid rgba(208, 213, 221, 1)"
                            boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                        />
                    </VStack>

                    <Flex justifyContent="space-between" mt="2.4rem" alignItems="center">
                        <Checkbox>Tôi không phải robot</Checkbox>
                        <Img h="5rem" w="5rem" alt="" src="/images/image-10@2x.png" />
                    </Flex>
                    <Button mt="3.2rem" h="6.2rem" borderRadius="3.2rem">
                        Gửi tin nhắn
                    </Button>
                </Flex>
            </Flex>
            <Flex justifyContent="center">
                <Flex
                    display={{ base: "none", lg: "flex" }}
                    ml="3rem"
                    alignItems="center"
                    position="relative"
                    w="52.5rem"
                    h="49.5rem"
                >
                    <Img
                        ml="2.2rem"
                        maxWidth="40rem"
                        maxHeight="30rem"
                        alt=""
                        src="/images/6387eec683aaf-4a9394222d47f1b9b99be468ed6d0a66transformed-4@2x.png"
                    />
                    <GroupBox
                        img={"/images/image-36x36@2x.png"}
                        name="Cải Kale"
                        bottom="0"
                        left="0"
                        width="18.4rem"
                        imgProps={{ width: "5.4rem", height: "5.1rem" }}
                    />
                    <GroupBox
                        w="15.5rem"
                        img={"/images/image-36x361@2x.png"}
                        name="Cà Chua"
                        bottom="6.5rem"
                        right="5rem"
                        h="6.522rem"
                        imgProps={{ width: "4.4rem", height: "4.1rem" }}
                        textProps={{
                            fontSize: "1.6rem",
                        }}
                    />

                    <Flex
                        position="absolute"
                        borderRadius="1.8rem"
                        background="white"
                        justifyContent="center"
                        h="7.7rem"
                        w="30rem"
                        right={0}
                        top={"1rem"}
                        alignItems="center"
                        zIndex={1}
                        boxShadow="0px 24px 48px -12px rgba(16, 24, 40, 0.18)"
                    >
                        <HStack spacing="1.2rem">
                            <Img
                                alt=""
                                w="6.9rem"
                                h="5.1rem"
                                src="/images/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-31@2x.png"
                            />

                            <VStack alignItems="flex-start" spacing="0.2rem" color="var(--gray-900)">
                                <Text fontWeight="bold" fontSize="1.8rem">
                                    Summer Avo Salad
                                </Text>
                                <Text fontSize="1.1rem" fontWeight={600}>
                                    Đang giao hàng
                                </Text>
                            </VStack>
                            <Text
                                bottom={"0.5rem"}
                                right={"2rem"}
                                color="var(--dark-grey)"
                                fontSize="1.31rem"
                                fontWeight={600}
                                position="absolute"
                            >
                                3:09 PM
                            </Text>
                        </HStack>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Contact;
