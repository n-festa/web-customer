"use client";
import { routes } from "@/utils/routes";
import { Button, Flex, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import SlideMenu from "../SlideMenu";
import NavigationButton from "./NavigationButton";

const Header = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const pathname = usePathname();
    const isHome = useMemo(() => {
        return pathname === routes.Home;
    }, [pathname]);
    return (
        <>
            <SlideMenu onClose={onClose} isOpen={isOpen} />
            <Flex
                position="fixed"
                px="3.1rem"
                h="8rem"
                zIndex="999"
                alignItems="center"
                w="100%"
                bg="var(--main-bg-color)"
                justifyContent="space-between"
                borderBottom="1px solid var(--gray-100)"
            >
                <HStack spacing="4rem" cursor="pointer" display={{ base: "flex", lg: !isHome ? "flex" : "none" }}>
                    <Image alt="menu" onClick={onOpen} color="red" src={"/images/menu-03.svg"} />
                    <Link href="/">
                        <Image width={143} height={33} alt="fictional-company-logo" src="/images/logo1.svg" />
                    </Link>
                </HStack>
                {isHome && (
                    <Flex display={{ base: "none", lg: "flex" }} h="100%" alignItems="center">
                        <Link href="/">
                            <Image width={143} height={33} alt="fictional-company-logo" src="/images/logo1.svg" />
                        </Link>

                        <HStack alignItems="center" h="100%" gap="3.2rem" mr="3rem">
                            <NavigationButton>
                                <Link href="/#order-section">Đặt hàng</Link>
                            </NavigationButton>
                            <NavigationButton>
                                <Link href="/#contact-section">Dành cho Đối tác</Link>
                            </NavigationButton>
                            <NavigationButton>
                                <Link href="/#download-section">Tải App</Link>
                            </NavigationButton>
                            <NavigationButton>
                                <Link href="/#footer-section">Liên hệ</Link>
                            </NavigationButton>
                        </HStack>
                    </Flex>
                )}

                <HStack spacing="1.6rem">
                    <Link href="/search">
                        <Button borderRadius="0.8rem" variant="solid" width="13.1rem" height="4.4rem">
                            Đăng nhập
                        </Button>
                    </Link>
                    <Image
                        cursor="pointer"
                        p="0.2rem"
                        width="30"
                        height="30"
                        _hover={{
                            p: "0rem",
                            width: "30",
                            height: "30",
                        }}
                        alt="small-icon"
                        src="/images/shoppingbag03.svg"
                    />
                    <HStack as="button" alignItems="center">
                        <Text
                            color="var(--text-gray)"
                            display={{ base: "none", md: "block" }}
                            fontSize="1.6rem"
                            fontWeight="600"
                        >
                            VIE
                        </Text>
                        <Image width={19} height={19} alt="" src="/images/vn.svg" />
                    </HStack>
                </HStack>
            </Flex>
        </>
    );
};

export default Header;
