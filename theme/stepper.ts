import { theme } from "@chakra-ui/react";
theme.components.Stepper;
const baseStyle = {
    // select the indicator part
    indicator: {
        width: "2.4rem",
        height: "2.4rem",
        borderWidth: "0.15rem",
        bg: "white",
        "&[data-status=active]": {
            borderWidth: "0.15rem",
            borderColor: "var(--success)",
        },
        "&[data-status=complete]": {
            borderColor: "var(--success)",
            bg: "white",
        },
        "&[data-status=incomplete]": {
            borderWidth: "0.15rem",
            borderColor: "var(--gray-200)",
        },
    },
    step: {
        position: "relative",
    },
};

export const stepperTheme = {
    baseStyle,
};
