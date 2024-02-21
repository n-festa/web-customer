"use client";
import GroupRadioButton from "@/components/atoms/radio/GroupRadioButton";
import WraperInfo from "@/components/molecules/WraperInfo";
import { filedType, formType } from "@/types/form";
import { FoodDetailDto } from "@/types/response/FoodResponse";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { DefaultOtherOption, OtherCustomization, PortionCustomization, TasteCustomization } from "@/utils/constants";
import { FormControl, Grid, GridItem, HStack, Skeleton, Stack, Switch, Text, Textarea, VStack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { forwardRef, useMemo } from "react";

interface Props {
    info?: FoodDetailDto;
    listSKUs?: SKUsDto[];
    isLoading?: boolean;
}

// eslint-disable-next-line react/display-name
const ServingSize = forwardRef((props: Props, ref: any) => {
    const t = useTranslations("PRODUCT_DETAIL.SERVINGSIVE");
    const { listSKUs = [], info, isLoading } = props;
    const activeSKU = useMemo(() => {
        const item = listSKUs.find((el) => el.is_standard);
        if (item) {
            return item;
        }
        return undefined;
    }, [listSKUs]);

    const initFormData = useMemo(() => {
        let initValues = activeSKU?.portion_customization.reduce(
            (prev, curr) => ({ ...prev, [`${PortionCustomization}-${curr.option_id}`]: curr.value_id }),
            {},
        );
        if (info?.taste_customization && info?.taste_customization.length > 0) {
            const tasteCustomizationObj = info?.taste_customization.reduce(
                (prev, curr) => ({
                    ...prev,
                    [`${TasteCustomization}-${curr.option_id}`]:
                        curr.option_values?.find((item) => item.is_default)?.value_id ??
                        curr.option_values?.[0].value_id,
                }),
                {},
            );
            initValues = {
                ...initValues,
                ...tasteCustomizationObj,
            };
        }

        if (info?.other_customizaton && info?.other_customizaton.length > 0) {
            const otherCustomizatonObj = info?.other_customizaton.reduce(
                (prev, curr) => ({ ...prev, [`${OtherCustomization}-${curr.no_adding_id}`]: DefaultOtherOption }),
                {},
            );
            initValues = {
                ...initValues,
                ...otherCustomizatonObj,
            };
        }

        return { ...initValues, notes: "", sku_id: activeSKU?.sku_id ?? -1, item_id: info?.menu_item_id ?? -1 };
    }, [
        activeSKU?.portion_customization,
        activeSKU?.sku_id,
        info?.menu_item_id,
        info?.other_customizaton,
        info?.taste_customization,
    ]);

    return (
        <VStack
            alignItems={"flex-start"}
            w="100%"
            flexDirection="column"
            spacing={"3.2rem"}
            bg="var(--gray-100)"
            p="2.1rem 2.4rem"
            borderRadius={"0.8rem"}
            position={"relative"}
        >
            {isLoading ? (
                <Skeleton isLoaded={false} />
            ) : (
                <Formik
                    initialValues={initFormData}
                    key={JSON.stringify(initFormData)}
                    onSubmit={() => {
                        // console.log(values);
                    }}
                    onKeyPress={(e: { key: string; preventDefault: () => void }) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                    innerRef={ref}
                >
                    {(_) => (
                        <Form style={{ width: "100%" }}>
                            <WraperInfo
                                title={t("SELECT_PORTION")}
                                titleProps={{ fontSize: "2.4rem" }}
                                isViewAll={false}
                                contentProps={{ mt: "1.6rem" }}
                            >
                                <VStack alignItems={"flex-start"} w="100%" spacing={"1.6rem"}>
                                    {info?.portion_customization?.map((el, index) => {
                                        return (
                                            <Field
                                                name={`${PortionCustomization}-${el.option_id}`}
                                                key={el.option_id + index}
                                            >
                                                {({ field }: { field: filedType }) => {
                                                    const options = el.option_values.map((option) => ({
                                                        name: `${option.value_nubmer}${option.value_unit}`,
                                                        value: option.value_id,
                                                    }));
                                                    return (
                                                        <FormControl>
                                                            <Stack direction={{ base: "column", md: "row" }}>
                                                                <Text
                                                                    fontSize={"1.6rem"}
                                                                    fontWeight={"500"}
                                                                    lineHeight={"2.4rem"}
                                                                    minW="12rem"
                                                                    textTransform={"capitalize"}
                                                                >
                                                                    {el.option_name?.[0]?.text}
                                                                </Text>
                                                                <GroupRadioButton
                                                                    isRounded
                                                                    options={options}
                                                                    isFormikControl={true}
                                                                    {...field}
                                                                ></GroupRadioButton>
                                                            </Stack>
                                                        </FormControl>
                                                    );
                                                }}
                                            </Field>
                                        );
                                    })}
                                </VStack>
                            </WraperInfo>

                            {info?.taste_customization && info?.taste_customization.length > 0 && (
                                <WraperInfo
                                    title={t("ADJUST_TASTE", { time: 9 })}
                                    titleProps={{ fontSize: "2.4rem" }}
                                    isViewAll={false}
                                    contentProps={{ mt: "1.6rem" }}
                                    mt="2.1rem"
                                >
                                    <VStack alignItems={"flex-start"} w="100%" spacing={"1.6rem"}>
                                        {info?.taste_customization?.map((el, index) => {
                                            return (
                                                <Field
                                                    key={el.option_id + index}
                                                    name={`${TasteCustomization}-${el.option_id}`}
                                                >
                                                    {({ field }: { field: filedType }) => {
                                                        const options = el.option_values
                                                            .sort((a, b) => {
                                                                if (a.is_default) return -1;
                                                                if (b.is_default) return 1;

                                                                return a.order - b.order;
                                                            })
                                                            .map((option) => ({
                                                                name: option.value_txt?.[0]?.text,
                                                                value: option.value_id,
                                                            }));
                                                        return (
                                                            <FormControl>
                                                                <Stack direction={{ base: "column", md: "row" }}>
                                                                    <Text
                                                                        fontSize={"1.6rem"}
                                                                        fontWeight={"500"}
                                                                        lineHeight={"2.4rem"}
                                                                        minW="12rem"
                                                                        textTransform={"capitalize"}
                                                                    >
                                                                        {el.option_name?.[0]?.text}
                                                                    </Text>
                                                                    <GroupRadioButton
                                                                        isRounded
                                                                        options={options}
                                                                        isFormikControl={true}
                                                                        {...field}
                                                                    ></GroupRadioButton>
                                                                </Stack>
                                                            </FormControl>
                                                        );
                                                    }}
                                                </Field>
                                            );
                                        })}
                                    </VStack>
                                </WraperInfo>
                            )}

                            <WraperInfo
                                title={t("OTHER_ADJUSTMENT")}
                                titleProps={{ fontSize: "2.4rem" }}
                                isViewAll={false}
                                contentProps={{ mt: "1.6rem" }}
                                mt="2.1rem"
                            >
                                <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 25rem)" }} gap={4}>
                                    {info?.other_customizaton?.map((el, index) => {
                                        return (
                                            <GridItem
                                                key={el.no_adding_id + index}
                                                w="100%"
                                                minH="3rem"
                                                justifyContent={"flex-start"}
                                            >
                                                <Field name={`${OtherCustomization}-${el.no_adding_id}`}>
                                                    {({ field }: { field: filedType }) => {
                                                        const { value, ...rest } = field;
                                                        return (
                                                            <FormControl>
                                                                <HStack minW="17rem" justifyContent={"space-between"}>
                                                                    <Switch
                                                                        variant={"green"}
                                                                        size="lg"
                                                                        display={"flex"}
                                                                        flexDirection={"row-reverse"}
                                                                        isChecked={value as unknown as boolean}
                                                                        {...rest}
                                                                    >
                                                                        <Text
                                                                            variant={"toggle"}
                                                                            minW="12rem"
                                                                            textTransform={"capitalize"}
                                                                        >
                                                                            {el.description?.[0]?.text}
                                                                        </Text>
                                                                    </Switch>
                                                                </HStack>
                                                            </FormControl>
                                                        );
                                                    }}
                                                </Field>
                                            </GridItem>
                                        );
                                    })}
                                </Grid>
                            </WraperInfo>

                            <WraperInfo
                                title={t("NOTES")}
                                titleProps={{ fontSize: "2.4rem" }}
                                isViewAll={false}
                                contentProps={{ mt: "1.6rem" }}
                                mt="2.1rem"
                            >
                                <Field name={"notes"}>
                                    {({ field }: { field: formType }) => {
                                        return (
                                            <Textarea
                                                placeholder={t("NOTES_PLACEHOLDER")}
                                                rows={5}
                                                p="1.2rem 1.4rem"
                                                bg="white"
                                                {...field}
                                            />
                                        );
                                    }}
                                </Field>
                            </WraperInfo>
                        </Form>
                    )}
                </Formik>
            )}
        </VStack>
    );
});
export default ServingSize;
