import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface UIButtonProps extends ChakraButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const UIButton = ({ children, onClick, ...props }: UIButtonProps) => {
    return (
        <Button
            w="100%"
            bg="#00473C"
            colorScheme="#E6FF55"
            fontSize="1.4rem"
            fontWeight="600"
            borderRadius="99.9rem"
            h="3.6rem"
            p="0.6rem 1.2rem"
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
    );
};

export default UIButton;
