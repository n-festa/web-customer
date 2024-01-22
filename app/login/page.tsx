"use client";
import UISignWrap from "@/components/UISignWrap";
import { fetcher } from "@/utils/fetcher";
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
import * as Yup from "yup";

const Login = () => {
    const router = useRouter();
    const handleSubmit = async (_values: { phoneNumber: string }, _actions: FormikHelpers<{ phoneNumber: string }>) => {
        const { data, statusCode } = await fetcher("auth/request-otp", "POST", {
            phoneNumber: _values.phoneNumber,
        });
        if (statusCode === 200) {
            const { otpCode, phoneNumber } = data;
            console.log(otpCode, phoneNumber);
            router.push("/otp");
        }
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
                                .length(10, "Vui lòng nhập đúng 10 số"),
                        })}
                        onSubmit={(values, actions) => {
                            handleSubmit(values, actions);
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name="phoneNumber">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <FormControl isInvalid={form.errors.phoneNumber}>
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
                                                        src="/images/vn.png"
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
                                                    placeholder="+84 (555) 000-0000"
                                                    fontSize="1.6rem"
                                                    fontWeight="400"
                                                    color="#667085"
                                                    pl="5.7rem"
                                                    {...field}
                                                />
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
