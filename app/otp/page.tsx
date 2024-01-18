import { Box, Text, Input, Flex } from "@chakra-ui/react";
import UIButton from "@/components/UIButton";
import UISignWrap from "@/components/UISignWrap";

const OTP = () => {
    return (
        <UISignWrap maxW="45.6rem">
            <Box bg="white">
                <Text fontSize="2.4rem" fontWeight="700" mb="1.2rem" color="var(--gray-950)">
                    Xác nhận mã OTP
                </Text>
                <Text fontSize="1.4rem" fontWeight="400" mb="3.2rem" color="#475467">
                    Nhập mã OTP 6 chữ số được gửi tới số điện thoại bạn đăng ký. Mã OTP chỉ có hiệu lực trong vòng 2
                    phút.
                </Text>
                <Flex mb="3.2rem" gap="0.8rem">
                    {Array.from({ length: 6 }, (_, index) => (
                        <Input
                            key={index}
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
                    ))}
                </Flex>
                <UIButton>Gửi lại mã OTP</UIButton>
                <Text fontSize="1.4rem" fontWeight="400" color="var(--gray-950)" textAlign="center" mt="0.8rem">
                    01:23
                </Text>
            </Box>
        </UISignWrap>
    );
};

export default OTP;
