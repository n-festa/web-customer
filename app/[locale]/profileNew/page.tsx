"use client";
import Cascader from "@/components/atoms/Cascader";
import RadioCardGroup from "@/components/atoms/RadioCardGroup";
import InputForm from "@/components/molecules/InputForm";
import UISignWrap from "@/components/molecules/UISignWrap";
import UIField from "@/components/pages/profile/UIField";
import UIWrapInfo from "@/components/pages/profile/UIWrapInfo";
import signUp from "@/config/signup.config";
import apiServices from "@/services/sevices";
import { setUserInfo } from "@/store/reducers/userInfo";
import { UserType } from "@/types";
import { filedType, formType } from "@/types/form";
import { loadState } from "@/utils/localstorage";
import { routes } from "@/utils/routes";
import { Box, Button, Center, Flex, Radio, RadioGroup, Stack, Text, useToast } from "@chakra-ui/react";
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
                <Flex
                    justifyContent="space-between"
                    mb="3.2rem"
                    paddingBottom="2.1rem"
                    alignItems="flex-end"
                    borderBottom="1px solid #EAECF0"
                >
                    <Box>
                        <Text fontSize="2.4rem" fontWeight="700" mb="0.8rem" color="var(--gray-950)">
                            TRANG CÁ NHÂN
                        </Text>
                        <Text fontSize="1.4rem" fontWeight="400" color="var(--gray-600)">
                            Nơi quản lý thông tin đăng nhập, chế độ dinh dưỡng cá nhân của bạn
                        </Text>
                    </Box>
                    <Button variant="btnSubmit" w="10,6rem">
                        Cập nhật
                    </Button>
                </Flex>
                <Cascader></Cascader>
                <UIWrapInfo
                    title="Thông tin tài khoản"
                    description="Quản lý thông tin tài khoản dùng để đăng nhập, đặt hàng"
                >
                    <Box>
                        <UIField title="Họ và Tên">
                            <Flex gap="2.4rem">
                                <InputForm type="text" error={""}></InputForm>
                                <InputForm type="text" error={""}></InputForm>
                            </Flex>
                        </UIField>
                        <UIField title="Số điện thoại">
                            <Flex gap="2.4rem">
                                <InputForm type="text" error={""}></InputForm>
                            </Flex>
                        </UIField>
                        <UIField title="Email">
                            <Flex gap="2.4rem">
                                <InputForm type="text" error={""}></InputForm>
                            </Flex>
                        </UIField>
                        <UIField title="Ngày sinh">
                            <Flex gap="2.4rem">
                                <InputForm type="text" error={""}></InputForm>
                            </Flex>
                        </UIField>
                    </Box>
                </UIWrapInfo>
                <UIWrapInfo
                    title="Thông tin dinh dưỡng"
                    description="Quản lý thông tin thể trạng và nhu cầu của bạn. Hệ thống sẽ dựa vào thông tin này để gợi ý món ăn phù hợp cho bạn."
                >
                    <Box>
                        <UIField title="Giới tính">
                            <Flex gap="2.4rem">
                                <RadioGroup mb="1.6rem">
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
                                                value="m"
                                                onChange={() => {}}
                                            >
                                                {data.content}
                                            </Radio>
                                        ))}
                                    </Stack>
                                </RadioGroup>
                            </Flex>
                        </UIField>
                        <UIField title="Thể trạng">
                            <Flex gap="1rem">
                                <InputForm
                                    title={t("FORM.HEIGHT.LABEL")}
                                    type="number"
                                    placeholder={t("FORM.HEIGHT.PLACEHOLDER")}
                                />
                                <InputForm
                                    title={t("FORM.WEIGHT.LABEL")}
                                    type="number"
                                    placeholder={t("FORM.WEIGHT.PLACEHOLDER")}
                                />
                            </Flex>
                        </UIField>
                        <UIField title="Mức độ vận động">
                            <RadioCardGroup
                                name="physical_activity_level"
                                data={formData.physicalActivityLevel}
                                onChange={() => {}}
                            />
                        </UIField>
                        <UIField title="Chế độ ăn hiện tại">
                            <InputForm
                                title={t("FORM.WEIGHT.LABEL")}
                                type="number"
                                placeholder={t("FORM.WEIGHT.PLACEHOLDER")}
                            />
                        </UIField>
                        <UIField
                            title="Dị ứng với đồ ăn (nếu có)"
                            description="Chia sẻ thêm về đồ ăn mà bạn bị dị ứng. Ví dụ: sữa động vật, trứng, hải sản (cá, tôm, cua...), thuỷ sản (cá, tôm, lươn...), các loại hạt (đậu nành, óc chố, hạnh nhân...)"
                        >
                            <InputForm type="text" placeholder={t("FORM.ALLERGIC_FOOD.PLACEHOLDER")} textarea={true} />
                        </UIField>
                        <UIField
                            title="Bệnh mãn tính (nếu có)"
                            description="Tim, Cao huyết áp, Huyết áp thấp, Gout, Tiểu đường, hen suyễn, ung thư...."
                        >
                            <InputForm
                                type="text"
                                placeholder={t("FORM.CHRONIC_DISEASE.PLACEHOLDER")}
                                textarea={true}
                            />
                        </UIField>
                        <UIField title="Chế độ ăn mong đợi">
                            <Flex gap="2.4rem">
                                <InputForm type="text" error={""}></InputForm>
                            </Flex>
                        </UIField>
                    </Box>
                    <Flex justifyContent="center" flexWrap="wrap" mb="3.2rem" columnGap="16.1rem">
                        <Box>
                            <Text fontSize="2.4rem" fontWeight="600" color="var(--gray-modern-950)" mb="1.6rem">
                                {t("REGISTRATION_SUCCESS.BMI_INDEX")}
                            </Text>
                            <Center
                                textAlign="center"
                                w="11.6rem"
                                h="11.6rem"
                                border="2px solid var(--green-light-500)"
                                borderRadius="50%"
                                bg="var(--green-light-100)"
                                fontSize="3rem"
                                fontWeight="600"
                                color="var(--green-light-500)"
                                mb="0.8rem"
                            >
                                12
                            </Center>
                            <Text fontSize="1.8rem" textAlign="center" fontWeight="500" color="var(--gray-modern-950)">
                                Cân đối
                                {t("REGISTRATION_SUCCESS.BALANCE")}
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                fontSize="2.4rem"
                                textAlign="center"
                                fontWeight="600"
                                color="var(--gray-modern-950)"
                                mb="1.6rem"
                            >
                                {t("REGISTRATION_SUCCESS.ENERGY")}
                            </Text>
                            <Center
                                textAlign="center"
                                w="11.6rem"
                                h="11.6rem"
                                border="2px solid var(--green-light-500)"
                                borderRadius="50%"
                                bg="var(--green-light-100)"
                                fontSize="3rem"
                                fontWeight="600"
                                color="var(--green-light-500)"
                                mb="0.8rem"
                            >
                                30
                            </Center>
                            <Text fontSize="1.8rem" fontWeight="500" textAlign="center" color="var(--gray-modern-950)">
                                {t("REGISTRATION_SUCCESS.KCAL_PER_DAY")}
                            </Text>
                        </Box>
                    </Flex>
                </UIWrapInfo>
                <Flex justifyContent="flex-end">
                    <Button variant="btnSubmit" w="10,6rem" mt="3.2rem">
                        Cập nhật
                    </Button>
                </Flex>
                {/* <Box w="100%" maxW="36rem" m="0 auto">
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
                                    isDisabled={!props.isValid}
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
                </Box> */}
            </Box>
        </UISignWrap>
    );
};

export default Profile;
