"use client";
import UISignWrap from "@/components/molecules/UISignWrap";
import { showCartState } from "@/recoil/recoilState";
import apiServices from "@/services/sevices";
import { setInfoSign } from "@/store/reducers/auth";
import { filedType, formType } from "@/types/form";
import { convertToInternationalFormat } from "@/utils/functions";
import { saveState } from "@/utils/localstorage";
import { routes } from "@/utils/routes";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSetRecoilState } from "recoil";
import * as Yup from "yup";
import { useTranslations } from "next-intl";

const Login = () => {
    const t = useTranslations();
    const setShow = useSetRecoilState(showCartState);
    const router = useRouter();
    const dispatch = useDispatch();
    const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const handleSubmit = async (_values: { phoneNumber: string }, _actions: FormikHelpers<{ phoneNumber: string }>) => {
        const valuePhone = convertToInternationalFormat(_values.phoneNumber);
        const { data } = await apiServices.requestOTP({
            phoneNumber: valuePhone,
        });
        dispatch(setInfoSign({ otp: data.otpCode, phoneNumber: data.phoneNumber }));
        saveState("infoSign", { otp: data.otpCode, phoneNumber: data.phoneNumber });
        router.push(routes.Otp);
    };

    useEffect(() => {
        setShow(false);
    }, [setShow]);

    return (
        <UISignWrap maxW="45.6rem">
            <Box bg="white">
                <Box w="100%" maxW="40.0rem" m="0 auto 1.6rem" p="2.8rem 4.5rem" bg="#00473C">
                    <Image
                        w="100%"
                        maxW="31.1rem"
                        h="auto"
                        borderRadius="0.6rem"
                        objectFit="cover"
                        src="/images/6387ec276a4eb-62aa10dfb2adca268416cf2fd03d82f5transformed-3@2x.png"
                        alt="product"
                    />
                </Box>
                <Text mb="1.6rem" fontSize="3rem" fontWeight="700" color="#8DC63F" textAlign="center">
                    {t("SIGN_IN.TITLE")}
                </Text>
                <Box m="0 3.5rem">
                    <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem" color="#344054">
                        {t("SIGN_IN.PROVIDE_PHONE")}
                    </Text>
                    <Formik
                        initialValues={{ phoneNumber: "" }}
                        validationSchema={Yup.object({
                            phoneNumber: Yup.string()
                                .required(t("SIGN_IN.PHONE_NUMBER_PROMPT"))
                                .min(9, t("SIGN_IN.INVALID_PHONE_NUMBER_MESSAGE"))
                                .max(10, t("SIGN_IN.INVALID_PHONE_NUMBER_MESSAGE"))
                                .matches(phoneRegExp, t("SIGN_IN.INVALID_PHONE_NUMBER_MESSAGE")),
                        })}
                        onSubmit={(values, actions) => {
                            handleSubmit(values, actions);
                        }}
                        onKeyPress={(e: { key: string; preventDefault: () => void }) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                            }
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name="phoneNumber">
                                    {({ field, form }: { field: filedType; form: formType }) => (
                                        <FormControl isInvalid={!!form.errors.phoneNumber}>
                                            <InputGroup
                                                position="relative"
                                                border=".1rem solid #D0D5DD"
                                                borderRadius=".8rem"
                                                h="4.0rem"
                                                mb="0.6rem"
                                                overflow="hidden"
                                                borderColor={form.errors.phoneNumber && "#E53E3E"}
                                            >
                                                <InputLeftAddon
                                                    position="absolute"
                                                    top="0"
                                                    left="0"
                                                    bottom="0"
                                                    w="5.6rem"
                                                    h="4.0rem"
                                                    pr="1.0rem"
                                                    zIndex={2}
                                                >
                                                    <Image
                                                        src="/images/vi.svg"
                                                        alt="Dan Abramov"
                                                        w="1.6rem"
                                                        h="1.6rem"
                                                        mr=".2rem"
                                                    />
                                                    <Image
                                                        src="/images/chevrondown1.svg"
                                                        alt="Dan Abramov"
                                                        w="1.6rem"
                                                        h="1.6rem"
                                                        mr=".2rem"
                                                    />
                                                </InputLeftAddon>
                                                <Input
                                                    border="none"
                                                    h="4.0rem"
                                                    type="tel"
                                                    placeholder="(555) 000-0000"
                                                    fontSize="1.6rem"
                                                    fontWeight="400"
                                                    color="#667085"
                                                    pl="9rem"
                                                    pb="0.2rem"
                                                    {...field}
                                                />
                                                <Text
                                                    position="absolute"
                                                    left="5.7rem"
                                                    top="50%"
                                                    transform="translateY(-50%)"
                                                    fontSize="1.6rem"
                                                    fontWeight="400"
                                                    color="#667085"
                                                    zIndex="1"
                                                >
                                                    +84
                                                </Text>
                                            </InputGroup>
                                            <FormErrorMessage fontSize="1.4rem">
                                                {form.errors.phoneNumber}
                                            </FormErrorMessage>
                                            <Text fontSize="1.4rem" fontWeight="400" m="1rem 0 1.6rem" color="#475467">
                                                {t("SIGN_IN.OTP_MESSAGE")}
                                            </Text>

                                            <Button
                                                isDisabled={!!form.errors.phoneNumber}
                                                variant={form.errors.phoneNumber ? "btnDisable" : "btnSubmit"}
                                                isLoading={props.isSubmitting}
                                                type="submit"
                                            >
                                                {t("BUTTON.CONTINUE")}
                                            </Button>
                                        </FormControl>
                                    )}
                                </Field>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </UISignWrap>
    );
};

export default Login;