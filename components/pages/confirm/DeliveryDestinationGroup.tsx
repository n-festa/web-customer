import InputForm from "@/components/molecules/InputForm";
import InputSelectForm from "@/components/molecules/InputSelctForm";
import confirmOrder from "@/config/confirm.config";
import useSWRAPI from "@/hooks/useApi";
import apiServices from "@/services/sevices";
import { useAppSelector } from "@/store/hooks";
import { filedType, formType } from "@/types/form";
import { parseArrayToObject } from "@/utils/functions";
import { Flex, VStack } from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useTranslations } from "next-intl";
import { RefObject, useEffect, useMemo, useState } from "react";
import GroupWrapper from "./GroupWrapper";

const DeliveryDestinationGroup = ({
    formRef,
}: {
    formRef: RefObject<
        FormikProps<{
            province: string | undefined;
            district: string | undefined;
            ward: string | undefined;
            address: string | undefined;
            note: string;
        }>
    >;
}) => {
    const t = useTranslations("COMMON");
    const tDelivery = useTranslations("CONFIRM_ORDER.DELIVERY_DESTINATION");
    const { GetProvincesCities } = useSWRAPI();
    const { data: provincesData, isLoading } = GetProvincesCities();
    const [districts, setDistrict] = useState<{ key: string; value: string }[]>([]);
    const [communes, setCommunes] = useState<{ key: string; value: string }[]>([]);

    const [{ province, district }, setInfo] = useState<{
        province?: { key: string; value: string };
        district?: { key: string; value: string };
        commune?: { key: string; value: string };
    }>({});

    const userInfo = useAppSelector((state) => state.userInfo.userInfo);
    const { provinces, defaultProvince, provinceMap } = useMemo(() => {
        const provinces =
            provincesData?.data.map((item) => ({
                key: item.id,
                //TODO: update EN name
                value: item.name,
            })) ?? [];
        const defaultProvince = provinces.find((item) => item.value === userInfo?.addressCompound?.province);
        const provinceMap = parseArrayToObject(provinces, "value");

        return { provinces, defaultProvince, provinceMap };
    }, [provincesData?.data, userInfo?.addressCompound?.province]);
    useEffect(() => {
        const _province = province?.key ?? defaultProvince?.key;
        if (_province) {
            apiServices.getDistricts(_province).then((res) => {
                const districts = res.data.map((item) => ({
                    key: item.id,
                    //TODO: update EN name
                    value: item.name,
                }));
                setDistrict(districts);
                if (province) {
                    setInfo((prev) => ({ ...prev, district: districts[0] }));
                    formRef.current?.setFieldValue("district", districts[0].value);
                }
            });
        }
    }, [province?.key, defaultProvince?.key, province]);
    const { defaultDistrict, districtMap } = useMemo(() => {
        const defaultDistrict = districts.find(
            (item) => userInfo?.addressCompound?.district && item.value.includes(userInfo?.addressCompound?.district),
        );
        const districtMap = parseArrayToObject(districts, "value");

        return { defaultDistrict, districtMap };
    }, [districts, userInfo?.addressCompound?.district]);

    useEffect(() => {
        const _district = district?.key ?? defaultDistrict?.key;
        if (_district) {
            apiServices.getWards(_district).then((res) => {
                const communes = res.data.map((item) => ({
                    key: item.id,
                    //TODO: update EN name
                    value: item.name,
                }));
                setCommunes(communes);
                if (district) {
                    setInfo((prev) => ({ ...prev, ward: communes[0] }));
                    formRef.current?.setFieldValue("ward", communes[0].value);
                }
            });
        }
    }, [district?.key, defaultDistrict?.key, district]);
    const { defaultCommune } = useMemo(() => {
        const defaultCommune = communes.find(
            (item) => userInfo?.addressCompound?.commune && item.value.includes(userInfo?.addressCompound?.commune),
        );
        return { defaultCommune };
    }, [communes, userInfo?.addressCompound?.commune]);

    const { defaultAddress } = useMemo(() => {
        const addressComponents = userInfo?.address?.split(",");
        const defaultAddress = addressComponents
            ?.filter(
                (item) =>
                    !item.trim().includes(userInfo?.addressCompound?.commune ?? "") &&
                    !item.trim().includes(userInfo?.addressCompound?.district ?? "") &&
                    !item.trim().includes(userInfo?.addressCompound?.province ?? ""),
            )
            .join(", ");

        return { defaultAddress };
    }, [
        userInfo?.address,
        userInfo?.addressCompound?.commune,
        userInfo?.addressCompound?.district,
        userInfo?.addressCompound?.province,
    ]);
    useEffect(() => {
        const values = formRef.current?.values;
        if (!values?.province && defaultProvince) {
            formRef.current?.setFieldValue("province", defaultProvince.value);
        }
        if (!values?.district && defaultDistrict) {
            formRef.current?.setFieldValue("district", defaultDistrict.value);
        }
        if (!values?.ward && defaultCommune) {
            formRef.current?.setFieldValue("ward", defaultCommune.value);
        }
    }, [defaultDistrict, defaultProvince, defaultCommune, formRef]);
    return (
        <GroupWrapper title={t("DELIVER_TO")}>
            <Formik
                initialValues={{
                    ...confirmOrder.initialValues,
                    province: defaultProvince?.value,
                    district: defaultDistrict?.value,
                    ward: defaultCommune?.value,
                    address: defaultAddress,
                }}
                validationSchema={confirmOrder.validationSchema.validation}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 2));
                }}
                innerRef={formRef}
            >
                {(props) => (
                    <Form style={{ width: "100%" }} onSubmit={props.handleSubmit}>
                        <VStack mt="1.6rem" spacing="1rem">
                            <Field name="province">
                                {({ field, form }: { field: filedType; form: formType }) => (
                                    <InputSelectForm
                                        isDisabled={isLoading}
                                        title={tDelivery("PROVINCE_CITY")}
                                        name="province"
                                        placeholder={tDelivery("PROVINCE_CITY")}
                                        value={field.value ?? defaultProvince?.value}
                                        options={provinces}
                                        error={form.errors.province}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setInfo((prev) => ({
                                                ...prev,
                                                province: provinceMap[e.target.value],
                                            }));
                                        }}
                                    />
                                )}
                            </Field>
                            <Flex w="100%" gap="1rem">
                                <Field name="district">
                                    {({ field, form }: { field: filedType; form: formType }) => (
                                        <InputSelectForm
                                            formControlProps={{
                                                flex: 1,
                                            }}
                                            title={tDelivery("DISTRICT")}
                                            name="district"
                                            placeholder={tDelivery("DISTRICT")}
                                            value={field.value ?? defaultDistrict?.value}
                                            options={districts}
                                            error={form.errors.district}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setInfo((prev) => ({
                                                    ...prev,
                                                    district: districtMap[e.target.value],
                                                }));
                                            }}
                                        />
                                    )}
                                </Field>
                                <Field name="ward">
                                    {({ field, form }: { field: filedType; form: formType }) => (
                                        <InputSelectForm
                                            formControlProps={{
                                                flex: 1,
                                            }}
                                            title={tDelivery("WARD")}
                                            name="ward"
                                            placeholder={tDelivery("WARD")}
                                            value={field.value ?? defaultCommune?.value}
                                            options={communes}
                                            error={form.errors.ward}
                                            onChange={field.onChange}
                                        />
                                    )}
                                </Field>
                            </Flex>
                            <Field name="address">
                                {({ field, form }: { field: filedType; form: formType }) => (
                                    <InputForm
                                        formControlProps={{
                                            mb: "0",
                                        }}
                                        title={tDelivery("STREET_AND_NUMBER")}
                                        type="text"
                                        placeholder=""
                                        error={form.errors.address}
                                        labelProps={{
                                            fontWeight: 500,
                                            fontSize: "1.4rem",
                                            color: "var(--gray-700)",
                                        }}
                                        {...field}
                                        value={field.value ?? defaultAddress}
                                    />
                                )}
                            </Field>
                            <Field name="note">
                                {({ field }: { field: filedType; form: formType }) => (
                                    <InputForm
                                        formControlProps={{
                                            mb: "0",
                                        }}
                                        title={tDelivery("DRIVER_NOTE")}
                                        type="text"
                                        placeholder={tDelivery("DRIVER_NOTE_PLACEHOLDER")}
                                        labelProps={{
                                            fontWeight: 500,
                                            fontSize: "1.4rem",
                                            color: "var(--gray-700)",
                                        }}
                                        {...field}
                                    />
                                )}
                            </Field>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </GroupWrapper>
    );
};
export default DeliveryDestinationGroup;
