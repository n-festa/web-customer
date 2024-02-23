"use client";
import RadioCardGroup from "@/components/atoms/RadioCardGroup";
import InputForm from "@/components/molecules/InputForm";
import UISignWrap from "@/components/molecules/UISignWrap";
import signUp from "@/config/signup.config";
import { RootState } from "@/store";
import { UserType } from "@/types";
import { filedType, formType } from "@/types/form";
import { Box, Button, Flex, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    // const router = useRouter();
    // const dispatch = useDispatch();
    const t = useTranslations();
    const tFormData = useTranslations("FORM.DATA_PROFILE");
    const { validationSchema, formData } = signUp(tFormData);
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
                    {t("ADDITIONAL.TITLE")}
                </Text>
                <Text fontSize="1.4rem" fontWeight="400" mb="3.2rem" color="var(--gray-600)">
                    {t("ADDITIONAL.DESCRIPTION")}
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
                                            title={t("FORM.NAME.LABEL")}
                                            type="text"
                                            placeholder={t("FORM.NAME.PLACEHOLDER")}
                                            error={form.errors.name && form.touched?.name ? form.errors.name : ""}
                                            {...field}
                                        ></InputForm>
                                    )}
                                </Field>
                                <Field name="email">
                                    {({ field, form }: { field: filedType; form: formType }) => (
                                        <InputForm
                                            title={t("FORM.EMAIL.LABEL")}
                                            type="email"
                                            placeholder={t("FORM.EMAIL.PLACEHOLDER")}
                                            error={form.errors.email && form.touched?.email ? form.errors.email : ""}
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Field name="birthday">
                                    {({ field, form }: { field: filedType; form: formType }) => (
                                        <InputForm
                                            title={t("FORM.BIRTH_DAY.LABEL")}
                                            type="date"
                                            placeholder={t("FORM.BIRTH_DAY.PLACEHOLDER")}
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
                                    {t("FORM.SEX.LABEL")}
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
                                                title={t("FORM.HEIGHT.LABEL")}
                                                type="number"
                                                placeholder={t("FORM.HEIGHT.PLACEHOLDER")}
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
                                                title={t("FORM.WEIGHT.LABEL")}
                                                type="number"
                                                placeholder={t("FORM.WEIGHT.PLACEHOLDER")}
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
                                                title={t("FORM.ACTIVITY_LEVEL.LABEL")}
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
                                                title={t("FORM.CURRENT_DIET.LABEL")}
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
                                            title={t("FORM.ALLERGIC_FOOD.LABEL")}
                                            type="text"
                                            placeholder={t("FORM.ALLERGIC_FOOD.PLACEHOLDER")}
                                            note={t("FORM.ALLERGIC_FOOD.NOTE")}
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Field name="chronic_disease">
                                    {({ field }: { field: filedType; form: formType }) => (
                                        <InputForm
                                            title={t("FORM.CHRONIC_DISEASE.LABEL")}
                                            type="text"
                                            placeholder={t("FORM.CHRONIC_DISEASE.PLACEHOLDER")}
                                            note={t("FORM.CHRONIC_DISEASE.NOTE")}
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <Text fontSize="1.6rem" fontWeight="600" mb="0.6rem" color="var(--gray-700)">
                                    {t("FORM.EXPECTED_DIET.LABEL")}
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
                                                placeholder={t("FORM.EXPECTED_DIET_DIFF.PLACEHOLDER")}
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                )}
                                <Button
                                    isDisabled={!props.isValid || !props.dirty}
                                    variant="btnSubmit"
                                    mt="3.2rem"
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
                                    {t("BUTTON.COMPLETE")}
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
