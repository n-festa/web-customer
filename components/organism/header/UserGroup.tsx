import { RootState } from "@/store";
import { logout } from "@/utils/auth";
import { isLoggedIn } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Avatar, Button, Image, Menu, MenuButton, MenuItem, MenuList, useBreakpointValue } from "@chakra-ui/react";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const UserGroup = ({ bg }: { bg?: string }) => {
    const showSignIn = !isLoggedIn();
    const image = useSelector((state: RootState) => state.userInfo.userInfo?.profile_image);
    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    });
    return showSignIn ? (
        <Link href={routes.SignIn}>
            {isMobile ? (
                <LogInIcon />
            ) : (
                <Button display="" borderRadius="0.8rem" variant="solid" width="13.1rem" height="4.4rem">
                    Đăng nhập
                </Button>
            )}
        </Link>
    ) : (
        <Menu variant="user">
            <MenuButton cursor="pointer" borderRadius="unset" overflow="hidden" w="4.8rem" h="4.8rem" order="1">
                {image?.url ? <Image src={image.url} alt="avt" /> : <Avatar w="4.8rem" h="4.8rem" />}
            </MenuButton>
            <MenuList bg={bg}>
                <MenuItem bg={bg} as={Link} href={routes.AdditionalSignUpInfo}>
                    Hồ sơ
                </MenuItem>
                <MenuItem bg={bg} as={Link} href={"/history"}>
                    Đơn hàng
                </MenuItem>
                <MenuItem bg={bg} onClick={() => logout()}>
                    Thoát
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default React.memo(UserGroup);
