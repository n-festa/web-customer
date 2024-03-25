"use client";
import RadioCardGroup from "@/components/atoms/RadioCardGroup";
import TagSelector from "@/components/atoms/TagSelector";
import AvatarModal from "@/components/modal/AvatarModal";
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
import { capitalizeFirstLetter } from "@/utils/functions";
import { loadState } from "@/utils/localstorage";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    Radio,
    RadioGroup,
    Stack,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Profile = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const toast = useToast();
    const tFormData = useTranslations("FORM.DATA_PROFILE");
    const { userId } = loadState("infoSign");
    const { initialValues, validationSchema, formData } = signUp(tFormData);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [initialForm, setInitialForm] = useState<UserType>(initialValues);
    const [bodyInfo, setBodyInfo] = useState({ bmi: 0, recommended_dietary_allowance_kcal: 0 });
    const [avatar, setAvatar] = useState<string>("");
    const [avatarPreview, setAvatarPreview] = useState<string>("");
    const [avatarFile, setAvatarFile] = useState<File>();
    const [curDiet, setCurDiet] = useState<string>("");
    const [expDiet, setExpDiet] = useState<string>("");
    const [confirming, setConfirming] = useState<boolean>(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSubmit = async ({ first_name, last_name, ...rest }: UserType, setSubmitting: any) => {
        try {
            apiServices
                .updateCustomer({
                    ...rest,
                    physical_activity_level: capitalizeFirstLetter(rest.physical_activity_level),
                    customer_id: userId,
                    name: first_name + " " + last_name,
                    current_diet: curDiet || "",
                    expected_diet: expDiet || "",
                })
                .then(({ data }) => {
                    dispatch(setUserInfo(data));
                    setBodyInfo({
                        bmi: data?.health_info?.bmi || 0,
                        recommended_dietary_allowance_kcal: data?.health_info?.recommended_dietary_allowance_kcal || 0,
                    });
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
                });
        } catch (error) {
            console.error("Error while resending OTP:", error);
        }
    };

    const handleUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event?.target?.files?.[0];
        if (target) {
            setAvatarPreview(URL.createObjectURL(target));
            setAvatarFile(target);
            onOpen();
        }
    };

    const handleConfirmPreview = async (confirm: boolean) => {
        if (confirm) {
            setConfirming(true);
            try {
                const { data } = await apiServices.uploadImagePost({ file: avatarFile });
                const { data: customerData } = await apiServices.uploadImagePut({
                    url: data,
                    customer_id: userId,
                });
                setAvatar(data);
                dispatch(setUserInfo(customerData));
                toast({
                    title: t("COMMON.TOAST.PROFILE.TITLE"),
                    description: t("COMMON.TOAST.PROFILE.SUCCESS_CONTENT"),
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
                setConfirming(false);
            } catch (err) {
                setConfirming(false);
                const message: string | undefined = (err as any)?.error?.code;
                const errorLength = (err as any)?.error?.response?.status;
                if (message === "ERR_NETWORK" || errorLength === 400) {
                    toast({
                        title: t("COMMON.TOAST.PROFILE.TITLE"),
                        description: t("COMMON.TOAST.PROFILE.ERROR_LENGTH"),
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                } else {
                    toast({
                        title: t("COMMON.TOAST.PROFILE.TITLE"),
                        description: t("COMMON.TOAST.PROFILE.ERROR_CONTENT"),
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                }
            }
        } else {
            setAvatarPreview("");
            setAvatarFile(undefined);
        }
        onClose();
    };

    useEffect(() => {
        apiServices
            .customerProfile({ userId })
            .then((response) => {
                const { data: profile } = response;
                if (profile) {
                    const [firstName, ...lastName] = profile?.name.split(" ");
                    setInitialForm({
                        phone_number: profile?.phone_number || "",
                        name: profile?.name || "",
                        email: profile?.email || "",
                        birthday: profile?.birthday,
                        sex: profile?.sex || "",
                        height_m: profile?.health_info?.height_m || "",
                        weight_kg: profile?.health_info?.weight_kg || "",
                        physical_activity_level: profile?.health_info?.physical_activity_level.toLowerCase() || "light",
                        current_diet: profile?.health_info?.current_diet || "Hỗn hợp",
                        allergic_food: profile?.health_info?.allergic_food || "",
                        expected_diet: profile?.health_info?.expected_diet || "",
                        chronic_disease: profile?.health_info?.chronic_disease || "",
                        first_name: firstName || "",
                        last_name: lastName.join(" ") || "",
                    });
                    setCurDiet(profile.health_info.current_diet || "");
                    setExpDiet(profile.health_info.expected_diet || "");
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
                                flexDirection={{ base: "column", md: "row" }}
                                rowGap="2rem"
                            >
                                <Box w="100%">
                                    <Text fontSize="2.4rem" fontWeight="700" mb="0.8rem" color="var(--gray-950)">
                                        {t("PROFILE.TITLE")}
                                    </Text>
                                    <Text fontSize="1.4rem" fontWeight="400" color="var(--gray-600)">
                                        {t("PROFILE.SUB_TITLE")}
                                    </Text>
                                </Box>
                                <Button
                                    variant="btnSubmit"
                                    w="10,6rem"
                                    isDisabled={!props.isValid}
                                    isLoading={props.isSubmitting}
                                    type="submit"
                                >
                                    {t("BUTTON.UPDATE")}
                                </Button>
                            </Flex>
                            <AvatarModal
                                isOpen={isOpen}
                                onClose={onClose}
                                avatar={avatarPreview}
                                onPreview={handleConfirmPreview}
                                loading={confirming}
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
                                                    onChange={handleUpload}
                                                />
                                            </Button>
                                        </Flex>
                                    </UIField>
                                    <UIField title={t("FORM.FULL_NAME.LABEL")}>
                                        <Flex gap="2.4rem">
                                            <Field name="first_name">
                                                {({ field, form }: { field: filedType; form: formType }) => (
                                                    <InputForm
                                                        type="text"
                                                        error={
                                                            form.errors.email && form.touched?.email
                                                                ? form.errors.email
                                                                : ""
                                                        }
                                                        {...field}
                                                    ></InputForm>
                                                )}
                                            </Field>
                                            <Field name="last_name">
                                                {({ field, form }: { field: filedType; form: formType }) => (
                                                    <InputForm
                                                        type="text"
                                                        error={
                                                            form.errors.email && form.touched?.email
                                                                ? form.errors.email
                                                                : ""
                                                        }
                                                        {...field}
                                                    ></InputForm>
                                                )}
                                            </Field>
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
                                        <TagSelector data={curDiet} setData={setCurDiet} />
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
                                    <UIField title={t("FORM.EXPECTED_DIET.LABEL")}>
                                        <TagSelector data={expDiet} setData={setExpDiet} />
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
