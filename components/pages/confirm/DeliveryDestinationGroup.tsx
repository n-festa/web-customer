import InputForm from "@/components/molecules/InputForm";
import InputSelectForm from "@/components/molecules/InputSelctForm";
import confirmOrder from "@/config/confirm.config";
import { filedType, formType } from "@/types/form";
import { Flex, VStack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import GroupWrapper from "./GroupWrapper";

const DeliveryDestinationGroup = () => (
    <GroupWrapper title="Giao đến">
        <Formik
            initialValues={confirmOrder.initialValues}
            validationSchema={confirmOrder.validationSchema.validation}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {(props) => (
                <Form style={{ width: "100%" }} onSubmit={props.handleSubmit}>
                    <VStack mt="1.6rem" spacing="1rem">
                        <Field name="province">
                            {({ field, form }: { field: filedType; form: formType }) => (
                                <InputSelectForm
                                    title="Tỉnh / Thành Phố"
                                    name="province"
                                    placeholder="Tỉnh / Thành Phố"
                                    value={field.value}
                                    options={[
                                        //TODO
                                        { key: "1", value: "1" },
                                        { key: "2", value: "2" },
                                    ]}
                                    error={form.errors.province}
                                    onChange={field.onChange}
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
                                        title="Quận / Huyện"
                                        name="district"
                                        placeholder="Quận / Huyện"
                                        value={field.value}
                                        options={[
                                            //TODO
                                            { key: "1", value: "1" },
                                            { key: "2", value: "2" },
                                        ]}
                                        error={form.errors.district}
                                        onChange={field.onChange}
                                    />
                                )}
                            </Field>
                            <Field name="ward">
                                {({ field, form }: { field: filedType; form: formType }) => (
                                    <InputSelectForm
                                        formControlProps={{
                                            flex: 1,
                                        }}
                                        title="Phường / Xã"
                                        name="ward"
                                        placeholder="Phường / Xã"
                                        value={field.value}
                                        options={[
                                            //TODO
                                            { key: "1", value: "1" },
                                            { key: "2", value: "2" },
                                        ]}
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
                                    title="Số nhà & tên đường"
                                    type="text"
                                    placeholder=""
                                    error={form.errors.address}
                                    labelProps={{
                                        fontWeight: 500,
                                        fontSize: "1.4rem",
                                        color: "var(--gray-700)",
                                    }}
                                    {...field}
                                />
                            )}
                        </Field>
                        <Field name="note">
                            {({ field }: { field: filedType; form: formType }) => (
                                <InputForm
                                    formControlProps={{
                                        mb: "0",
                                    }}
                                    title="Ghi chú cho tài xế"
                                    type="text"
                                    placeholder="Ví dụ: gặp tôi tại sảnh"
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

export default DeliveryDestinationGroup;
