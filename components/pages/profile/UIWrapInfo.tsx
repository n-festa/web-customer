import { Box, Flex, Text } from "@chakra-ui/react";
interface UIWrapInfoProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const UIWrapInfo = ({ title, description, children }: UIWrapInfoProps) => {
    return (
        <Flex padding="3.2rem 4rem" borderBottom="1px solid #EAECF0">
            <Box w="25.9rem" paddingRight="2.4rem">
                <Text color="var(--gray-900)" fontSize="2rem" fontWeight="600" mb="1rem">
                    {title}
                </Text>
                <Text color="var(--text-gray)" fontSize="1.6rem" fontWeight="500">
                    {description}
                </Text>
            </Box>
            <Box flex="1" padding="0 3.2rem" borderLeft="1px solid #EAECF0">
                {children}
            </Box>
        </Flex>
    );
};
export default UIWrapInfo;
