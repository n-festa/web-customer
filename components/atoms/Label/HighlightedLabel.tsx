import { Text, TextProps } from "@chakra-ui/react";

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export const HighlightedText = ({
    text,
    highlight,
    highlightStyle,
    highlightColor = "var(--gray-900)",
    ...props
}: {
    text: string;
    highlight?: string;
    highlightColor?: string;
    highlightStyle?: TextProps;
} & TextProps) => {
    // Split on highlight term and include term into parts, ignore case
    const escapeRegexText = escapeRegExp(highlight ?? "");
    const parts = text?.split(new RegExp(`(${escapeRegexText})`, "gi"));

    return (
        <Text {...props}>
            {parts?.map((part, i) => {
                const isHighlighted = part.toLowerCase() === highlight?.toLowerCase();
                const style = isHighlighted ? { ...highlightStyle } : {};

                return (
                    <Text
                        as="span"
                        key={`highlighted${i}`}
                        color={isHighlighted ? highlightColor : undefined}
                        {...style}
                    >
                        {part}
                    </Text>
                );
            })}
        </Text>
    );
};
