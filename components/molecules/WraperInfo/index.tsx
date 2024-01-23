import { Box, BoxProps, Button, Flex, FlexProps, HStack, Text, TextProps } from "@chakra-ui/react";

interface Props {
    title: string;
    isViewAll?: boolean;
    description?: string;
    contentProps?: BoxProps;
    titleProps?: TextProps;
    bottom?: React.ReactNode;
    isShowBottom?: boolean;
    onClickViewAll?: () => void;
}

const WraperInfo = ({
    title,
    description,
    children,
    onClickViewAll,
    contentProps,
    titleProps,
    bottom,
    isShowBottom = false,
    isViewAll = true,
    ...rest
}: Props & FlexProps) => {
    return (
        <Flex flexDirection={"column"} alignItems={"flex-start"} w="100%" {...rest}>
            <Text variant={"header"} {...titleProps}>
                {title}
            </Text>
            <HStack justifyContent={"space-between"} w="100%">
                {description && <Text variant={"description"}>{description}</Text>}
                {isViewAll && (
                    <Button variant={"btnViewAll"} onClick={onClickViewAll} p="0">
                        Xem tất cả
                    </Button>
                )}
            </HStack>
            <Box w="100%" mt="2.4rem" flex={1} {...contentProps}>
                {children}
            </Box>
            {isShowBottom ? (
                bottom ?? (
                    <Button variant={"btnViewAllSm"} onClick={onClickViewAll} p="0">
                        Xem tất cả
                    </Button>
                )
            ) : (
                <></>
            )}
        </Flex>
    );
};

export default WraperInfo;
