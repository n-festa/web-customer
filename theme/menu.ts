import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
    list: {
        // this will style the MenuList component
        py: "4",
        borderRadius: "xl",
        border: "none",
        bg: "var(--primary-color)",
    },
    item: {
        // this will style the MenuItem and MenuItemOption components
        fontSize: "1.4rem",
        bg: "var(--primary-color)",
        color: "var(--primary-button-text-color)",
        _hover: {
            bg: "var(--primary-300)",
        },
        _focus: {
            bg: "var(--primary-300)",
        },
    },
});
export const menuTheme = defineMultiStyleConfig({ baseStyle });
