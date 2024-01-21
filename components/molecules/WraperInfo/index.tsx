import { Box, BoxProps, Button, Flex, FlexProps, HStack, Text } from "@chakra-ui/react";

interface Props {
    title: string;
    description?: string;
    contentProps?: BoxProps;
    onClickViewAll?: () => void;
}

const WraperInfo = ({ title, description, children, onClickViewAll, contentProps, ...rest }: Props & FlexProps) => {
    return (
        <Flex flexDirection={"column"} alignItems={"flex-start"} w="100%" {...rest}>
            <Text variant={"header"}>{title}</Text>
            <HStack justifyContent={"space-between"} w="100%">
                {description && <Text variant={"description"}>{description}</Text>}
                <Button variant={"btnViewAll"} onClick={onClickViewAll} p="0">
                    Xem tất cả
                </Button>
            </HStack>
            <Box w="100%" mt="2.4rem" {...contentProps}>
                {children}
            </Box>
        </Flex>
    );
};

export default WraperInfo;
