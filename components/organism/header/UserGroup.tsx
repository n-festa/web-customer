import { isLoggedIn } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Avatar, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const UserGroup = () => {
    const showSignIn = !isLoggedIn();

    return showSignIn ? (
        <Link href={routes.SignIn}>
            <Button borderRadius="0.8rem" variant="solid" width="13.1rem" height="4.4rem">
                Đăng nhập
            </Button>
        </Link>
    ) : (
        <Avatar />
    );
};

export default React.memo(UserGroup);
