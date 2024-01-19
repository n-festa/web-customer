import { Button, Flex, HStack, Img, Text } from "@chakra-ui/react";
import Link from "next/link";
import NavigationButton from "./NavigationButton";

const Header = () => {
    return (
        <Flex
            position="fixed"
            px="1rem"
            h="8rem"
            zIndex="9999"
            alignItems="center"
            w="100%"
            bg="var(--main-bg-color)"
            justifyContent="space-between"
            borderBottom="1px solid var(--gray-100)"
        >
            <Flex h="100%" alignItems="center">
                <Link href="/">
                    <Img alt="fictional-company-logo" src="/images/logo1.svg" />
                </Link>

                <HStack alignItems="center" h="100%" gap="3.2rem" mr="3rem">
                    <NavigationButton>
                        <Link href="#order-section">Đặt hàng</Link>
                    </NavigationButton>
                    <NavigationButton>
                        <Link href="#contact-section">Dành cho Đối tác</Link>
                    </NavigationButton>
                    <NavigationButton>
                        <Link href="#download-section">Tải App</Link>
                    </NavigationButton>
                    <NavigationButton>
                        <Link href="#footer-section">Liên hệ</Link>
                    </NavigationButton>
                </HStack>
            </Flex>

            <HStack spacing="1.6rem">
                <Link href="/search">
                    <Button borderRadius="0.8rem" variant="solid" width="13.1rem" height="4.4rem">
                        Đăng nhập
                    </Button>
                </Link>
                <Img
                    cursor="pointer"
                    p="0.2rem"
                    width="3rem"
                    height="3rem"
                    _hover={{
                        p: "0rem",
                        width: "3rem",
                        height: "3rem",
                    }}
                    alt="small-icon"
                    src="/images/shoppingbag03.svg"
                />
                <HStack alignItems="center">
                    <Text color="var(--text-gray)" fontSize="1.6rem" fontWeight="600">
                        VIE
                    </Text>
                    <Link href="#">
                        <Img width="2rem" height="2rem" alt="" src="/images/vn.svg" />
                    </Link>
                </HStack>
            </HStack>
        </Flex>
    );
};

export default Header;
