"use client";
import CartIcon from "@/components/atoms/CartIcon";
import CartIconFallBack from "@/components/atoms/CartIcon/CartIconFallback";
import DeliveryLocation from "@/components/molecules/SearchLocation/DeliveryLocation";
import { routes } from "@/utils/routes";
import { Flex, HStack, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useMemo } from "react";
import SlideMenu from "../SlideMenu";
import LocaleSwitcher from "./LocaleSwitcher";
import NavigationButton from "./NavigationButton";
const UserGroup = dynamic(() => import("./UserGroup"), { ssr: false });

const Header = () => {
    const t = useTranslations("MENU");
    const { isOpen, onClose, onOpen } = useDisclosure();
    const pathname = usePathname();
    const locale = useLocale();
    const { showDeliveryBox, showSignUpGroup, showListNavi, bg, hideCart } = useMemo(() => {
        let showDeliveryBox = false;
        let bg = "white";
        let showSignUpGroup = true;
        let showListNavi = false;
        let hideCart = false;
        const pathNameWithoutLocale = pathname.replace(locale + "/", "");
        const pathLocale = "/" + locale;

        switch (pathNameWithoutLocale) {
            case pathLocale:
            case routes.Home:
                bg = "var(--main-bg-color)";
                showListNavi = true;
                hideCart = true;
                break;
            case routes.Otp:
            case routes.RegistrationSuccess:
            case routes.SignIn:
            case routes.AdditionalSignUpInfo:
                showListNavi = true;
                showSignUpGroup = false;
                hideCart = true;
                bg = "var(--main-bg-color)";

                break;
            default:
                const index = [
                    routes.RestaurantDetail,
                    routes.Search,
                    routes.SearchDetail,
                    routes.OrderDetail,
                ].findIndex((el) => pathname.includes(el));
                if (index != -1) showDeliveryBox = true;
                break;
        }
        return { showDeliveryBox, showSignUpGroup, showListNavi, bg, hideCart };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <>
            <SlideMenu onClose={onClose} isOpen={isOpen} />
            <HStack
                position="fixed"
                pr={{ base: "1.5rem", lg: showDeliveryBox ? "7.1rem" : "8.3rem" }}
                h="8rem"
                zIndex="999"
                alignItems="center"
                w="100%"
                top="0"
                bg={bg}
                justifyContent="space-between"
                borderBottom="1px solid var(--gray-300)"
            >
                <HStack
                    spacing={{ lg: "4rem", base: "1rem" }}
                    cursor="pointer"
                    pl={"3.1rem"}
                    display={{ base: "flex", lg: !showListNavi ? "flex" : "none" }}
                >
                    <Image alt="menu" onClick={onOpen} color="red" src={"/images/menu-03.svg"} />
                    <Link href="/">
                        <Image
                            width={"14.3rem"}
                            height={"3.3rem"}
                            alt="fictional-company-logo"
                            src="/images/logo1.svg"
                        />
                    </Link>
                    {showDeliveryBox && <DeliveryLocation />}
                </HStack>
                {showListNavi && (
                    <Flex pl="8.3rem" display={{ base: "none", lg: "flex" }} h="100%" alignItems="center">
                        <Link href="/">
                            <Image
                                width={"14.3rem"}
                                height={"3.3rem"}
                                alt="fictional-company-logo"
                                src="/images/logo1.svg"
                            />
                        </Link>

                        <HStack alignItems="center" h="100%" gap="3.2rem" mr="3rem">
                            <NavigationButton>
                                <Link href="#order-section">{t("PLACE_ORDER")}</Link>
                            </NavigationButton>
                            <NavigationButton>
                                <Link href="#contact-section">{t("FOR_PARTNERS")}</Link>
                            </NavigationButton>
                            <NavigationButton>
                                <Link href="#download-section">{t("DOWNLOAD_APP")}</Link>
                            </NavigationButton>
                            <NavigationButton>
                                <Link href="#footer-section">{t("CONTACT_US")}</Link>
                            </NavigationButton>
                        </HStack>
                    </Flex>
                )}

                <HStack spacing="1.6rem">
                    <HStack spacing="1.6rem">
                        {!showListNavi && (
                            <Text
                                whiteSpace="nowrap"
                                color="var(--gray-600)"
                                fontSize="1.6rem"
                                fontWeight="medium"
                                display={{ base: "none", lg: "block" }}
                            >
                                Hotline: 1900 54 54
                            </Text>
                        )}
                        {showSignUpGroup && <UserGroup bg={bg} />}
                        {!hideCart && (
                            <Suspense fallback={<CartIconFallBack />}>
                                <CartIcon />
                            </Suspense>
                        )}
                    </HStack>
                    <LocaleSwitcher />
                </HStack>
            </HStack>
        </>
    );
};

export default Header;
