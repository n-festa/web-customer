"use client";
import { loginSuccessUrl } from "@/app/[locale]/providers";
import { showCartState } from "@/recoil/recoilState";
import { isLoggedIn } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";

const CartIconFallBack = ({ totalQuantity, isLoading }: { totalQuantity?: number; isLoading?: boolean }) => {
    const prevTotalQuantity = useRef<number>();
    const router = useRouter();
    const setShow = useSetRecoilState(showCartState);
    useEffect(() => {
        if (!isLoading) {
            prevTotalQuantity.current = totalQuantity;
        }
    }, [totalQuantity, isLoading]);
    return (
        <Box
            onClick={() => {
                if (isLoggedIn()) {
                    setShow(true);
                    return;
                }
                loginSuccessUrl.current = window.location.pathname;
                router.push(routes.SignIn);
            }}
            cursor="pointer"
            minW="fit-content"
            mr="1rem"
            position="relative"
            _hover={{
                "#cart-image": {
                    p: "0rem",
                    width: "35",
                    height: "35",
                },
                "#cart-number": {
                    p: "0rem",
                    width: "1.8rem",
                    height: "1.8rem",
                    right: "-0.15rem",
                    top: "-0.15rem",
                    fontSize: "1.3rem",
                },
            }}
        >
            {Number(totalQuantity ?? prevTotalQuantity.current) > 0 && (
                <Flex
                    id="cart-number"
                    justifyContent="center"
                    alignItems="center"
                    bg="red"
                    top="0"
                    right="0"
                    borderRadius="50%"
                    position="absolute"
                    w="1.5rem"
                    h="1.5rem"
                >
                    <Text color="white">{totalQuantity ?? prevTotalQuantity.current}</Text>
                </Flex>
            )}
            <Image
                id="cart-image"
                cursor="pointer"
                p="0.2rem"
                resize="none"
                width="3.5rem"
                height="3.5rem"
                objectFit="contain"
                alt="small-icon"
                src="/images/shoppingbag03.svg"
            />
        </Box>
    );
};

export default CartIconFallBack;
