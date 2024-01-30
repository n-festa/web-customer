"use client";
import { showCartState, totalQuantityState } from "@/recoil/recoilState";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const CartIcon = () => {
    const totalQuanity = useRecoilValue(totalQuantityState);
    const setShow = useSetRecoilState(showCartState);
    return (
        <Box
            onClick={() => {
                setShow(true);
            }}
            cursor="pointer"
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
            {totalQuanity > 0 && (
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
                    <Text color="white">{totalQuanity}</Text>
                </Flex>
            )}
            <Image
                id="cart-image"
                cursor="pointer"
                p="0.2rem"
                width="35"
                height="35"
                alt="small-icon"
                src="/images/shoppingbag03.svg"
            />
        </Box>
    );
};

export default CartIcon;
