import { inter, svnGilroy } from "@/theme/fonts";

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
            ...svnGilroy.style,
            color: "#000",
            fontSize: "2rem",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "3rem",
        },
    },
};

export default textStyle;
