import { Box, Tag } from "@chakra-ui/react";

const Cascader = () => {
    return (
        <Box>
            <Box h="4.4rem" border="1px solid var(--gray-300)" borderRadius="0.8rem" p="1rem 1.4rem">
                <Tag size="lg" variant="outline" colorScheme="red">
                    Sample Tag
                </Tag>
            </Box>
        </Box>
    );
};
export default Cascader;
