import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
    list: {
        // this will style the MenuList component
        py: "4",
        borderRadius: "xl",
        border: "var(--divider)",
        bg: "white",
        boxShadow: "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08) !important",
    },
    item: {
        // this will style the MenuItem and MenuItemOption components
        fontSize: "1.6rem",
        fontWeight: "500",
        px: "1.4rem",
        bg: "white",
        color: "var(--gray-900)",
        _hover: {
            bg: "var(--gray-100)",
        },
        _focus: {
            bg: "var(--gray-100)",
        },
    },
});

const variants = {
    user: {
        list: {
            // this will style the MenuList component
            py: "4",
            borderRadius: "xl",
            bg: "var(--main-bg-color)",

            border: "var(--divider)",
            _hover: {
                boxShadow: "0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
            },
        },
        item: {
            // this will style the MenuItem and MenuItemOption components
            fontSize: "1.4rem",
            bg: "var(--main-bg-color)",
            color: "var(--primary-text-color)",
            _hover: {
                bg: "var(--chakra-colors-gray-200)",
            },
            _focus: {
                bg: "transparent",
            },
        },
    },
};
export const menuTheme = defineMultiStyleConfig({ baseStyle, variants });
