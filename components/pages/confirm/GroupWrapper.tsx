import { Flex, FlexProps, Text } from "@chakra-ui/react";

const GroupWrapper = ({
    title,
    children,
    titleFontSize,
    ...props
}: { title: string; titleFontSize?: string } & FlexProps) => {
    return (
        <Flex color="black" bg="white" px="1.6rem" pb="1.6rem" w="100%" h="fit-content" flexDir="column" {...props}>
            <Text py="0.8rem" fontSize={titleFontSize ?? "2.4rem"} borderBottom="var(--divider)" fontWeight={600}>
                {title}
            </Text>
            <Flex flex={1}>{children}</Flex>
        </Flex>
    );
};

export default GroupWrapper;
