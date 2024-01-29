"use client";
import { showCartState } from "@/recoil/recoilState";
import { Flex, FlexProps, Modal, ModalContent, ModalOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import Cart from "../organism/Cart";
import BottomSheet from "./BottomSheet";

const CartModal = ({ ...props }: FlexProps) => {
    const [showCartModal, setShow] = useRecoilState(showCartState);
    const isMobile = useBreakpointValue({ base: true, md: false });
    return isMobile ? (
        <BottomSheet open={showCartModal} onClose={() => setShow(false)}>
            <Flex dir="column" w="100%" h="85dvh" {...props}>
                <Cart w="100%" h="100%" />
            </Flex>
        </BottomSheet>
    ) : (
        <Modal isOpen={showCartModal} onClose={() => setShow(false)}>
            <ModalOverlay opacity="0.6" />
            <ModalContent
                maxW="42.6rem"
                boxShadow="0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)"
                display="flex"
                flexDir="column"
                borderRadius="0"
                overflow="auto"
                maxH="90dvh"
            >
                <Cart />
            </ModalContent>
        </Modal>
    );
};

export default CartModal;
