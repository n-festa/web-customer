"use client";
import { useEffect, useRef, useState } from "react";
import { Box, Flex, PinInput, PinInputField, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import UIButton from "@/components/UIButton";
import UISignWrap from "@/components/UISignWrap";
import useCountdown from "@/hooks/useCountDown";
import { fetcher } from "@/utils/fetcher";

const OTP = () => {
    const numberOfDigits = 6;
    const [correctOTP, setCorrectOTP] = useState<String>("870256");
    const [otp, setOtp] = useState<Array<string>>(new Array(numberOfDigits).fill(""));
    const [_otpError, setOtpError] = useState<string>("");
    const otpBoxReference = useRef<Array<HTMLInputElement | any>>([]);
    const { seconds, formattedTime, resetCountdown } = useCountdown(120);
    const router = useRouter();

    function handleChange(value: string, index: number) {
        const newArr = [...otp];
        newArr[index] = value;
        setOtp(newArr);
    }

    const handleResend = async () => {
        const { data, statusCode } = await fetcher("https://api.2all.com.vn/web-customer/auth/request-otp", "POST", {
            phoneNumber: "0977742902",
        });
        if (statusCode === 200) {
            setCorrectOTP(data.otpCode);
            resetCountdown();
        }
    };

    useEffect(() => {
        if (otp.join("") !== correctOTP) {
            setOtpError("không trùng mã OTP");
        } else {
            setOtpError("");
            router.push("/phone_verification");
        }
    }, [otp, correctOTP]);

    return (
        <UISignWrap maxW="45.6rem">
            <Box bg="white">
                <Text fontSize="2.4rem" fontWeight="700" mb="1.2rem" color="var(--gray-950)">
                    Xác nhận mã OTP
                </Text>
                <Text fontSize="1.4rem" fontWeight="400" mb="3.2rem" color="var(--gray-600)">
                    Nhập mã OTP 6 chữ số được gửi tới số điện thoại bạn đăng ký. Mã OTP chỉ có hiệu lực trong vòng 2
                    phút.
                </Text>
                <Flex mb="3.2rem" gap="0.8rem">
                    <PinInput placeholder="0">
                        {Array.from({ length: 6 }, (_, index) => (
                            <PinInputField
                                key={index}
                                border="0.1rem solid var(--gray-300)"
                                h="6.4rem"
                                w="6.4rem"
                                fontSize="4.8rem"
                                fontWeight="500"
                                color="var(--gray-950)"
                                p="0.2rem 0.8rem 0.2rem 0.8rem"
                                textAlign="center"
                                borderRadius="0.8rem"
                                onChange={(e) => handleChange(e.target.value, index)}
                                ref={(reference) => (otpBoxReference.current[index] = reference)}
                            />
                        ))}
                    </PinInput>
                </Flex>
                <UIButton onClick={handleResend}>Gửi lại mã OTP</UIButton>
                <Text
                    fontSize="1.4rem"
                    fontWeight="400"
                    color={seconds === 0 ? "#E53E3E" : "var(--gray-950)"}
                    textAlign="center"
                    mt="0.8rem"
                >
                    {formattedTime}
                </Text>
            </Box>
        </UISignWrap>
    );
};

export default OTP;
