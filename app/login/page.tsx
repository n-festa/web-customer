"use client";
import { Box, Image, Text, InputGroup, InputLeftAddon, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import UIButton from "@/components/UIButton";
import UISignWrap from "@/components/UISignWrap";
// import { fetcher } from "@/utils/fetcher";

const Login = () => {
    const router = useRouter();
    const handleSubmit = async (
        _values: { number_phone: string },
        _actions: FormikHelpers<{ number_phone: string }>,
    ) => {
        // const { data } = await fetcher("/api/signup", "POST", { number_phone: values.number_phone });
        await setTimeout(() => {
            router.push("/otp");
        }, 1000);
    };
    return (
        <UISignWrap maxW="45.6rem">
            <Box bg="white">
                <Box w="100%" maxW="40.0rem" m="0 auto 1.6rem" p="2.8rem 4.5rem" bg="#00473C">
                    <Image
                        w="100$"
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
                        initialValues={{ number_phone: "" }}
                        validationSchema={Yup.object({
                            number_phone: Yup.string().required("Required"),
                        })}
                        onSubmit={(values, actions) => {
                            handleSubmit(values, actions);
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name="number_phone">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <FormControl isInvalid={form.errors.number_phone}>
                                            <InputGroup
                                                border=".1rem solid #D0D5DD"
                                                borderRadius=".8rem"
                                                h="4.0rem"
                                                mb="0.6rem"
                                            >
                                                <InputLeftAddon h="4.0rem" pr="1.0rem">
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
                                                    p="0"
                                                    {...field}
                                                />
                                            </InputGroup>
                                            <FormErrorMessage>{form.errors.number_phone}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Text fontSize="1.4rem" fontWeight="400" mb="1.6rem" color="#475467">
                                    Chúng tôi sẽ gửi tới số điện thoại bạn đăng ký mã số OTP để kích hoạt tài khoản
                                </Text>

                                <UIButton isLoading={props.isSubmitting} type="submit">
                                    Tiếp tục
                                </UIButton>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </UISignWrap>
    );
};

export default Login;
