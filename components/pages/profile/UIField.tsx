import { Flex, Box, Text } from "@chakra-ui/react";

interface UIFieldProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

const UIField = ({ title, description, children }: UIFieldProps) => {
    return (
        <Flex
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: "1.5rem", md: "3.2rem" }}
            justifyContent="space-between"
            pb="2rem"
            mb="2rem"
            borderBottom="1px solid #EAECF0"
        >
            <Box w={{ base: "100%", md: "28rem" }} paddingRight="2.4rem">
                <Text color="var(--gray-700)" fontSize="1.4rem" fontWeight="700">
                    {title}
                </Text>
                <Text color="var(--text-gray)" fontSize="1.4rem" fontWeight="400">
                    {description}
                </Text>
            </Box>
            <Box flex="1">{children}</Box>
        </Flex>
    );
};
export default UIField;
