"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Flex, PinInput, PinInputField, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import UISignWrap from "@/components/UISignWrap";
import useCountdown from "@/hooks/useCountDown";
import apiServices from "@/services/sevices";
import { setInfoSign, setAccessToken } from "@/store/reducers/auth";
import { RootState } from "@/store";
import { setToken } from "@/utils/auth";
import { routes } from "@/utils/routes";

const numberOfDigits = 6;

const PhoneVerification = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { phoneNumber, otp } = useSelector((state: RootState) => state.auth);

    const [otpState, setOtpState] = useState<Array<string>>(new Array(numberOfDigits).fill(""));
    const [_otpError, setOtpError] = useState<string>("");
    const otpBoxReference = useRef<Array<HTMLInputElement | any>>([]);
    const { seconds, formattedTime, resetCountdown } = useCountdown(120);

    const handleChange = useCallback(
        (value: string, index: number) => {
            const newArr = [...otpState];
            newArr[index] = value;
            setOtpState(newArr);
        },
        [otpState],
    );

    const handleResend = useCallback(async () => {
        try {
            const { data } = await apiServices.requestOTP({ phoneNumber });
            dispatch(setInfoSign({ otp: data.otpCode, phoneNumber }));
            resetCountdown();
        } catch (error) {
            console.error("Error while resending OTP:", error);
        }
    }, [dispatch, phoneNumber, resetCountdown]);

    const fetchData = useCallback(async () => {
        try {
            if (otpState.join("") !== otp) {
                setOtpError("Không trùng mã OTP");
            } else {
                const { data } = await apiServices.authtOTP({ phoneNumber, inputOTP: otp });
                setOtpError("");
                setToken(data.access_token);
                dispatch(setAccessToken(data.access_token));
                router.push(routes.AdditionalSignUpInfo);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    }, [otpState, otp, phoneNumber, dispatch, router]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                <Button isDisabled={seconds !== 0} variant="btnSubmit" onClick={handleResend}>
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

export default PhoneVerification;
