import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["field"]);

const inputStyle = helpers.defineMultiStyleConfig({
    baseStyle: {
        field: {
            _invalid: {
                border: "2px solid var(--main-color)",
            },
        },
    },
    variants: {
        search: {
            field: {
                color: "var(--primary-text-color)",
                fontWeight: "500",
                bg: "transparent",
                _placeholder: {
                    fontSize: "1.8rem",
                },
            },
        },
        email: {
            field: {
                borderRadius: "0.8rem",
                color: "var(--gray-500)",
                fontWeight: "500",
                fontSize: "1.6rem",
                bg: "white",
                border: "1px solid rgba(208, 213, 221, 1)",
                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                _placeholder: {
                    color: "var(--gray-500)",
                    fontSize: "1.6rem",
                },
            },
        },
        searchBox: {
            field: {
                bg: "white",
                border: "1px solid var(--gray-300)",
                borderRadius: "10px",
                color: "var(--gray-600)",
                height: "6rem",
                fontSize: "1.8rem",
                fontWeight: "medium",
                _focus: {},
                _hover: {},
                _placeholder: {
                    color: "var(--gray-600)",
                },
            },
        },
    },
});

export default inputStyle;
