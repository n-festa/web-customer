"use client";
import { HighlightedText } from "@/components/atoms/Label/HighlightedLabel";
import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import UISignWrap from "@/components/molecules/UISignWrap";
import useCountdown from "@/hooks/useCountDown";
import apiServices from "@/services/sevices";
import { setInfoSign } from "@/store/reducers/auth";
import { setUserInfo } from "@/store/reducers/userInfo";
import { setToken, setTokenRefresh } from "@/utils/auth";
import { isTimeDiffMoreThan30Min, redirectAfterLogin } from "@/utils/functions";
import { loadState, removeState, saveState } from "@/utils/localstorage";
import { routes } from "@/utils/routes";
import { Box, Button, Flex, PinInput, PinInputField, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const numberOfDigits = 6;

const PhoneVerification = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { phoneNumber, otp } = loadState("infoSign");
    const [otpState, setOtpState] = useState<Array<string>>(new Array(numberOfDigits).fill(""));
    const [_otpError, setOtpError] = useState<string>("");
    const [numberError, setNumberError] = useState<number>(1);
    const [numberResend, setNumberResend] = useState<number>(1);
    const [isLock, setIsLock] = useState<boolean>(false);
    const otpBoxReference = useRef<Array<HTMLInputElement | null>>([]);
    const { seconds, formattedTime, resetCountdown } = useCountdown(30);
    const restrictStorage = loadState("restrict");
    const { formattedTime: lockFormattedTime, changeInitialValue } = useCountdown(0);

    const handleChange = (value: string, index: number) => {
        const newArr = [...otpState];
        if (value.length === numberOfDigits) {
            value.split("").forEach((char, i) => {
                newArr[index + i] = char;
            });
        } else {
            newArr[index] = value;
        }
        setOtpState(newArr);
    };

    const handleNumberError = async () => {
        const currentTime = new Date();
        const storedExpiration = {
            time: currentTime.setMinutes(currentTime.getMinutes() + 30),
            phoneNumber,
        };
        saveState("restrict", storedExpiration);
        setIsLock(true);
        changeInitialValue(1800);
        await dialogRef.current?.show({
            title: "Thông báo",
            message: "Bạn đã nhập 5 lần không chính xác. Vui lòng thử lại sau 30 phút.",
            negative: {
                text: "Đóng",
                onClick: async () => {
                    router.push(routes.Home);
                },
            },
        });
    };

    const handleResend = useCallback(async () => {
        try {
            if (numberResend <= 5) {
                const { data } = await apiServices.requestOTP({ phoneNumber });
                dispatch(setInfoSign({ otp: data.otpCode, phoneNumber }));
                setNumberResend((prev) => prev + 1);
                setNumberError(1);
                resetCountdown();
                setOtpState(new Array(numberOfDigits).fill(""));
            } else {
                router.push(routes.SignIn);
            }
        } catch (error) {
            console.error("Error while resending OTP:", error);
        }
    }, [dispatch, numberResend, phoneNumber, resetCountdown, router]);

    const handleOtpMismatch = () => {
        if (numberError >= 3) {
            setOtpError(`Bạn đã nhập ${numberError} lần không chính xác`);
            setNumberError(numberError + 1);
            if (numberError > 5) {
                handleNumberError();
            }
        } else {
            setNumberError(numberError + 1);
        }
    };

    const handleSuccessfulOtpVerification = async () => {
        const { data } = await apiServices.authOTP({ phoneNumber, inputOTP: otp });
        const { access_token, refresh_token, userId } = data;

        setOtpError("");
        setToken(access_token);
        setTokenRefresh(refresh_token);

        const { data: customerData } = await apiServices.customerProfile({ userId });
        dispatch(setUserInfo(customerData));
        if (customerData.name) {
            redirectAfterLogin(router);
        } else {
            router.push(routes.AdditionalSignUpInfo);
        }
    };

    const fetchData = useCallback(async () => {
        try {
            const isFillOtp = otpState.every((el) => el !== "");
            if (isFillOtp) {
                if (otpState.join("") !== otp) {
                    handleOtpMismatch();
                } else {
                    await handleSuccessfulOtpVerification();
                }
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    }, [otpState, otp]);

    useEffect(() => {
        fetchData();
    }, [otpState, otp, numberError, phoneNumber, fetchData]);

    useEffect(() => {
        if (restrictStorage) {
            const { beingLocked, timeDifferenceInMinutes } = isTimeDiffMoreThan30Min(restrictStorage.time);
            if (beingLocked) {
                setIsLock(true);
                changeInitialValue(timeDifferenceInMinutes * 60);
                router.push(routes.SignIn);
            } else {
                removeState("restrict");
            }
        }
    }, []);

    useEffect(() => {
        console.log({ otp });
    }, [otp]);

    return (
        <UISignWrap maxW="45.6rem">
            <Box bg="white">
                <Text fontSize="2.4rem" fontWeight="700" mb="1.2rem" color="var(--gray-950)">
                    Xác nhận mã OTP
                </Text>
                <HighlightedText
                    text="Nhập mã OTP 6 chữ số được gửi tới số điện thoại bạn đăng ký. Mã OTP chỉ có hiệu lực trong vòng 2 phút."
                    fontSize="1.4rem"
                    fontWeight="400"
                    mb="3.2rem"
                    color="var(--gray-600)"
                    highlightStyle={{ color: "var(--gray-600)", fontWeight: "700" }}
                    highlight="2 phút."
                ></HighlightedText>
                <Box mb="3.2rem">
                    <Flex gap="0.8rem">
                        <PinInput placeholder="0" otp>
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
                                    pointerEvents={isLock ? "none" : "unset"}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    ref={(reference) => (otpBoxReference.current[index] = reference)}
                                />
                            ))}
                        </PinInput>
                    </Flex>
                    {!isLock && (
                        <Text mt="1rem" fontSize="1.4rem" color="#E53E3E">
                            {_otpError}
                        </Text>
                    )}
                    {isLock && (
                        <Text mt="1rem" fontSize="1.4rem" color="#E53E3E">
                            Khách hàng đã thao tác quá số lần quy định. <br />
                            Vui lòng chờ {lockFormattedTime} để có thể thao tác tiếp.
                        </Text>
                    )}
                </Box>
                <Button
                    isDisabled={seconds > 0 || isLock}
                    variant={seconds > 0 || isLock ? "btnDisable" : "btnSubmit"}
                    onClick={handleResend}
                >
                    Gửi lại mã OTP
                </Button>
                <Text fontSize="1.4rem" fontWeight="400" textAlign="center" mt="0.8rem">
                    {formattedTime}
                </Text>
            </Box>
        </UISignWrap>
    );
};

export default PhoneVerification;
