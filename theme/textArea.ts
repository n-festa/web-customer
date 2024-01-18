import { defineStyleConfig } from "@chakra-ui/react";

const textAreaStyle = defineStyleConfig({
    baseStyle: {
        color: "var(--gray-500)",
        borderRadius: "0.8rem",
        fontSize: "1.6rem",
        fontWeight: "500",
        bg: "white",
        border: "1px solid rgba(208, 213, 221, 1)",
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        _placeholder: {
            fontSize: "1.6rem",
        },
    },
    variants: {},
});

export default textAreaStyle;
