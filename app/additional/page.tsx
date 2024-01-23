"use client";
import { Box, Button, Text, Flex, Stack, RadioGroup, Radio } from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import UISignWrap from "@/components/UISignWrap";
import InputForm from "@/components/InputForm";
import RadioCardGroup from "@/components/RadioCardGroup";
import apiServices from "@/services/sevices";
import config from "@/config";
import { UserType } from "@/types";
import { setProfile } from "@/store/reducers/auth";
import { routes } from "@/utils/routes";
const {
    signUp: { formData, initialValues, validationSchema },
} = config;

const Additional = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleSubmit = async (_values: UserType, _actions: FormikHelpers<UserType>) => {
        console.log(_values);
        try {
            const { data } = await apiServices.createProfile(_values);
            dispatch(setProfile(data));
            router.push(routes.Home);
        } catch (error) {
            console.error("Error while resending OTP:", error);
        }
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
                        validationSchema={validationSchema.validation}
                        onSubmit={(values, actions) => {
                            handleSubmit(values as UserType, actions as FormikHelpers<UserType>);
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name="name">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <InputForm
                                            title="Tên"
                                            type="text"
                                            placeholder="Ví dụ: Nguyễn Văn A"
                                            error={form.errors.name}
                                            {...field}
                                        ></InputForm>
                                    )}
                                </Field>
                                <Field name="email">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <InputForm
                                            title="Email"
                                            type="email"
                                            placeholder="Ví dụ: nguyen.vana@email.com"
                                            error={form.errors.email}
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Field name="birthday">
                                    {({ field, form }: { field: any; form: any }) => (
                                        <InputForm
                                            title="Ngày sinh"
                                            type="text"
                                            placeholder="Ví dụ: 27/07/1995"
                                            error={form.errors.birthday}
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
                                                            size="xxl"
                                                            colorScheme="green"
                                                            value={data.value}
                                                            onChange={(e) => {
                                                                onChange(e);
                                                            }}
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
                                        {({ field, form }: { field: any; form: any }) => (
                                            <InputForm
                                                title="Chiều cao ( cm )"
                                                type="number"
                                                placeholder="Ví dụ: 163"
                                                error={form.errors.height_m}
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                    <Field name="weight_kg">
                                        {({ field, form }: { field: any; form: any }) => (
                                            <InputForm
                                                title="Cân nặng ( kg )"
                                                type="number"
                                                placeholder="Ví dụ: 58"
                                                error={form.errors.weight_kg}
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                </Flex>
                                <Field mb="1.6rem" name="physical_activity_level">
                                    {({ field }: { field: any; form: any }) => {
                                        const { onChange, ...rest } = field;
                                        return (
                                            <RadioCardGroup
                                                title="Mức độ vận động hàng ngày"
                                                name="physical_activity_level"
                                                data={formData.physicalActivityLevel}
                                                {...rest}
                                                onChange={onChange}
                                            />
                                        );
                                    }}
                                </Field>
                                <Field mb="1.6rem" name="current_diet">
                                    {({ field }: { field: any; form: any }) => {
                                        const { onChange, ...rest } = field;
                                        return (
                                            <RadioCardGroup
                                                title="Chế độ ăn hiện tại"
                                                flexWrap="wrap"
                                                name="current_diet"
                                                data={formData.currentDiet}
                                                {...rest}
                                                onChange={onChange}
                                            />
                                        );
                                    }}
                                </Field>
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
                                <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem" color="var(--gray-700)">
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
                                                            h="1.6rem"
                                                            size="xxl"
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
                                <Button variant="btnSubmit" mt="3.2rem" isLoading={props.isSubmitting} type="submit">
                                    Hoàn tất
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </UISignWrap>
    );
};

export default Additional;
