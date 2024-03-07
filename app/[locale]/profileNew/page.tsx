"use client";
import RadioCardGroup from "@/components/atoms/RadioCardGroup";
import InputForm from "@/components/molecules/InputForm";
import UISignWrap from "@/components/molecules/UISignWrap";
import UIField from "@/components/pages/profile/UIField";
import UIWrapInfo from "@/components/pages/profile/UIWrapInfo";
import BodyInformation from "@/components/pages/registration_success/BodyInformation";
import signUp from "@/config/signup.config";
import apiServices from "@/services/sevices";
import { setUserInfo } from "@/store/reducers/userInfo";
import { UserType } from "@/types";
import { filedType, formType } from "@/types/form";
import { loadState } from "@/utils/localstorage";
import { routes } from "@/utils/routes";
import { Box, Button, Flex, Radio, RadioGroup, Stack, Text, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Profile = () => {
    const t = useTranslations();
    const router = useRouter();
    const dispatch = useDispatch();
    const toast = useToast();
    const tFormData = useTranslations("FORM.DATA_PROFILE");
    const { userId } = loadState("infoSign");
    const { initialValues, validationSchema, formData } = signUp(tFormData);
    const [showExpect, setShowExpect] = useState(false);
    const [initialForm, setInitialForm] = useState<UserType>(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("showExpect", showExpect);
    const handleSubmit = async ({ expected_diet_diff, expected_diet, ...rest }: UserType, setSubmitting: any) => {
        try {
            const expectedDietValue = expected_diet === "Khác" ? expected_diet_diff : expected_diet;
            apiServices
                .updateCustomer({
                    ...rest,
                    expected_diet: expectedDietValue,
                    customer_id: userId,
                })
                .then(({ data }) => {
                    dispatch(setUserInfo(data));
                    toast({
                        title: t("COMMON.TOAST.PROFILE.TITLE"),
                        description: t("COMMON.TOAST.PROFILE.SUCCESS_CONTENT"),
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    router.push(routes.Home);
                    setSubmitting(false);
                })
                .catch((error) => {
                    // Xử lý khi Promise bị từ chối (thất bại)
                    console.log("Error while updating customer profile:", error);
                    toast({
                        title: t("COMMON.TOAST.PROFILE.TITLE"),
                        description: t("COMMON.TOAST.PROFILE.ERROR_CONTENT"),
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    setSubmitting(false);

                    // Đặt các hành động xử lý lỗi ở đây
                });
        } catch (error) {
            console.error("Error while resending OTP:", error);
        }
    };

    useEffect(() => {
        apiServices
            .customerProfile({ userId })
            .then((response) => {
                const { data: profile } = response;
                if (profile) {
                    const notExpect = formData.expectedDiet.some(
                        (item) => item.value === profile?.health_info?.expected_diet,
                    );
                    setShowExpect(!notExpect);
                    setInitialForm({
                        name: profile?.name || "",
                        email: profile?.email || "",
                        birthday: profile?.birthday,
                        sex: profile?.sex || "",
                        height_m: profile?.health_info?.height_m || "",
                        weight_kg: profile?.health_info?.weight_kg || "",
                        physical_activity_level: profile?.health_info?.physical_activity_level || "light",
                        current_diet: profile?.health_info?.current_diet || "Hỗn hợp",
                        allergic_food: profile?.health_info?.allergic_food || "",
                        expected_diet: notExpect ? profile?.health_info?.expected_diet || "Thuần chay" : "Khác",
                        expected_diet_diff: notExpect ? "" : profile?.health_info?.expected_diet,
                        chronic_disease: profile?.health_info?.chronic_disease || "",
                    });
                }
            })
            .catch((error) => {
                console.error("Error fetching customer profile:", error);
            });
    }, [userId]);

    return (
        <UISignWrap maxW="128rem" bg="var(--gray-100)">
            <Box p="4rem" w="100%" bg="white">
                <Formik
                    initialValues={initialForm}
                    enableReinitialize
                    validationSchema={validationSchema.validation}
                    validateOnBlur={true}
                    validateOnChange={false}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values as UserType, setSubmitting);
                    }}
                >
                    {(props) => (
                        <Form>
                            <Flex
                                justifyContent="space-between"
                                mb="3.2rem"
                                paddingBottom="2.1rem"
                                alignItems="flex-end"
                                borderBottom="1px solid #EAECF0"
                            >
                                <Box>
                                    <Text fontSize="2.4rem" fontWeight="700" mb="0.8rem" color="var(--gray-950)">
                                        {t("PROFILE.TITLE")}
                                    </Text>
                                    <Text fontSize="1.4rem" fontWeight="400" color="var(--gray-600)">
                                        {t("PROFILE.SUB_TITLE")}
                                    </Text>
                                </Box>
                                <Button variant="btnSubmit" w="10,6rem">
                                    {t("BUTTON.UPDATE")}
                                </Button>
                            </Flex>
                            <UIWrapInfo title={t("PROFILE.SEC_TITLE_1")} description={t("PROFILE.SEC_SUB_DESC_1")}>
                                <Box>
                                    <UIField title={t("FORM.FULL_NAME.LABEL")}>
                                        <Flex gap="2.4rem">
                                            <InputForm type="text" error={""}></InputForm>
                                            <InputForm type="text" error={""}></InputForm>
                                        </Flex>
                                    </UIField>
                                    <Field name="phoneNumber">
                                        {({ field, form }: { field: filedType; form: formType }) => (
                                            <UIField title={t("FORM.PHONE_NUMBER.LABEL")}>
                                                <Flex gap="2.4rem">
                                                    <InputForm
                                                        type="text"
                                                        error={
                                                            form.errors.name && form.touched?.name
                                                                ? form.errors.name
                                                                : ""
                                                        }
                                                        {...field}
                                                    ></InputForm>
                                                </Flex>
                                            </UIField>
                                        )}
                                    </Field>
                                    <Field name="email">
                                        {({ field, form }: { field: filedType; form: formType }) => (
                                            <UIField title={t("FORM.EMAIL.LABEL")}>
                                                <Flex gap="2.4rem">
                                                    <InputForm
                                                        type="text"
                                                        error={
                                                            form.errors.email && form.touched?.email
                                                                ? form.errors.email
                                                                : ""
                                                        }
                                                        {...field}
                                                    ></InputForm>
                                                </Flex>
                                            </UIField>
                                        )}
                                    </Field>
                                    <Field name="birthday">
                                        {({ field, form }: { field: filedType; form: formType }) => (
                                            <UIField title={t("FORM.BIRTH_DAY.LABEL")}>
                                                <InputForm
                                                    type="date"
                                                    placeholder={t("FORM.BIRTH_DAY.PLACEHOLDER")}
                                                    error={
                                                        form.errors.birthday && form.touched?.birthday
                                                            ? form.errors.birthday
                                                            : ""
                                                    }
                                                    {...field}
                                                />
                                            </UIField>
                                        )}
                                    </Field>
                                </Box>
                            </UIWrapInfo>
                            <UIWrapInfo title={t("PROFILE.SEC_TITLE_2")} description={t("PROFILE.SEC_SUB_DESC_2")}>
                                <Box>
                                    <Field name="sex">
                                        {({ field }: { field: filedType; form: formType }) => {
                                            const { onChange, ...rest } = field;
                                            return (
                                                <UIField title={t("FORM.SEX.LABEL")}>
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
                                                </UIField>
                                            );
                                        }}
                                    </Field>
                                    <UIField title={t("FORM.BODY_CONDITION.LABEL")}>
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
                                    </UIField>
                                    <UIField title={t("FORM.ACTIVITY_LEVEL.LABEL")}>
                                        <Field mb="1.6rem" name="physical_activity_level">
                                            {({ field }: { field: filedType; form: formType }) => {
                                                const { onChange, ...rest } = field;
                                                return (
                                                    <RadioCardGroup
                                                        name="physical_activity_level"
                                                        data={formData.physicalActivityLevel}
                                                        {...rest}
                                                        onChange={onChange}
                                                    />
                                                );
                                            }}
                                        </Field>
                                    </UIField>
                                    <UIField title={t("FORM.CURRENT_DIET.LABEL")}>
                                        <Field mb="1.6rem" name="current_diet">
                                            {({ field }: { field: filedType; form: formType }) => {
                                                const { onChange, ...rest } = field;
                                                return (
                                                    <RadioCardGroup
                                                        name="current_diet"
                                                        data={formData.currentDiet}
                                                        {...rest}
                                                        onChange={onChange}
                                                    />
                                                );
                                            }}
                                        </Field>
                                    </UIField>
                                    <UIField
                                        title={t("FORM.ALLERGIC_FOOD.LABEL")}
                                        description={t("FORM.ALLERGIC_FOOD.NOTE")}
                                    >
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
                                    </UIField>
                                    <UIField
                                        title={t("FORM.CHRONIC_DISEASE.LABEL")}
                                        description={t("FORM.CHRONIC_DISEASE.NOTE")}
                                    >
                                        <Field name="chronic_disease">
                                            {({ field }: { field: filedType; form: formType }) => (
                                                <InputForm
                                                    type="text"
                                                    placeholder={t("FORM.CHRONIC_DISEASE.PLACEHOLDER")}
                                                    {...field}
                                                />
                                            )}
                                        </Field>
                                    </UIField>
                                    <UIField title="Chế độ ăn mong đợi">
                                        <Flex gap="2.4rem">
                                            <InputForm type="text" error={""}></InputForm>
                                        </Flex>
                                    </UIField>
                                </Box>
                                <BodyInformation
                                    info={{ bmi: 20, recommended_dietary_allowance_kcal: 20 }}
                                    justifyContent="center"
                                    mb="3.2rem"
                                    columnGap="16.1rem"
                                />
                            </UIWrapInfo>
                            <Flex justifyContent="flex-end">
                                <Button
                                    variant="btnSubmit"
                                    w="10,6rem"
                                    mt="3.2rem"
                                    isDisabled={!props.isValid}
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
                                    {t("BUTTON.UPDATE")}
                                </Button>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Box>
        </UISignWrap>
    );
};

export default Profile;
