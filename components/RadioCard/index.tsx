"use client";
import { Box, useRadio } from "@chakra-ui/react";

interface RadioCardProps {
    children: React.ReactNode;
}
function RadioCard(props: RadioCardProps) {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                h="3.6rem"
                minW="10.3rem"
                border="1px solid var(--gray-300)"
                borderRadius="2.4rem"
                fontSize="1.4rem"
                fontWeight="400"
                color="var(--gray-700)"
                textAlign="center"
                cursor="pointer"
                p="0.8rem 1.5rem"
                _checked={{
                    bg: "#00473C",
                    color: "#E6FF55",
                    borderColor: "#00473C",
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
}

export default RadioCard;
