"use client";
import UISignWrap from "@/components/molecules/UISignWrap";
import apiServices from "@/services/sevices";
import { setInfoSign } from "@/store/reducers/auth";
import { filedType, formType } from "@/types/form";
import { convertToInternationalFormat } from "@/utils/functions";
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
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const Login = () => {
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
        router.push(routes.Otp);
    };
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
                    Đặt ngay bữa ăn ngon & lành của riêng bạn!
                </Text>
                <Box m="0 3.5rem">
                    <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem" color="#344054">
                        Điền số điện thoại của bạn
                    </Text>
                    <Formik
                        initialValues={{ phoneNumber: "" }}
                        validationSchema={Yup.object({
                            phoneNumber: Yup.string()
                                .required("Vui lòng nhập số điện thoại")
                                .min(9, "Số điện thoại không hợp lệ")
                                .max(10, "Số điện thoại không hợp lệ")
                                .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
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
                                                        src="/images/vn.svg"
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
                                                >
                                                    +84
                                                </Text>
                                            </InputGroup>
                                            <FormErrorMessage fontSize="1.4rem">
                                                {form.errors.phoneNumber}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Text fontSize="1.4rem" fontWeight="400" m="1rem 0 1.6rem" color="#475467">
                                    Chúng tôi sẽ gửi tới số điện thoại bạn đăng ký mã số OTP để kích hoạt tài khoản
                                </Text>

                                <Button variant="btnSubmit" isLoading={props.isSubmitting} type="submit">
                                    Tiếp tục
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </UISignWrap>
    );
};

export default Login;
