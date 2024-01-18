"use client";
import UIButton from "@/components/UIButton";
import UISignWrap from "@/components/UISignWrap";
import { fetcher } from "@/utils/fetcher";
import { Box, Flex, PinInput, PinInputField, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useSwr from "swr";

const OTP = () => {
    const { data } = useSwr("/api/otp", fetcher);
    const correctOTP = data;
    const numberOfDigits = 6;
    const [otp, setOtp] = useState<Array<string>>(new Array(numberOfDigits).fill(""));
    const [_otpError, setOtpError] = useState<string>("");
    const otpBoxReference = useRef<Array<HTMLInputElement | any>>([]);

    function handleChange(value: string, index: number) {
        const newArr = [...otp];
        newArr[index] = value;
        setOtp(newArr);
        console.log(newArr);

        if (value && index < numberOfDigits - 1 && otpBoxReference.current[index + 1]) {
            otpBoxReference.current[index + 1].focus();
        } else {
            otpBoxReference.current[index].blur();
        }
    }

    useEffect(() => {
        if (otp.join("") !== correctOTP) {
            setOtpError("❌ Wrong OTP Please Check Again");
        } else {
            setOtpError("");
            // redirect
            alert("Chuyển trang");
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
                                type="number"
                                placeholder="0"
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
                    {/* {Array.from({ length: 6 }, (_, index) => (
                        <Input
                            key={index}
                            border="0.1rem solid var(--gray-300)"
                            h="6.4rem"
                            w="6.4rem"
                            type="number"
                            placeholder="0"
                            fontSize="4.8rem"
                            fontWeight="500"
                            color="var(--gray-950)"
                            p="0.2rem 0.8rem 0.2rem 0.8rem"
                            textAlign="center"
                            borderRadius="0.8rem"
                            onChange={(e) => handleChange(e.target.value, index)}
                            ref={(reference) => (otpBoxReference.current[index] = reference)}
                        />
                    ))} */}
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
