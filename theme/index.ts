import { modalStyle } from "@/theme/modal";
import { popoverStyle } from "@/theme/popover";
import { selectStyle } from "@/theme/select";
import { switchStyle } from "@/theme/switch";
import tabStyle from "@/theme/tab";
import tableStyle from "@/theme/table";
import { ThemeOverride, extendTheme } from "@chakra-ui/react";
import { alertTheme } from "./alert";
import buttonStyle from "./button";
import { checkboxTheme } from "./checkbox";
import colors from "./colors";
import inputStyle from "./input";
import { menuTheme } from "./menu";
import { radioTheme } from "./radio";
import { stepperTheme } from "./stepper";
import textStyle from "./text";
import textAreaStyle from "./textArea";
import textStyles from "./textStyle";

const breakpoints = {
    sm: "414px",
    md: "550px",
    xmd: "700px",
    xxmd: "850px",
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
        Modal: modalStyle,
        Stepper: stepperTheme,
        Alert: alertTheme,
        Popover: popoverStyle,
    },
    textStyles,
});

export default theme;
