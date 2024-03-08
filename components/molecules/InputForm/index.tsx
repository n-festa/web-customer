"use client";
import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormLabel,
    FormLabelProps,
    Input,
    Text,
    Textarea,
} from "@chakra-ui/react";

type InputFormProps = {
    title?: string;
    placeholder?: string;
    type?: string;
    note?: string;
    error?: string | number;
    labelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
    value?: string;
    textarea?: boolean;
};

const InputForm: React.FC<InputFormProps> = ({
    title,
    type = "text",
    labelProps,
    placeholder,
    note,
    error,
    formControlProps,
    textarea,
    ...props
}) => {
    const onChangeNumberKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === "number") {
            const value = e.target.value;
            const isNumber = /^[0-9]*$/u.test(value);
            if (!isNumber) {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
            } else {
                e.target.value = value;
            }
        }
        return true;
    };
    return (
        <FormControl w="100%" mb="1.6rem" isInvalid={!!error} {...formControlProps}>
            <FormLabel fontSize="1.6rem" fontWeight="600" mb="0.6rem" {...labelProps}>
                {title}
            </FormLabel>
            {textarea ? (
                <Textarea
                    h="4.4rem"
                    border="1px solid var(--gray-300)"
                    borderRadius="0.8rem"
                    p="1rem 1.4rem"
                    fontSize="1.6rem"
                    fontWeight="400"
                    placeholder={placeholder}
                    _focus={{ border: "1px solid var(--gray-300)" }}
                    minH="12.6rem"
                    resize="none"
                    {...props}
                ></Textarea>
            ) : (
                <Input
                    h="4.4rem"
                    border="1px solid var(--gray-300)"
                    borderRadius="0.8rem"
                    p="1rem 1.4rem"
                    fontSize="1.6rem"
                    fontWeight="400"
                    type={type}
                    placeholder={placeholder}
                    _focus={{ border: "1px solid var(--gray-300)" }}
                    {...props}
                    onInput={onChangeNumberKey}
                />
            )}

            <FormErrorMessage fontSize="1.4rem">{error}</FormErrorMessage>
            {note && (
                <Text fontSize="1.4rem" fontWeight="400" mt="0.8rem" color="var(--gray-600)">
                    {note}
                </Text>
            )}
        </FormControl>
    );
};

export default InputForm;
