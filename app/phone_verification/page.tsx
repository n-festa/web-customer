"use client";
import { Box, Text, Flex, Stack, RadioGroup, Radio } from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import UIButton from "@/components/UIButton";
import UISignWrap from "@/components/UISignWrap";
import InputForm from "@/components/InputForm";
import config from "@/config";
import RadioCard from "@/components/RadioCard";
import { UserType } from "@/types";

// import { fetcher } from "@/utils/fetcher";

const {
    signUp: { formData, initialValues },
} = config;

const PhoneVerification = () => {
    const handleSubmit = async (_values: UserType, _actions: FormikHelpers<UserType>) => {
        console.log(_values);
    };
    return (
        <UISignWrap maxW="63rem" bg="var(--gray-100)">
            <Box p="4rem" w="100%" bg="white">
                <Text fontSize="2.4rem" fontWeight="700" mb="0.8rem" color="var(--gray-950)">
                    CHIA SẺ THÊM VỚI CHÚNG TÔI VỀ BẠN
                </Text>
                <Text fontSize="1.4rem" fontWeight="400" mb="3.2rem" color="var(--gray-600)">
                    Những thông tin bạn cung cấp sẽ giúp chúng tôi đưa ra những gợi ý về đồ ăn phù hợp hơn với thể trạng
                    và nhu cầu của bạn.
                </Text>
                <Box w="100%" maxW="36rem" m="0 auto">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            name: Yup.string().required("Required"),
                        })}
                        onSubmit={(values, actions) => {
                            handleSubmit(values, actions);
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name="name">
                                    {({ field }: { field: any; form: any }) => (
                                        <InputForm
                                            title="Tên"
                                            type="text"
                                            placeholder="Ví dụ: Nguyễn Văn A"
                                            {...field}
                                        ></InputForm>
                                    )}
                                </Field>
                                <Field name="email">
                                    {({ field }: { field: any; form: any }) => (
                                        <InputForm
                                            title="Email"
                                            placeholder="Ví dụ: nguyen.vana@email.com"
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Field name="birthday">
                                    {({ field }: { field: any; form: any }) => (
                                        <InputForm
                                            title="Ngày sinh"
                                            type="text"
                                            placeholder="Ví dụ: 27/07/1995"
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem">
                                    Giới tính
                                </Text>
                                <Field name="sex">
                                    {({ field }: { field: any; form: any }) => {
                                        const { onChange, ...rest } = field;
                                        return (
                                            <RadioGroup mb="1.6rem" {...rest}>
                                                <Stack direction="row" spacing={8}>
                                                    {formData.gender.map((data, index) => (
                                                        <Radio
                                                            variant="custom-width"
                                                            key={index}
                                                            className="custom-width"
                                                            fontSize="1.6rem"
                                                            fontWeight="400"
                                                            color="var(--gray-700)"
                                                            w="33.333%"
                                                            h="1.6rem"
                                                            size="lg"
                                                            colorScheme="green"
                                                            value={data.value}
                                                            onChange={onChange}
                                                        >
                                                            {data.content}
                                                        </Radio>
                                                    ))}
                                                </Stack>
                                            </RadioGroup>
                                        );
                                    }}
                                </Field>
                                <Flex gap="1rem">
                                    <Field name="height_m">
                                        {({ field }: { field: any; form: any }) => (
                                            <InputForm
                                                title="Chiều cao ( cm )"
                                                type="number"
                                                placeholder="Ví dụ: 163"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                    <Field name="weight_kg">
                                        {({ field }: { field: any; form: any }) => (
                                            <InputForm
                                                title="Cân nặng ( kg )"
                                                type="number"
                                                placeholder="Ví dụ: 58"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                </Flex>
                                <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem">
                                    Mức độ vận động hàng ngày
                                </Text>
                                <Flex gap="0.8rem" mb="1.6rem">
                                    {formData.physicalActivityLevel.map((data, index) => {
                                        return <RadioCard key={index}>{data.content}</RadioCard>;
                                    })}
                                </Flex>
                                <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem">
                                    Mức độ vận động hàng ngày
                                </Text>
                                <Flex gap="0.8rem" mb="1.6rem" flexWrap="wrap">
                                    {formData.currentDiet.map((data, index) => {
                                        return <RadioCard key={index}>{data.content}</RadioCard>;
                                    })}
                                </Flex>
                                <Field name="allergic_food">
                                    {({ field }: { field: any; form: any }) => (
                                        <InputForm
                                            title="Dị ứng với đồ ăn (nếu có)"
                                            type="text"
                                            placeholder="Ví dụ: sữa động vật, trứng..."
                                            note="Chia sẻ thêm về đồ ăn mà bạn bị dị ứng. Ví dụ: sữa động vật, trứng, hải sản (cá, tôm, cua...), thuỷ sản (cá, tôm, lươn...), các loại hạt (đậu nành, óc chố, hạnh nhân...)"
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Field name="chronic_disease">
                                    {({ field }: { field: any; form: any }) => (
                                        <InputForm
                                            title="Bệnh mãn tính (nếu có)"
                                            type="text"
                                            placeholder="Ví dụ: Cao huyết áp..."
                                            note="Tim, Cao huyết áp, Huyết áp thấp, Gout, Tiểu đường, hen suyễn, ung thư...."
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem">
                                    Chế độ ăn mong đợi
                                </Text>
                                <Field name="expected_diet">
                                    {({ field }: { field: any; form: any }) => {
                                        const { onChange, ...rest } = field;
                                        return (
                                            <RadioGroup mb="1.6rem" {...rest}>
                                                <Stack direction="column" spacing={8}>
                                                    {formData.expectedDiet.map((data, index) => (
                                                        <Radio
                                                            variant="custom-width"
                                                            key={index}
                                                            className="custom-width"
                                                            fontSize="1.6rem"
                                                            fontWeight="400"
                                                            color="var(--gray-700)"
                                                            w="33.333%"
                                                            h="1.6rem"
                                                            size="lg"
                                                            colorScheme="green"
                                                            value={data.value}
                                                            onChange={onChange}
                                                        >
                                                            {data.content}
                                                        </Radio>
                                                    ))}
                                                </Stack>
                                            </RadioGroup>
                                        );
                                    }}
                                </Field>
                                <UIButton isLoading={props.isSubmitting} type="submit">
                                    Hoàn tất
                                </UIButton>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </UISignWrap>
    );
};

export default PhoneVerification;
