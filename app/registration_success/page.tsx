"use client";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import UISignWrap from "@/components/UISignWrap";
import { RootState } from "@/store";

const RegistrationSuccess = () => {
    const router = useRouter();
    const { profile } = useSelector((state: RootState) => state.auth);
    const health_info = {
        bmi: profile.health_info.bmi,
        recommended_dietary_allowance_kcal: profile.health_info.recommended_dietary_allowance_kcal,
    };
    const handleRedirect = () => {
        router.push("/");
    };
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
                            {health_info.bmi}
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
                            {health_info.recommended_dietary_allowance_kcal}
                        </Center>
                        <Text fontSize="1.8rem" fontWeight="500" textAlign="center" color="var(--gray-modern-950)">
                            Kcal/ ngày
                        </Text>
                    </Box>
                </Flex>
                <Button variant="btnSubmit" onClick={handleRedirect}>
                    Khám phá món ăn ngay hôm nay
                </Button>
            </Box>
        </UISignWrap>
    );
};

export default RegistrationSuccess;
