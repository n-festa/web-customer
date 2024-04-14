import NavigationButton from "@/components/organism/header/NavigationButton";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    DrawerProps,
    Img,
    Link,
    VStack,
} from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const SlideMenu = (props: Omit<DrawerProps, "children">) => {
    const t = useTranslations("MENU");
    const locale = useLocale();
    const router = useRouter();
    return (
        <Drawer placement="left" {...props}>
            <DrawerOverlay />
            <DrawerContent
                bg="var(--main-bg-color)"
                minW={{ base: "100%", md: "50%" }}
                position="relative"
                zIndex="10000"
            >
                <DrawerCloseButton
                    w="4rem"
                    h="4rem"
                    sx={{
                        ".chakra-icon": {
                            width: "1.5rem",
                            height: "1.5rem",
                        },
                    }}
                    top={"2rem"}
                />
                <DrawerHeader
                    px="3.1rem"
                    h="8rem"
                    minH="8rem"
                    alignItems="center"
                    display="flex"
                    borderBottom="1px solid var(--gray-100)"
                >
                    <Link href={`/${locale}`}>
                        <Img alt="fictional-company-logo" src="/images/logo1.svg" />
                    </Link>
                </DrawerHeader>
                <DrawerBody>
                    <VStack mt="3rem" as="ul" spacing="3rem" alignItems="flex-start">
                        <NavigationButton as="li" fontSize="2.4rem !important">
                            <Link
                                onClick={() => {
                                    router.push("/#order-section");
                                    props.onClose();
                                }}
                            >
                                {t("PLACE_ORDER")}
                            </Link>
                        </NavigationButton>
                        <NavigationButton as="li" fontSize="2.4rem !important">
                            <Link
                                onClick={() => {
                                    router.push("/#contact-section");
                                    props.onClose();
                                }}
                            >
                                {t("FOR_PARTNERS")}
                            </Link>
                        </NavigationButton>
                        <NavigationButton as="li" fontSize="2.4rem !important">
                            <Link
                                onClick={() => {
                                    router.push("/#download-section");
                                    props.onClose();
                                }}
                            >
                                {t("DOWNLOAD_APP")}
                            </Link>
                        </NavigationButton>
                        <NavigationButton as="li" fontSize="2.4rem !important">
                            <Link
                                onClick={() => {
                                    router.push("/#footer-section");
                                    props.onClose();
                                }}
                            >
                                {t("CONTACT_US")}
                            </Link>
                        </NavigationButton>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default SlideMenu;
