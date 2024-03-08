const tabStyle = {
    baseStyle: {},
    variants: {
        ingredient: {
            tablist: {},
            tab: {
                _hover: {},
                _selected: {
                    color: "var(--primary-text-color)",
                    fontWeight: "700",
                    bg: "#E6EDEC",
                },
                color: "var(--gray-500)",
                fontSize: "1.8rem",
                lineHeight: "2.8rem",
                fontWeight: "400",
            },
            tabpanel: {
                p: "0",
            },
        },
        history: {
            tablist: {},
            tab: {
                _hover: {},
                _selected: {
                    color: "#00322A",
                    fontWeight: "600",
                    "& .history-number": {
                        bg: "#CCDAD8 !important",
                        borderColor: "#66918A !important",
                    },
                },
                color: "var(--gray-500)",
                fontSize: "1.8rem",
                lineHeight: "2.8rem",
                fontWeight: "600",
            },
            tabpanel: {
                pt: "1.6rem",
                borderTop: "0.2rem solid var(--gray-200)",
            },
        },
    },
};

export default tabStyle;
