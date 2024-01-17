import { svnGilroy } from "./fonts";

const buttonStyle = {
    defaultProps: {
        minWidth: "1rem",
        px: 0,
        _hover: {},
    },
    baseStyle: {
        _hover: {
            bg: null,
        },
        _active: {},
    },
    variants: {
        noAnimate: {
            _active: {
                opacity: "initial",
            },
        },
        solid: {
            ...svnGilroy.style,
            background: "var(--primary-color)",
            color: "var(--primary-button-text-color)",
            _hover: {
                bg: null,
                opacity: 0.7,
            },
            _active: {
                bg: null,

                opacity: 0.5,
            },
            fontSize: "1.8rem",
            fontWeigth: 600,
        },
    },
};

export default buttonStyle;
