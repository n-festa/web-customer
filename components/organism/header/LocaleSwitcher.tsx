"use client";

import { localeOption } from "@/utils/constants";
import { Button, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

interface LocaleSwitcherProps {
    nextLocale: string;
    pathname: string;
    locales: Record<string, string>;
}

const LocaleSwitcher: React.FC = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const pathname = usePathname();
    const locale = useLocale();

    const updatePathnameWithLocale = ({ nextLocale, pathname, locales }: LocaleSwitcherProps): string => {
        const match = Object.entries(locales).find(([_, localeValue]) => pathname.includes(localeValue));
        if (match) {
            const [, localeValue] = match;
            return pathname.replace(localeValue, nextLocale);
        } else {
            return pathname.replace("/en/", "/vi/");
        }
    };

    const switchLanguage = (nextLocale: string) => {
        const locales = { en: "en", vi: "vi" };
        const updatedPathname = updatePathnameWithLocale({ nextLocale, pathname, locales });
        startTransition(() => {
            router.replace(updatedPathname);
        });
    };

    return (
        <Menu>
            {({ isOpen }) => (
                <>
                    <MenuButton as={Button} variant="ghost" isActive={isOpen}>
                        <HStack alignItems="center" display={{ base: "none", lg: "flex" }}>
                            <Text
                                color="var(--text-gray)"
                                display={{ base: "none", md: "block" }}
                                fontSize="1.6rem"
                                fontWeight="600"
                                w={{ base: "unset", md: "3.6rem" }}
                            >
                                {locale === localeOption[0].val ? "ENG" : "VIE"}
                            </Text>
                            <Image width={19} height={19} alt="" src={`/images/${locale}.svg `} />
                        </HStack>
                    </MenuButton>
                    <MenuList>
                        {localeOption.map((cur, index) => (
                            <MenuItem key={index} onClick={() => switchLanguage(cur.val)}>
                                {cur.content}
                            </MenuItem>
                        ))}
                    </MenuList>
                </>
            )}
        </Menu>
    );
};

export default LocaleSwitcher;
