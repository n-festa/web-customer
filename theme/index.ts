import { selectStyle } from "@/theme/select";
import { switchStyle } from "@/theme/switch";
import tabStyle from "@/theme/tab";
import tableStyle from "@/theme/table";
import { ThemeOverride, extendTheme } from "@chakra-ui/react";
import buttonStyle from "./button";
import { checkboxTheme } from "./checkbox";
import colors from "./colors";
import inputStyle from "./input";
import { menuTheme } from "./menu";
import { radioTheme } from "./radio";
import textStyle from "./text";
import textAreaStyle from "./textArea";
import textStyles from "./textStyle";

const breakpoints = {
    sm: "414px",
    md: "550px",
    lg: "960px",
    xl: "1100px",
    "2xl": "1300px",
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
                height: "100dvh",
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
        Textarea: textAreaStyle,
        Checkbox: checkboxTheme,
        Select: selectStyle,
        Radio: radioTheme,
        Table: tableStyle,
        Tabs: tabStyle,
        Switch: switchStyle,
        Menu: menuTheme,
    },
    textStyles,
});

export default theme;
