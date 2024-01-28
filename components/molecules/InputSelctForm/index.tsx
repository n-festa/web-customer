import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormLabel,
    FormLabelProps,
    Select,
    SelectProps,
    Text,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

const InputSelectForm: React.FC<
    SelectProps & {
        labelProps?: FormLabelProps;
        note?: string;
        error?: string | number;
        options: { key: string; value: string }[];
        formControlProps?: FormControlProps;
        onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
        name: string;
    }
> = ({ name, onChange, options, title, labelProps, placeholder, note, error, formControlProps, ...props }) => {
    console.log("ERRRR", error);
    return (
        <FormControl w="100%" isInvalid={!!error} {...formControlProps}>
            <FormLabel color="var(--gray-700)" fontSize="1.4rem" fontWeight="500" mb="0.6rem" {...labelProps}>
                {title}
            </FormLabel>
            <Select
                variant="filter"
                h="4.4rem"
                border="1px solid var(--gray-300)"
                borderRadius="0.8rem"
                fontSize="1.6rem"
                fontWeight="400"
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                id={name}
                _focus={{ border: "1px solid var(--gray-300)" }}
                {...props}
            >
                {options.map((item) => (
                    <option key={item.key}>{item.value}</option>
                ))}
            </Select>
            <FormErrorMessage fontSize="1.4rem">{error}</FormErrorMessage>
            {note && (
                <Text fontSize="1.4rem" fontWeight="400" mt="0.8rem" color="var(--gray-600)">
                    {note}
                </Text>
            )}
        </FormControl>
    );
};

export default InputSelectForm;
