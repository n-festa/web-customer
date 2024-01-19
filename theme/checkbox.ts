import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle, theme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(checkboxAnatomy.keys);
theme.components.Checkbox;
const sizes = {
    xl: definePartsStyle({
        control: defineStyle({
            w: "2rem",
            h: "2rem",
            borderRadius: "0.6rem",
            border: "1px solid rgba(208, 213, 221, 1)",
            _checked: {
                bg: "var(--primary-color)",
                _hover: {
                    opacity: "0.7",
                    bg: "var(--primary-color)",
                },
            },
        }),
        label: defineStyle({
            fontSize: "1.6rem",
            fontWeight: "500",
            marginLeft: "1.2rem",
        }),
    }),
};

export const checkboxTheme = defineMultiStyleConfig({
    sizes,
    defaultProps: {
        size: "xl",
    },
});
