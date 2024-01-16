import { ThemeOverride, extendTheme } from "@chakra-ui/react";
import buttonStyle from "./button";
import colors from "./colors";
import inputStyle from "./input";
import textStyle from "./text";
import textStyles from "./textStyle";

const breakpoints = {
    base: "0px",
    sm: "414px",
    md: "768px",
    lg: "960px",
    xl: "1100px",
};

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};
const theme: ThemeOverride = extendTheme({
    config,
    styles: {
        global: {
            body: {
                background: "var(--main-bg-color)",
                overflow: "hidden",
                width: "100vw",
                minHeight: "-webkit-fill-available",
                height: "var(--app-height)",
                color: "var(--primary-text-color)",
                userSelect: "none",
                WebkitTouchCallout: "none",
                WebkitTapHighlightColor: "transparent",
            },
        },
    },
    fonts: {
        heading: "var(--font-quicksand)",
        body: "var(--font-quicksand)",
    },
    breakpoints,
    colors: colors,
    components: {
        Input: inputStyle,
        Button: buttonStyle,
        Text: textStyle,
    },
    textStyles,
});

export default theme;