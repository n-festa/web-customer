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
                color: "white",
            },
            _active: {
                bg: null,

                opacity: 0.5,
            },
            fontSize: "1.8rem",
            fontWeigth: 600,
        },
        btnBack: {
            bg: "transparent",
            px: 0,
            fontSize: "1.4rem",
            color: "var(--gray-600)",
            _active: {
                opacity: 0.5,
            },

            _hover: {},
        },
        btnPagination: {
            borderRadius: "18px",
            w: "3.6rem",
            h: "3.6rem",
            minW: "3.6rem",
            bg: "var(--color-palegoldenrod)",
            p: 0,
            m: 0,
        },
        btnDotPagination: {
            borderRadius: "0.4rem",
            w: "0.8rem",
            h: "0.8rem",
            minW: "0.8rem",
            bg: "var(--gray-200)",
            p: 0,
            m: 0,
        },

        btnViewAll: {
            h: "3.6rem",
            minW: "0.8rem",
            p: "0.6rem 0",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "var(--color-mediumslateblue)",
        },
        btnViewAllSm: {
            minW: "0.8rem",
            p: "0.6rem 0",
            fontSize: "1.6rem",
            fontWeight: "600",
            lineHeight: "2.4rem",
            color: "var(--color-mediumslateblue)",
        },
        btnSubmit: {
            w: "100%",
            bg: "var(--primary-500) !important",
            border: "1px solid var(--primary-500)",
            color: "var(--icterine-500)",
            fontSize: "1.4rem",
            fontWeight: "600",
            borderRadius: "99.9rem",
            h: "3.6rem",
            p: "0.6rem 1.2rem",

            _hover: {
                opacity: 0.8,
                background: "var(--primary-color)",
                color: "white",
            },
        },
        btnAddToCart: {
            p: "1.2rem 4rem",
            bg: "var(--primary-500)",
            color: "var( --icterine-500)",
            fontSize: "2rem",
            lineHeight: "3rem",
            fontWeight: "600",
            _active: {
                opacity: 0.5,
            },

            _hover: {},
        },
        btnNumbericStepper: {
            p: "0",
            w: "2.4rem",
            h: "2.4rem",
            bg: "transparent",
            _active: {
                opacity: 0.5,
            },
            _hover: {},
        },
    },
};

export default buttonStyle;
