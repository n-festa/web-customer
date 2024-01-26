export const switchStyle = {
    defaultProps: {},
    variants: {
        green: {
            thumb: {
                bg: "var(--primary-500)",
                _checked: {
                    bg: "white",
                    transform: "translateX(2rem)",
                },
                w: "2rem",
                h: "2rem",
                mt: "0.2rem",
                mx: "0.25rem",
            },
            track: {
                bg: "var(--gray-300)",
                _checked: {
                    bg: "var(--primary-500)",
                },
                w: "4.4rem",
                h: "2.4rem",
            },
        },
    },
};
