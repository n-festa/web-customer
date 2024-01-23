"use client";
import { Text, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

interface InputFormProps {
    title: string;
    placeholder: string;
    type: string;
    note?: string;
    error?: string | number;
}

const InputForm: React.FC<InputFormProps> = ({ title, type = "text", placeholder, note, error, ...props }) => {
    return (
        <FormControl mb="1.6rem" isInvalid={!!error}>
            <FormLabel fontSize="1.6rem" fontWeight="600" mb="0.6rem">
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
