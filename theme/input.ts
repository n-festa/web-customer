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
        date: {
            field: {
                borderRadius: "1.5rem",
                display: "-webkit-inline-flex",
                justifyContent: "center",
                textAlign: "-webkit-center",
                bg: "transparent",
                border: "1px solid var(--cell-border-color)",
                fontSize: "1.2rem",
                fontWeight: "bold",
            },
        },
        search: {
            field: {
                color: "var(--primary-text-color)",
                fontWeight: "medium",
                fontSize: "1.4rem",
                bg: "transparent",

                _placeholder: {
                    color: "var(--secondary-text-color)",
                    fontSize: "1.4rem",
                    fontWeight: "medium",
                },
            },
        },

        searchFocus: {
            field: {
                bg: "transparent",
                height: "5.9rem",
                zIndex: 1,
                color: "var(--primary-text-color)",
                fontWeight: "medium",
                fontSize: "1.4rem",
                _placeholder: {
                    color: "transparent",
                },
            },
        },
        inputShadow: {
            field: {
                bg: "var(--input-bg)",
                boxShadow: "var(--box-shadow-input) !important",
                borderRadius: "1.5rem",
                fontFamily: "var(--font-notosansjp)",

                _placeholder: {
                    color: "var(--secondary-text-color)",
                    fontSize: "1.6rem",
                    lineHeight: "1.7rem",
                    fontWeight: "bold",
                },
            },
        },
        inputShadowPassword: {
            field: {
                bg: "var(--input-bg)",
                boxShadow: "var(--box-shadow-input) !important",
                borderRadius: "1.5rem",
                fontFamily: "var(--font-notosansjp)",
                fontSize: "1.4rem",

                _placeholder: {
                    color: "var(--secondary-text-color)",
                    fontSize: "1.4rem",
                    lineHeight: "1.7rem",
                    fontWeight: "bold",
                    textAlign: "center",
                },
            },
        },
        inputShadowError: {
            field: {
                bg: "var(--input-bg-error)",
                boxShadow: "var(--box-shadow-input-error)",
                borderRadius: "1.5rem",
                fontFamily: "var(--font-notosansjp)",
            },
        },
        underline: {
            field: {
                borderRadius: "0",
                bg: "transparent",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "flex-end",
            },
        },
        inputDate: {
            field: {
                bg: "transparent",
                height: "3.2rem",
                w: "13.5rem",
                fontWeight: "medium",
                zIndex: 1,
                color: "var(--primary-text-color)",
                border: "1px solid var(--primary-border-color)",
                fontSize: "1.4rem",
                _placeholder: {
                    color: "transparent",
                },
                _focus: {
                    border: "1px solid var(--main-color)",
                },
            },
        },
    },
});

export default inputStyle;
