import { Coupon } from "@/types/interfaces";
import { formatMoney } from "@/utils/functions";
import {
    Box,
    Button,
    Divider,
    Input,
    InputGroup,
    InputRightElement,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Text,
    VStack,
    useDisclosure,
    useOutsideClick,
    useToast,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import GroupWrapper from "./GroupWrapper";

const PromotionGroup = ({
    items,
    onApplyCoupon,
}: {
    items: Coupon[];
    onApplyCoupon: (value: string) => Promise<boolean>;
}) => {
    const t = useTranslations("CONFIRM_ORDER.PROMOTION_GROUP");
    const [value, setValue] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ref = useRef(null);
    const toast = useToast();
    useOutsideClick({
        ref: ref,
        handler: () => {
            onClose();
        },
    });
    return (
        <GroupWrapper position="relative" title={t("TITLE")}>
            <Box ref={ref}>
                <Popover preventOverflow isOpen={isOpen}>
                    <PopoverTrigger>
                        <InputGroup
                            mt="1.6rem"
                            alignItems="center"
                            display="flex"
                            borderRadius="99px"
                            border="1px solid var(--gray-300)"
                            h="5.6rem"
                            as="form"
                            w="33.9rem"
                        >
                            <Input
                                onFocus={onOpen}
                                placeholder={t("ENTER_PROMO_CODE")}
                                ml="1.6rem"
                                fontSize="1.8rem"
                                textOverflow="ellipsis"
                                mr="10rem"
                                variant="search"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />

                            <InputRightElement mr="1.6rem" h="100%" w="fit-content" display="flex" gap="0.5rem">
                                <Button
                                    fontSize="1.6rem"
                                    h="3.6rem"
                                    w="9.5rem"
                                    borderRadius="9rem"
                                    variant="solid"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onClose();
                                        if (value.length) {
                                            const res = await onApplyCoupon(value).catch((err) => {
                                                const minium_order_value: number =
                                                    err?.error?.response?.data?.detail?.minium_order_value;
                                                toast({
                                                    title: "Mã giảm giá",
                                                    description: `${t("APPLY_FAIL")}${minium_order_value ? `${t("MINIMUM_DESC", { value: formatMoney(minium_order_value) })}` : ""}`,
                                                    status: "error",
                                                    duration: 4000,
                                                    position: "top-right",
                                                    isClosable: true,
                                                });
                                            });
                                            if (res) {
                                                setValue("");
                                            }
                                        }
                                    }}
                                >
                                    {t("APPLY")}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </PopoverTrigger>
                    <PopoverContent>
                        <VStack spacing="0" divider={<Divider bg="none" />}>
                            {items.map((coupon) => (
                                <VStack
                                    onClick={() => {
                                        coupon?.coupon_code && setValue(coupon?.coupon_code);
                                        onClose();
                                    }}
                                    py="1rem"
                                    px="1rem"
                                    cursor="pointer"
                                    _hover={{
                                        bg: "var(--chakra-colors-gray-200)",
                                    }}
                                    key={coupon.coupon_code}
                                >
                                    <Text fontSize="1.5rem" fontWeight="medium">
                                        {coupon.name}
                                    </Text>
                                    {coupon.description && (
                                        <Text color="var(--text-gray)" fontSize="1.2rem">
                                            {coupon.description}
                                        </Text>
                                    )}
                                </VStack>
                            ))}
                        </VStack>
                    </PopoverContent>
                </Popover>
            </Box>
        </GroupWrapper>
    );
};

export default PromotionGroup;
