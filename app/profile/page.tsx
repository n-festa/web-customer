"use client";
import RadioCardGroup from "@/components/atoms/RadioCardGroup";
import InputForm from "@/components/molecules/InputForm";
import UISignWrap from "@/components/molecules/UISignWrap";
import config from "@/config";
import { RootState } from "@/store";
import { UserType } from "@/types";
import { filedType, formType } from "@/types/form";
import { Box, Button, Flex, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const {
    signUp: { formData, validationSchema },
} = config;

const Profile = () => {
    // const router = useRouter();
    // const dispatch = useDispatch();
    const [showExpect, setShowExpect] = useState(false);
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialValues = {
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        birthday: userInfo?.birthday,
        sex: userInfo?.sex || "",
        height_m: userInfo?.health_info?.height_m || "",
        weight_kg: userInfo?.health_info?.weight_kg || "",
        physical_activity_level: userInfo?.health_info?.physical_activity_level || "light",
        current_diet: userInfo?.health_info?.current_diet || "Hỗn hợp",
        allergic_food: userInfo?.health_info?.allergic_food || "",
        expected_diet: userInfo?.health_info?.expected_diet || "Thuần chay",
        expected_diet_diff: "",
    };

    const handleSubmit = async ({ expected_diet_diff, expected_diet, ...rest }: UserType) => {
        try {
            const expectedDietValue = expected_diet === "Khác" ? expected_diet_diff : expected_diet;
            console.log({ ...rest, expected_diet: expectedDietValue });
            // Edit profile
            // const { data } = await apiServices.createProfile({ ...rest, expected_diet: expectedDietValue });
            // dispatch(setUserInfo(data));
            // router.push(routes.RegistrationSuccess);
        } catch (error) {
            console.error("Error while resending OTP:", error);
        }
    };

    useEffect(() => {
        const hasExpect = formData.expectedDiet.some((item) => item.value === userInfo?.health_info?.expected_diet);
        if (hasExpect) {
            initialValues.expected_diet_diff = userInfo?.health_info?.expected_diet || "";
            initialValues.expected_diet = "Khác";
        }
        setShowExpect(!hasExpect);
    }, []);

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
                        validateOnBlur={true}
                        validateOnChange={false}
                        onSubmit={(values) => {
                            handleSubmit(values as UserType);
                        }}
                    >
                        {(props) => (
                            <Form>
                                <Field name="name">
                                    {({ field, form }: { field: filedType; form: formType }) => (
                                        <InputForm
                                            title="*Tên"
                                            type="text"
                                            placeholder="Ví dụ: Nguyễn Văn A"
                                            error={form.errors.name && form.touched?.name ? form.errors.name : ""}
                                            {...field}
                                        ></InputForm>
                                    )}
                                </Field>
                                <Field name="email">
                                    {({ field, form }: { field: filedType; form: formType }) => (
                                        <InputForm
                                            title="*Email"
                                            type="email"
                                            placeholder="Ví dụ: nguyen.vana@gmail.com"
                                            error={form.errors.email && form.touched?.email ? form.errors.email : ""}
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Field name="birthday">
                                    {({ field, form }: { field: filedType; form: formType }) => (
                                        <InputForm
                                            title="*Ngày sinh"
                                            type="date"
                                            placeholder="Ví dụ: 27/07/1995"
                                            error={
                                                form.errors.birthday && form.touched?.birthday
                                                    ? form.errors.birthday
                                                    : ""
                                            }
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem">
                                    *Giới tính
                                </Text>
                                <Field name="sex">
                                    {({ field }: { field: filedType; form: formType }) => {
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
                                        {({ field, form }: { field: filedType; form: formType }) => (
                                            <InputForm
                                                title="*Chiều cao ( cm )"
                                                type="number"
                                                placeholder="Ví dụ: 163"
                                                error={
                                                    form.errors.height_m && form.touched?.height_m
                                                        ? form.errors.height_m
                                                        : ""
                                                }
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                    <Field name="weight_kg">
                                        {({ field, form }: { field: filedType; form: formType }) => (
                                            <InputForm
                                                title="*Cân nặng ( kg )"
                                                type="number"
                                                placeholder="Ví dụ: 58"
                                                error={
                                                    form.errors.weight_kg && form.touched?.weight_kg
                                                        ? form.errors.weight_kg
                                                        : ""
                                                }
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                </Flex>
                                <Field mb="1.6rem" name="physical_activity_level">
                                    {({ field }: { field: filedType; form: formType }) => {
                                        const { onChange, ...rest } = field;
                                        return (
                                            <RadioCardGroup
                                                title="*Mức độ vận động hàng ngày"
                                                name="physical_activity_level"
                                                data={formData.physicalActivityLevel}
                                                {...rest}
                                                onChange={onChange}
                                            />
                                        );
                                    }}
                                </Field>
                                <Field mb="1.6rem" name="current_diet">
                                    {({ field }: { field: filedType; form: formType }) => {
                                        const { onChange, ...rest } = field;
                                        return (
                                            <RadioCardGroup
                                                title="Chế độ ăn hiện tại"
                                                name="current_diet"
                                                data={formData.currentDiet}
                                                {...rest}
                                                onChange={onChange}
                                            />
                                        );
                                    }}
                                </Field>
                                <Field name="allergic_food">
                                    {({ field }: { field: filedType; form: formType }) => (
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
                                    {({ field }: { field: filedType; form: formType }) => (
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
                                    {({ field }: { field: filedType; form: formType }) => {
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
                                                            onChange={(e) => {
                                                                onChange(e);
                                                                setShowExpect(e.target.value === "Khác");
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
                                {showExpect && (
                                    <Field name="expected_diet_diff">
                                        {({ field }: { field: filedType; form: formType }) => (
                                            <InputForm
                                                type="text"
                                                placeholder="Vui lòng điền tên chế độ ăn mong muốn"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                )}
                                <Button
                                    isDisabled={!props.isValid}
                                    variant="btnSubmit"
                                    mt="3.2rem"
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
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

export default Profile;
