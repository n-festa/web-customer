import { Text, TextProps } from "@chakra-ui/react";

const NavigationButton = ({ children, ...props }: TextProps) => {
    return (
        <Text
            whiteSpace="pre-line"
            wordBreak="break-word"
            fontSize="1.8rem"
            color="#00473C"
            fontFamily="var(--font-quicksand)"
            fontWeight="bold"
            lineHeight="2.4rem"
            _hover={{ color: "" }}
            {...props}
        >
            {children}
        </Text>
    );
};

export default NavigationButton;
