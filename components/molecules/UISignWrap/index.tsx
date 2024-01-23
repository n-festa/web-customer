import { Center, Flex } from "@chakra-ui/react";

interface UISignWrapProps {
    bg?: string;
    maxW?: string;
    children: React.ReactElement;
}

const UISignWrap = ({ bg = "white", maxW = "max-content", children }: UISignWrapProps) => {
    return (
        <Flex w="100%" h="100%" bg={bg}>
            <Center m="4.0rem auto" w="100%" maxW={maxW} p="0 1.5rem" h="max-content">
                {children}
            </Center>
        </Flex>
    );
};

export default UISignWrap;
