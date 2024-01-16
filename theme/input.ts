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
    },
});

export default inputStyle;
