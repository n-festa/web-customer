import { inter } from "@/theme/fonts";

const textStyle = {
    baseStyle: {
        margin: 0,
        padding: 0,
    },
    variants: {
        header: {
            ...inter.style,
            color: "#000",
            fontSize: "3.6rem",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "4.4rem",
            letterSpacing: "-0.072rem",
        },
        description: {
            color: "#000",
            fontSize: "2rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "3rem",
        },
        hoverWhite: {
            _hover: {
                opacity: 0.7,
            },
        },
        toggle: {
            color: "var(--gray-700)",
            fontSize: "1.6rem",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "2.4rem",
        },
    },
};

export default textStyle;
