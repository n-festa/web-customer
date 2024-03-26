import { alertAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const xl = defineStyle({
    fontSize: "lg",
    px: "4",
    h: "12",
});

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle({
    // define the part you're going to style
    container: {
        py: "1rem",
        alignItems: "center",
    },
    icon: {
        mr: "1rem",
        alignSelf: "center",
    },
    title: {
        fontSize: "1.6rem",
    },
    description: {
        mt: "0.5rem",
        whiteSpace: "pre-line",
        lineHeight: "2rem",
        fontSize: "1.4rem",
    },
});

const sizes = {
    xl: definePartsStyle({ title: xl, description: xl }),
};
export const alertTheme = defineMultiStyleConfig({ sizes, baseStyle });
