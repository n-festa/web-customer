import { Button, Box, Center, Image, Text, InputGroup, InputLeftAddon, Input } from "@chakra-ui/react";

const Login = () => {
    return (
        <Center mt="4.0rem" w="100%" h="100%" bg="white">
            <Box bg="white" w="100%" maxW="45.6rem" p="0 1.5rem">
                <Box w="100%" maxW="40.0rem" m="0 auto 1.6rem" p="2.8rem 4.5rem" bg="#00473C">
                    <Image
                        w="100$"
                        maxW="31.1rem"
                        h="auto"
                        borderRadius="0.6rem"
                        objectFit="cover"
                        src="/images/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-3@2x.png"
                        alt="product"
                    />
                </Box>
                <Text mb="1.6rem" fontSize="3rem" fontWeight="700" color="#8DC63F" textAlign="center">
                    Đặt ngay bữa ăn ngon & lành của riêng bạn!
                </Text>
                <Box m="0 3.5rem">
                    <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem" color="#344054">
                        Điền số điện thoại của bạn
                    </Text>
                    <InputGroup border=".1rem solid #D0D5DD" borderRadius=".8rem" h="4.0rem" mb="0.6rem">
                        <InputLeftAddon h="4.0rem" pr="1.0rem">
                            <Image src="/images/vn.png" alt="Dan Abramov" w="1.6rem" h="1.6rem" mr=".2rem" />
                            <Image src="/images/chevrondown1.svg" alt="Dan Abramov" w="1.6rem" h="1.6rem" mr=".2rem" />
                        </InputLeftAddon>
                        <Input
                            border="none"
                            h="4.0rem"
                            type="tel"
                            placeholder="+84 (555) 000-0000"
                            fontSize="1.6rem"
                            fontWeight="400"
                            color="#667085"
                            p="0"
                        />
                    </InputGroup>
                    <Text fontSize="1.4rem" fontWeight="400" mb="1.6rem" color="#475467">
                        Chúng tôi sẽ gửi tới số điện thoại bạn đăng ký mã số OTP để kích hoạt tài khoản
                    </Text>
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
                        Tiếp tục
                    </Button>
                </Box>
            </Box>
        </Center>
    );
};

export default Login;
