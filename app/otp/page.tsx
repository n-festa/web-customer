import { Button, Box, Center, Text, Input, Flex } from "@chakra-ui/react";

const OTP = () => {
    return (
        <Flex w="100%" h="100%" bg="white">
            <Center m="4.0rem 0" w="100%" h="max-content">
                <Box bg="white" w="100%" maxW="45.4rem" p="0 1.5rem">
                    <Text fontSize="2.4rem" fontWeight="700" mb="1.2rem" color="var(--gray-950)">
                        Xác nhận mã OTP
                    </Text>
                    <Text fontSize="1.4rem" fontWeight="400" mb="3.2rem" color="#475467">
                        Nhập mã OTP 6 chữ số được gửi tới số điện thoại bạn đăng ký. Mã OTP chỉ có hiệu lực trong vòng 2
                        phút.
                    </Text>
                    <Flex mb="3.2rem" gap="0.8rem">
                        <Input
                            border="0.1rem solid #D0D5DD"
                            h="6.4rem"
                            w="6.4rem"
                            type="number"
                            placeholder="0"
                            fontSize="4.8rem"
                            fontWeight="400"
                            color="#D0D5DD"
                            p="0.2rem 0.8rem 0.2rem 0.8rem"
                            textAlign="center"
                            borderRadius="0.8rem"
                        />
                        <Input
                            border="0.1rem solid #D0D5DD"
                            h="6.4rem"
                            w="6.4rem"
                            type="number"
                            placeholder="0"
                            fontSize="4.8rem"
                            fontWeight="400"
                            color="#D0D5DD"
                            p="0.2rem 0.8rem 0.2rem 0.8rem"
                            textAlign="center"
                            borderRadius="0.8rem"
                        />
                        <Input
                            border="0.1rem solid #D0D5DD"
                            h="6.4rem"
                            w="6.4rem"
                            type="number"
                            placeholder="0"
                            fontSize="4.8rem"
                            fontWeight="400"
                            color="#D0D5DD"
                            p="0.2rem 0.8rem 0.2rem 0.8rem"
                            textAlign="center"
                            borderRadius="0.8rem"
                        />
                        <Input
                            border="0.1rem solid #D0D5DD"
                            h="6.4rem"
                            w="6.4rem"
                            type="number"
                            placeholder="0"
                            fontSize="4.8rem"
                            fontWeight="400"
                            color="#D0D5DD"
                            p="0.2rem 0.8rem 0.2rem 0.8rem"
                            textAlign="center"
                            borderRadius="0.8rem"
                        />
                        <Input
                            border="0.1rem solid #D0D5DD"
                            h="6.4rem"
                            w="6.4rem"
                            type="number"
                            placeholder="0"
                            fontSize="4.8rem"
                            fontWeight="400"
                            color="#D0D5DD"
                            p="0.2rem 0.8rem 0.2rem 0.8rem"
                            textAlign="center"
                            borderRadius="0.8rem"
                        />
                        <Input
                            border="0.1rem solid #D0D5DD"
                            h="6.4rem"
                            w="6.4rem"
                            type="number"
                            placeholder="0"
                            fontSize="4.8rem"
                            fontWeight="400"
                            color="#D0D5DD"
                            p="0.2rem 0.8rem 0.2rem 0.8rem"
                            textAlign="center"
                            borderRadius="0.8rem"
                        />
                    </Flex>
                    <Button
                        w="100%"
                        bg="#00473C"
                        colorScheme="#E6FF55"
                        fontSize="1.4rem"
                        fontWeight="600"
                        borderRadius="99.9rem"
                        h="3.6rem"
                        p="0.6rem 1.2rem"
                    >
                        Gửi lại mã OTP
                    </Button>
                    <Text fontSize="1.4rem" fontWeight="400" color="var(--gray-950)" textAlign="center" mt="0.8rem">
                        01:23
                    </Text>
                </Box>
            </Center>
        </Flex>
    );
};

export default OTP;
