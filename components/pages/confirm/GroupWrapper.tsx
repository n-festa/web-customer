import { Flex, FlexProps, Text, TextProps } from "@chakra-ui/react";
import { Omit } from "lodash";

const GroupWrapper = ({
    title,
    children,
    titleFontSize,
    contentProps,
    titleProps,
    ...props
}: { title: string | React.ReactNode; titleFontSize?: string; contentProps?: FlexProps; titleProps?: TextProps } & Omit<
    FlexProps,
    "title"
>) => {
    return (
        <Flex color="black" bg="white" px="1.6rem" pb="1.6rem" w="100%" h="fit-content" flexDir="column" {...props}>
            {typeof title === "string" ? (
                <Text
                    py="0.8rem"
                    fontSize={titleFontSize ?? "2.4rem"}
                    borderBottom="var(--divider)"
                    fontWeight={600}
                    {...titleProps}
                >
                    {title}
                </Text>
            ) : (
                title
            )}
            <Flex flex={1} {...contentProps}>
                {children}
            </Flex>
        </Flex>
    );
};

export default GroupWrapper;
