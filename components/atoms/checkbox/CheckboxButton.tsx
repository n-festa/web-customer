import { Box, CheckboxProps, Img, useCheckbox } from "@chakra-ui/react";

const CheckBoxButton = (props: CheckboxProps) => {
    const { state, getInputProps, getCheckboxProps } = useCheckbox(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label" fontSize={"1.4rem"}>
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                _checked={{
                    bg: "#E0F2DE",
                    color: "var(--green-light-500)",
                    borderColor: "var(--green-light-500)",
                }}
                _focus={{}}
                p={"10px 16px"}
                boxSizing="border-box"
                fontWeight={"600"}
                color="var(--gray-700)"
                userSelect={"none"}
                maxH="3.6rem"
                border="1px solid var(--gray-300)"
                borderRadius={"0.8rem"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                fontSize={"1.4rem"}
            >
                {props.children}
                {state.isChecked && <Img ml="6px" src="/images/icons/x-close.svg" />}
            </Box>
        </Box>
    );
};

export default CheckBoxButton;
