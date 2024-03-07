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
import {
    Box,
    Button,
    Flex,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useToast,
    Image,
    Avatar,
    Input,
    useDisclosure,
    InputGroup,
    InputLeftAddon,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AvatarModal from "@/components/modal/AvatarModal";

const Profile = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const toast = useToast();
    const tFormData = useTranslations("FORM.DATA_PROFILE");
    const { userId } = loadState("infoSign");
    const { initialValues, validationSchema, formData } = signUp(tFormData);
    const [initialForm, setInitialForm] = useState<UserType>(initialValues);
    const [bodyInfo, setBodyInfo] = useState({ bmi: 0, recommended_dietary_allowance_kcal: 0 });
    const [avatar, setAvatar] = useState<string>("");
    const [avatarPreview, setAvatarPreview] = useState<string>("");
    const [avatarFile, setAvatarFile] = useState<File>();
    const { isOpen, onOpen, onClose } = useDisclosure();

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
    const handleUpload = (event: any) => {
        setAvatarPreview(URL.createObjectURL(event.target.files[0]));
        setAvatarFile(event.target.files[0]);
        onOpen();
    };
    const handleConfirmPreview = (confirm: boolean) => {
        if (confirm) {
            console.log("avatarPreview", avatarPreview);
            setAvatar(avatarPreview);
        } else {
            setAvatarPreview("");
            setAvatarFile(undefined);
        }
        onClose();
    };
    console.log(avatarFile);
    useEffect(() => {
        apiServices
            .customerProfile({ userId })
            .then((response) => {
                const { data: profile } = response;
                if (profile) {
                    const notExpect = formData.expectedDiet.some(
                        (item) => item.value === profile?.health_info?.expected_diet,
                    );
                    setInitialForm({
                        phone_number: profile?.phone_number || "",
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
                    setBodyInfo({
                        bmi: profile?.health_info?.bmi || 0,
                        recommended_dietary_allowance_kcal:
                            profile?.health_info?.recommended_dietary_allowance_kcal || 0,
                    });
                    setAvatar(profile.profile_image?.url || "");
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
                            <AvatarModal
                                isOpen={isOpen}
                                onClose={onClose}
                                avatar={avatarPreview}
                                onPreview={handleConfirmPreview}
                            />
                            <UIWrapInfo title={t("PROFILE.SEC_TITLE_1")} description={t("PROFILE.SEC_SUB_DESC_1")}>
                                <Box>
                                    <UIField title={t("FORM.AVATAR.LABEL")}>
                                        <Flex gap="2.4rem" justifyContent="space-between">
                                            <Image
                                                border="var(--divider)"
                                                borderRadius={"50%"}
                                                w="10rem"
                                                h="10rem"
                                                src={avatar}
                                                objectFit="cover"
                                                fallback={
                                                    <Avatar src={avatar} w={{ base: "10rem" }} h={{ base: "10rem" }} />
                                                }
                                                alt="avt"
                                            />
                                            <Button
                                                as="label"
                                                id="upload"
                                                variant="btnSubmit"
                                                bg="#fff"
                                                width="15.9rem"
                                                color="var(--gray-700)"
                                                borderColor="var(--gray-300)"
                                                cursor="pointer"
                                                _hover={{ opacity: 0.8, background: "#fff", color: "var(--gray-700)" }}
                                            >
                                                {t("BUTTON.UPLOAD_AVATAR")}
                                                <Input
                                                    display="none"
                                                    accept="image/png, image/jpeg"
                                                    type="file"
                                                    name="upload"
                                                    onChange={(event) => handleUpload(event)}
                                                />
                                            </Button>
                                        </Flex>
                                    </UIField>
                                    <UIField title={t("FORM.FULL_NAME.LABEL")}>
                                        <Flex gap="2.4rem">
                                            <InputForm type="text" error={""}></InputForm>
                                            <InputForm type="text" error={""}></InputForm>
                                        </Flex>
                                    </UIField>
                                    <Field name="phone_number">
                                        {({ field, form }: { field: filedType; form: formType }) => (
                                            <UIField title={t("FORM.PHONE_NUMBER.LABEL")}>
                                                <Flex gap="2.4rem">
                                                    <InputGroup
                                                        cursor="not-allowed"
                                                        pointerEvents="none"
                                                        border=".1rem solid #D0D5DD"
                                                        borderRadius=".8rem"
                                                        h="4.0rem"
                                                        mb="0.6rem"
                                                        borderColor={form.errors.phoneNumber && "#E53E3E"}
                                                    >
                                                        <InputLeftAddon h="4.0rem" pr="1.0rem">
                                                            <Image w="1.6rem" alt="" src={`/images/vi.svg `} />
                                                        </InputLeftAddon>
                                                        <Input
                                                            disabled
                                                            border="none !important"
                                                            boxShadow="none !important"
                                                            h="3.8rem"
                                                            type="tel"
                                                            placeholder="(555) 000-0000"
                                                            fontSize="1.6rem"
                                                            fontWeight="400"
                                                            color="#667085"
                                                            p="0"
                                                            {...field}
                                                        />
                                                    </InputGroup>
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
                                                    textarea={true}
                                                    type="text"
                                                    placeholder={t("FORM.ALLERGIC_FOOD.PLACEHOLDER")}
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
                                                    textarea={true}
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
                                    info={bodyInfo}
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
