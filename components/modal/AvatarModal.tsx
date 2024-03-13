"use client";
import {
    Modal,
    ModalContent,
    ModalOverlay,
    ModalBody,
    ModalFooter,
    Button,
    Flex,
    VStack,
    Avatar,
    Image,
    Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
interface AvatarModalProps {
    avatar: string;
    isOpen: boolean;
    onClose: () => void;
    onPreview: (isPreview: boolean) => void;
    loading: boolean;
}

const AvatarModal = ({ avatar, isOpen, onClose, onPreview, loading }: AvatarModalProps) => {
    const t = useTranslations();
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay opacity="0.6" />
            <ModalContent borderRadius="1.2rem" maxW="40rem">
                <ModalBody paddingTop="2.4rem">
                    <VStack>
                        <Image src="/images/icons/icon_preview.png" alt="" />
                        <Text marginBottom="1.2rem" fontWeight="700" fontSize="1.8rem" color="var(--gray-900)">
                            {t("PROFILE.CHANGE_AVATAR")}
                        </Text>
                        <Image
                            border="var(--divider)"
                            w="15rem"
                            h="15rem"
                            borderRadius={"50%"}
                            objectFit="cover"
                            src={avatar}
                            fallback={<Avatar src={avatar} w={{ base: "10rem" }} h={{ base: "10rem" }} />}
                            alt="avt"
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter paddingBottom="2.4rem">
                    <Flex justifyContent="space-between" width="100%" gap="1.2rem">
                        <Button
                            variant="btnSubmit"
                            bg="#fff"
                            color="var(--gray-700)"
                            borderColor="var(--gray-300)"
                            cursor="pointer"
                            onClick={() => onPreview(false)}
                        >
                            {t("BUTTON.CANCEL")}
                        </Button>
                        <Button variant="btnSubmit" isDisabled={loading} onClick={() => onPreview(true)}>
                            {t("BUTTON.UPDATE")}
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AvatarModal;
