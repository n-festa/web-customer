const tabStyle = {
    baseStyle: {},
    variants: {
        ingredient: {
            tablist: {},
            tab: {
                _hover: {},
                _selected: {
                    color: "#00322A",
                    fontWeight: "700",
                    bg: "#E6EDEC",
                },
                color: "var(--gray-500)",
                fontSize: "1.8rem",
                lineHeight: "2.8rem",
                fontWeight: "400",
            },
            tabpanel: {
                borderTop: "0.2rem solid var(--gray-200)",
            },
        },
    },
};

export default tabStyle;
