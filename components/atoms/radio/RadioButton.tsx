import { Box, BoxProps, RadioProps, useRadio } from "@chakra-ui/react";
import { useMemo } from "react";

const RadioButton = (props: { isRounded?: boolean } & RadioProps) => {
    const { getInputProps, getRadioProps } = useRadio(props);
    const { isRounded = false } = props;

    const input = getInputProps();
    const checkbox = getRadioProps();

    const style: BoxProps = useMemo(() => {
        if (isRounded)
            return {
                p: "0.8rem 1.4rem",
                borderRadius: "2.4rem",
                border: "1px solid var(--gray-300)",
                color: "var(--gray-700)",
                lineHeight: "2rem",
                fontWeight: "600",
                minW: "10.3rem",
                textAlign: "center",
            };
        return {
            p: "1rem 1.6rem",
            boxSizing: "border-box",
            fontWeight: "600",
            color: "var(--gray-700)",
            userSelect: "none",
            maxH: "4rem",
            fontSize: "1.4rem",
            whiteSpace: "nowrap",
        };
    }, [isRounded]);

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
                {...style}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default RadioButton;
