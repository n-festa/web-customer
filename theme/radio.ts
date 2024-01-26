import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle, theme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys);
theme.components.Radio;
const sizes = {
    xxl: definePartsStyle({
        control: defineStyle({
            w: "1.6rem",
            h: "1.6rem",
            borderRadius: "50%",
            border: "1px solid var(--gray-300)",
            bg: "#fff",
            _checked: {
                bg: "#CCDAD8",
                border: "1px solid #00473C",
                _hover: {
                    bg: "#CCDAD8",
                    border: "1px solid #00473C",
                },
                _before: {
                    bg: "#00473C",
                    w: "0.6rem",
                    h: "0.6rem",
                    borderRadius: "999px",
                },
            },
        }),
        label: defineStyle({
            fontSize: "1.6rem",
            fontWeight: "400",
            marginLeft: "0.8rem",
            w: "max-content",
            color: "var(--gray-700)",
        }),
    }),
};

export const radioTheme = defineMultiStyleConfig({
    sizes,
    defaultProps: {
        size: "xxl",
    },
    variants: {
        round: {
            label: {
                p: "0.8rem 1.4rem",
                borderRadius: "2.4rem",
                border: "1px solid var(--gray-300)",
                color: "var(--gray-700)",
                lineHeight: "2rem",
                fontWeight: "600",
            },
        },
    },
});
