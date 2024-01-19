import { Box, RadioProps, useRadio } from "@chakra-ui/react";

const RadioButton = (props: RadioProps) => {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();

    return (
        <Box as="label" fontSize={"1.4rem"}>
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                _checked={{
                    bg: "var(--primary-500)",
                    color: "var(--icterine-500)",
                }}
                _focus={{}}
                p={"1rem 1.6rem"}
                boxSizing="border-box"
                fontWeight={"600"}
                color="var(--gray-700)"
                userSelect={"none"}
                maxH="4rem"
                fontSize={"1.4rem"}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default RadioButton;
