"use client";
import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormLabel,
    FormLabelProps,
    Input,
    Text,
} from "@chakra-ui/react";

type InputFormProps = {
    title: string;
    placeholder: string;
    type: string;
    note?: string;
    error?: string | number;
    labelProps?: FormLabelProps;
    formControlProps?: FormControlProps;
};

const InputForm: React.FC<InputFormProps> = ({
    title,
    type = "text",
    labelProps,
    placeholder,
    note,
    error,
    formControlProps,
    ...props
}) => {
    const onChangeNumberKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const ASCIICode = e.which ? e.which : e.keyCode;
        if (type === "number") {
            if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
                e.preventDefault();
                return false;
            } else {
                return true;
            }
        }
        return true;
    };
    return (
        <FormControl w="100%" mb="1.6rem" isInvalid={!!error} {...formControlProps}>
            <FormLabel fontSize="1.6rem" fontWeight="600" mb="0.6rem" {...labelProps}>
                {title}
            </FormLabel>
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
                onKeyPress={onChangeNumberKey}
            />
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
