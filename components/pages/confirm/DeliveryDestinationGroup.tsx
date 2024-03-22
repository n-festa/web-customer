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
import debounce from "lodash/debounce";
import { useTranslations } from "next-intl";
import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import GroupWrapper from "./GroupWrapper";

const DeliveryDestinationGroup = ({
    restaurantId,
    formRef,
    setDeliveryFee,
}: {
    restaurantId?: number;
    formRef: RefObject<
        FormikProps<{
            province: string | undefined;
            district: string | undefined;
            ward: string | undefined;
            address: string | undefined;
            note: string;
            lat: number | undefined;
            lng: number | undefined;
        }>
    >;
    setDeliveryFee: Dispatch<
        SetStateAction<
            | {
                  distance?: number;
                  deliveryFee?: number;
              }
            | undefined
        >
    >;
}) => {
    const t = useTranslations("COMMON");
    const tDelivery = useTranslations("CONFIRM_ORDER.DELIVERY_DESTINATION");
    const { GetProvincesCities } = useSWRAPI();
    const { data: provincesData, isLoading } = GetProvincesCities();
    const [districts, setDistrict] = useState<{ key: string; value: string }[]>([]);
    const [communes, setCommunes] = useState<{ key: string; value: string }[]>([]);
    const [address, setAddress] = useState<string>();
    const [{ province, district, commune }, setInfo] = useState<{
        province?: { key: string; value: string };
        district?: { key: string; value: string };
        commune?: { key: string; value: string };
    }>({});
    const prevAddressFull = useRef<string>();

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
    }, [province?.key, defaultProvince?.key, province, formRef]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [district?.key, defaultDistrict?.key, district]);
    const { defaultCommune, communeMap } = useMemo(() => {
        const defaultCommune = communes.find(
            (item) => userInfo?.addressCompound?.commune && item.value.includes(userInfo?.addressCompound?.commune),
        );
        const communeMap = parseArrayToObject(communes, "value");

        return { defaultCommune, communeMap };
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getLongLat = useCallback(
        debounce(async (addressFull: string) => {
            const allAddress = await apiServices.getGeoCode(addressFull);
            const customerLocation = allAddress.results?.[0].geometry.location;
            const fee = await apiServices.getDeliveryFee({
                restaurant_id: restaurantId,
                delivery_latitude: customerLocation.lat,
                delivery_longitude: customerLocation.lng,
            });
            formRef.current?.setFieldValue("lat", customerLocation.lat);
            formRef.current?.setFieldValue("lng", customerLocation.lng);

            setDeliveryFee({
                deliveryFee: fee.delivery_fee,
                distance: fee.distance_km,
            });
        }, 500),
        [],
    );

    useEffect(() => {
        const values = formRef.current?.values;
        const _address = address ?? values?.address ?? defaultAddress;
        const _ward = commune?.value ?? values?.ward ?? defaultCommune?.value;
        const _district = district?.value ?? values?.district ?? defaultDistrict?.value;
        const _province = province?.value ?? values?.province ?? defaultProvince?.value;
        if (_address && _ward && _district && _province) {
            const addressFull = [_address, _ward, _district, _province].join(",");
            if (prevAddressFull.current !== addressFull) {
                prevAddressFull.current = addressFull;
                getLongLat(addressFull);
            }
        }
    }, [
        formRef,
        formRef.current?.values,
        province,
        district,
        commune,
        address,
        getLongLat,
        defaultCommune,
        defaultAddress,
        defaultDistrict,
        defaultProvince,
    ]);

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
                                            value={field.value ?? defaultCommune?.value}
                                            options={communes}
                                            error={form.errors.ward}
                                            onChange={(e) => {
                                                field.onChange?.(e);
                                                setInfo((prev) => ({
                                                    ...prev,
                                                    commune: communeMap[e.target.value],
                                                }));
                                            }}
                                        />
                                    )}
                                </Field>
                            </Flex>
                            <Field name="address">
                                {({ form }: { field: filedType; form: formType }) => (
                                    <InputForm
                                        formControlProps={{
                                            mb: "0",
                                        }}
                                        title={tDelivery("STREET_AND_NUMBER")}
                                        type="text"
                                        error={form.errors.address}
                                        labelProps={{
                                            fontWeight: 500,
                                            fontSize: "1.4rem",
                                            color: "var(--gray-700)",
                                        }}
                                        inputProps={{
                                            onChange: (e) => {
                                                formRef.current?.setFieldValue("address", e.target.value);
                                                setAddress(e.target.value);
                                            },
                                        }}
                                        value={address ?? defaultAddress}
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
