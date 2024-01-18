import { Box, Center, Flex, Text } from "@chakra-ui/react";
import UISignWrap from "@/components/UISignWrap";
import UIButton from "@/components/UIButton";

const RegistrationSuccess = () => {
    return (
        <UISignWrap maxW="40.6rem">
            <Box>
                <Text fontSize="2.4rem" fontWeight="700" mb="3.2rem" color="var(--gray-950)" textAlign="center">
                    CHÚC MỪNG <br /> BẠN ĐÃ HOÀN THÀNH ĐĂNG KÍ
                </Text>
                <Flex justifyContent="space-between" flexWrap="wrap" mb="3.2rem">
                    <Box>
                        <Text fontSize="2.4rem" fontWeight="600" color="var(--gray-modern-950)" mb="1.6rem">
                            Chỉ số BMI
                        </Text>
                        <Center
                            textAlign="center"
                            w="11.6rem"
                            h="11.6rem"
                            border="2px solid var(--green-light-500)"
                            borderRadius="50%"
                            bg="var(--green-light-100)"
                            fontSize="3rem"
                            fontWeight="600"
                            color="var(--green-light-500)"
                            mb="0.8rem"
                        >
                            22.9
                        </Center>
                        <Text fontSize="1.8rem" textAlign="center" fontWeight="500" color="var(--gray-modern-950)">
                            Cân đối
                        </Text>
                    </Box>
                    <Box>
                        <Text
                            fontSize="2.4rem"
                            textAlign="center"
                            fontWeight="600"
                            color="var(--gray-modern-950)"
                            mb="1.6rem"
                        >
                            Năng lượng
                        </Text>
                        <Center
                            textAlign="center"
                            w="11.6rem"
                            h="11.6rem"
                            border="2px solid var(--green-light-500)"
                            borderRadius="50%"
                            bg="var(--green-light-100)"
                            fontSize="3rem"
                            fontWeight="600"
                            color="var(--green-light-500)"
                            mb="0.8rem"
                        >
                            2350
                        </Center>
                        <Text fontSize="1.8rem" fontWeight="500" textAlign="center" color="var(--gray-modern-950)">
                            Kcal/ ngày
                        </Text>
                    </Box>
                </Flex>
                <UIButton>Khám phá món ăn ngay hôm nay</UIButton>
            </Box>
        </UISignWrap>
    );
};

export default RegistrationSuccess;