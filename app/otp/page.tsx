"use client";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, PinInput, PinInputField, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import UISignWrap from "@/components/UISignWrap";
import useCountdown from "@/hooks/useCountDown";
import { fetcher } from "@/utils/fetcher";
import { setInfoSign, setAccessToken } from "@/store/reducers/auth";
import { setToken } from "@/utils/auth";

const OTP = () => {
    const numberOfDigits = 6;
    const { otp, phoneNumber } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const [otpState, setOtpState] = useState<Array<string>>(new Array(numberOfDigits).fill(""));
    const [_otpError, setOtpError] = useState<string>("");
    const otpBoxReference = useRef<Array<HTMLInputElement | any>>([]);
    const { seconds, formattedTime, resetCountdown } = useCountdown(120);
    const router = useRouter();

    function handleChange(value: string, index: number) {
        const newArr = [...otpState];
        newArr[index] = value;
        setOtpState(newArr);
    }

    const handleResend = async () => {
        const { data, statusCode } = await fetcher("auth/request-otp", "POST", {
            phoneNumber,
        });
        if (statusCode === 200) {
            dispatch(setInfoSign({ otp: data.otpCode, phoneNumber }));
            resetCountdown();
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (otpState.join("") !== otp) {
                setOtpError("Không trùng mã OTP");
            } else {
                const { data, statusCode } = await fetcher("auth/authenticate-otp", "POST", {
                    phoneNumber,
                    inputOTP: otp,
                });
                setOtpError("");
                if (statusCode === 200) {
                    setToken(data.access_token);
                    setAccessToken(data.access_token);
                    router.push("/phone_verification");
                }
            }
        }
        fetchData();
    }, [otpState, otp]);

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
                <Button variant="btnSubmit" onClick={handleResend}>
                    Gửi lại mã OTP
                </Button>
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
