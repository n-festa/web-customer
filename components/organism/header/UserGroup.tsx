import { RootState } from "@/store";
import { logout } from "@/utils/auth";
import { isLoggedIn } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const UserGroup = () => {
    const showSignIn = !isLoggedIn();
    const image = useSelector((state: RootState) => state.userInfo.userInfo?.profile_image);

    return showSignIn ? (
        <Link href={routes.SignIn}>
            <Button borderRadius="0.8rem" variant="solid" width="13.1rem" height="4.4rem">
                Đăng nhập
            </Button>
        </Link>
    ) : (
        <Menu variant="user">
            <MenuButton
                as={Avatar}
                cursor="pointer"
                borderRadius="50%"
                overflow="hidden"
                src={image?.url}
                w="4.8rem"
                h="4.8rem"
                order="1"
            />
            <MenuList>
                <MenuItem as={Link} href={routes.AdditionalSignUpInfo}>
                    Thay đổi thông tin
                </MenuItem>
                <MenuItem as={Link} href={"/history"}>
                    Lịch sử đơn hàng
                </MenuItem>
                <MenuItem onClick={() => logout()}>Đăng xuất</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default React.memo(UserGroup);
