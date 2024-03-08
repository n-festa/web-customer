import { Box, Flex, Text } from "@chakra-ui/react";
interface UIWrapInfoProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const UIWrapInfo = ({ title, description, children }: UIWrapInfoProps) => {
    return (
        <Flex
            flexDirection={{ md: "column", lg: "row" }}
            padding={{ md: "3.2rem 0", lg: "3.2rem 4rem" }}
            borderBottom="1px solid #EAECF0"
            rowGap="2rem"
        >
            <Box maxW={{ md: "100%", lg: "25.9rem" }} paddingRight="2.4rem">
                <Text color="var(--gray-900)" fontSize="2rem" fontWeight="600" mb="1rem">
                    {title}
                </Text>
                <Text color="var(--text-gray)" fontSize="1.6rem" fontWeight="500">
                    {description}
                </Text>
            </Box>
            <Box flex="1" padding={{ md: "0", lg: "0 3.2rem" }} borderLeft={{ md: "unset", lg: "1px solid #EAECF0" }}>
                {children}
            </Box>
        </Flex>
    );
};
export default UIWrapInfo;
