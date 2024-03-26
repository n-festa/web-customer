"use client";
import GroupRadioButton from "@/components/atoms/radio/GroupRadioButton";
import WraperInfo from "@/components/molecules/WraperInfo";
import useRenderText from "@/hooks/useRenderText";
import { filedType, formType } from "@/types/form";
import { FoodDetailDto } from "@/types/response/FoodResponse";
import { DefaultOtherOption, OtherCustomization, PortionCustomization, TasteCustomization } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import { calcCutoffTime } from "@/utils/functions";
import { FormControl, Grid, GridItem, HStack, Skeleton, Stack, Switch, Text, Textarea, VStack } from "@chakra-ui/react";
import { isToday, isTomorrow } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { forwardRef, useMemo, useState } from "react";
import PackageSelect from "./PackageSelect";

interface Props {
    info?: FoodDetailDto;
    isLoading?: boolean;
    onChangePortion?: (key: string, value: string | number) => void;
    portions?: {
        [key: string]: {
            option_id: string;
            value_id: string | number;
        };
    };
}

// eslint-disable-next-line react/display-name
const ServingSize = forwardRef((props: Props, ref: any) => {
    const t = useTranslations("PRODUCT_DETAIL.SERVINGSIVE");
    const { renderTxt } = useRenderText();
    const { info, isLoading, onChangePortion, portions } = props;
    const [disableTasteCustomize, setDisableTasteCustomize] = useState(true);

    const initFormData = useMemo(() => {
        let initValues = {};
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
        if (info?.packaging_info && info?.packaging_info.length > 0) {
            const packageDefault = info?.packaging_info.find((item) => item.is_default)?.packaging_id;
            initValues = {
                ...initValues,
                package: packageDefault,
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

        return { ...initValues, notes: "", item_id: info?.menu_item_id ?? -1 };
    }, [info?.menu_item_id, info?.other_customizaton, info?.packaging_info, info?.taste_customization]);
    const { time, isInday } = useMemo(() => {
        const time = calcCutoffTime(info?.cutoff_time_m);
        if (!time) return {};
        return isToday(time)
            ? { time: formatDate(time, "HH:mm"), isInday: true }
            : isTomorrow(time)
              ? { time: t("TOMORROW"), isInday: false }
              : { time: formatDate(time, "dd-MM-yyyy"), isInday: false };
    }, [info?.cutoff_time_m, t]);
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
                                                                    {renderTxt(el.option_name)}
                                                                </Text>
                                                                <GroupRadioButton
                                                                    isRounded
                                                                    options={options}
                                                                    value={
                                                                        String(portions?.[el.option_id].value_id) ??
                                                                        field.value
                                                                    }
                                                                    onChange={(e) => {
                                                                        if (
                                                                            typeof e === "string" ||
                                                                            typeof e === "number"
                                                                        ) {
                                                                            onChangePortion?.(el.option_id, e);
                                                                        }
                                                                    }}
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
                                    title={t("ADJUST_TASTE")}
                                    titleProps={{ fontSize: "2.4rem" }}
                                    isViewAll={false}
                                    contentProps={{ mt: "0" }}
                                    mt="2.1rem"
                                >
                                    {time && (
                                        <HStack fontSize="1.4rem" spacing="0.4rem">
                                            <Text color="var(--gray-600)">
                                                {isInday
                                                    ? t("PLACE_ORDER_BEFORE", { time: time })
                                                    : t("RECEIVE_FOOD_NOTE", { date: time })}
                                            </Text>
                                            {disableTasteCustomize && (
                                                <Text
                                                    cursor="pointer"
                                                    fontWeight={600}
                                                    color="var(--text-blue)"
                                                    onClick={() => {
                                                        setDisableTasteCustomize(false);
                                                    }}
                                                >
                                                    {t(isInday ? "I_WANT_TO_PRE_ORDER" : "I_WANT_TO_GET_IT_NOW")}
                                                </Text>
                                            )}
                                            <HStack fontSize="1.4rem"></HStack>
                                        </HStack>
                                    )}
                                    <VStack mt="1.6rem" alignItems={"flex-start"} w="100%" spacing={"1.6rem"}>
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
                                                                name: renderTxt(option.value_txt),
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
                                                                        {renderTxt(el.option_name)}
                                                                    </Text>
                                                                    <GroupRadioButton
                                                                        isRounded
                                                                        isDisabled={disableTasteCustomize}
                                                                        options={options}
                                                                        isFormikControl={true}
                                                                        buttonStyle={{
                                                                            opacity: 0.3,
                                                                        }}
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
                                                                            {renderTxt(el.description)}
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
                                title={t("PACKAGING")}
                                titleProps={{ fontSize: "2.4rem" }}
                                isViewAll={false}
                                contentProps={{ mt: "1.6rem" }}
                                mt="3.2rem"
                            >
                                <Field name={"package"}>
                                    {({ field }: { field: filedType }) => (
                                        <PackageSelect
                                            onChange={(value) => {
                                                ref.current?.setFieldValue("package", value);
                                            }}
                                            selectedItem={field.value}
                                            items={info?.packaging_info ?? []}
                                        />
                                    )}
                                </Field>
                            </WraperInfo>
                            <WraperInfo
                                title={t("NOTES")}
                                titleProps={{ fontSize: "2.4rem" }}
                                isViewAll={false}
                                contentProps={{ mt: "1.6rem" }}
                                mt="2.2rem"
                            >
                                <Field name={"notes"}>
                                    {({ field }: { field: formType }) => {
                                        return (
                                            <Textarea
                                                placeholder={t("NOTES_PLACEHOLDER")}
                                                rows={5}
                                                p="1.2rem 1.4rem"
                                                bg="white"
                                                resize="none"
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
