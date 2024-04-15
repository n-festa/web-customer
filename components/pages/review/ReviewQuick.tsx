import CheckBoxCard from "@/components/atoms/checkbox/CheckboxCard";
import config from "@/config";
import useFileSizeCheck from "@/hooks/useFileSizeCheck";
import { Box, Button, Flex, HStack, Img, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import UIRating from "./UIRating";
const {
    review: { formData },
} = config;

const ReviewQuick = ({
    remarkQuick,
    setRemarkQuick,
    missingReviews,
    onChangeOrderQuick,
    onSubmit,
}: {
    missingReviews?: {
        driver: boolean;
        dishes: string[];
    };
    remarkQuick: string[];
    setRemarkQuick: any;
    onChangeOrderQuick: (
        type: "driver" | "orders",
        key: "score" | "remarks" | "img_blobs",
        value: string | number | Blob[],
    ) => void;
    onSubmit: (type: "quick" | "detail") => void;
}) => {
    const t = useTranslations("REVIEW");
    const { checkHasFileSize } = useFileSizeCheck();
    const [listImage, setListImage] = useState<string[]>([]);
    const [listImageUpload, setListImageUpload] = useState<File[]>([]);
    const handleUpload = (event: any) => {
        const hasErrorUpload = checkHasFileSize({
            file: event.target.files[0],
            title: t("UPLOAD.TITLE"),
            description: t("UPLOAD.ERROR_LENGTH"),
            maxSize: 500,
        });
        if (hasErrorUpload) return;
        if (listImage.length >= 3) return;
        setListImage([...listImage, URL.createObjectURL(event.target.files[0])]);
        setListImageUpload([...listImageUpload, event.target.files[0]]);
        onChangeOrderQuick("orders", "img_blobs", [...listImageUpload, event.target.files[0]]);
    };
    const handleRemoveImage = (index: number) => {
        setListImage([...listImage.slice(0, index), ...listImage.slice(index + 1)]);
        setListImageUpload([...listImageUpload.slice(0, index), ...listImageUpload.slice(index + 1)]);
        onChangeOrderQuick("orders", "img_blobs", [
            ...listImageUpload.slice(0, index),
            ...listImageUpload.slice(index + 1),
        ]);
    };
    const handleCheckRemark = (value: string) => () => {
        let newOptions = [...remarkQuick];
        const index = remarkQuick.findIndex((e) => e === value);
        if (index != -1) {
            newOptions.splice(index, 1);
        } else newOptions = [...newOptions, value];
        setRemarkQuick([...newOptions]);
    };
    return (
        <Box pb="4.8rem">
            <Flex
                w="100%"
                borderBottom="1px solid var(--gray-300)"
                p="2rem 0 1rem"
                alignItems="center"
                justifyContent="space-between"
                mb="1rem"
            >
                <Flex gap="1.6rem" alignItems="center">
                    <Img w="4rem" height="3.8rem" src="/images/icons/icon_shipper.svg" />
                    <Text fontSize="1.8rem" fontWeight="bold">
                        {t("DRIVER_RATING")}
                    </Text>
                </Flex>
                <VStack>
                    <UIRating
                        size="lg"
                        maxRating={5}
                        onRatingChange={(value) => onChangeOrderQuick("driver", "score", value)}
                    />
                    {missingReviews?.driver && (
                        <Text mt="1rem" fontSize="1.3rem" color="red" textAlign="right" w="100%">
                            {t("UPLOAD.ERROR_REVIEW_MISSING")}
                        </Text>
                    )}
                </VStack>
            </Flex>
            <Flex p="2rem 0 1rem" alignItems="center" justifyContent="space-between" mb="1rem">
                <Flex gap="1.6rem" alignItems="center">
                    <Img w="4rem" height="3.8rem" src="/images/icons/icon_disk.svg" />
                    <Text fontSize="1.8rem" fontWeight="bold">
                        {t("DISH_RATING")}
                    </Text>
                </Flex>
                <VStack>
                    <UIRating
                        size="lg"
                        maxRating={5}
                        onRatingChange={(value) => onChangeOrderQuick("orders", "score", value)}
                    />
                    {missingReviews?.dishes.length && (
                        <Text mt="1rem" fontSize="1.3rem" color="red" textAlign="right" w="100%">
                            {t("UPLOAD.ERROR_REVIEW_MISSING")}
                        </Text>
                    )}
                </VStack>
            </Flex>
            <Text mb="1rem" fontSize="1.6rem" fontWeight="400">
                {t("SATISFIED_WITH_DISH")}
            </Text>
            <HStack alignItems={"center"} h="100%">
                {formData.satisfied.map((el, index) => (
                    <CheckBoxCard onChange={handleCheckRemark(el.value)} key={index}>
                        {el.name}
                    </CheckBoxCard>
                ))}
            </HStack>
            <Box m="1.8rem 0 1rem">
                <Textarea
                    placeholder={t("SHARE_FEEDBACK_PLACEHOLDER")}
                    minH="12.8rem"
                    onChange={(e) => onChangeOrderQuick("orders", "remarks", e.target.value)}
                />
            </Box>
            {listImage.length > 0 && (
                <HStack spacing={6} p="2rem 0" borderTop="1px solid var(--gray-300)" minH="10rem">
                    {listImage.map((item, index) => (
                        <Box key={index} position="relative">
                            <Img
                                src="/images/icons/icon_close.svg"
                                position="absolute"
                                top="-0.4rem"
                                right="-0.4rem"
                                padding="0.2rem"
                                bg="var(--gray-300)"
                                borderRadius="50%"
                                w="1.2rem"
                                h="1.2rem"
                                cursor="pointer"
                                onClick={() => handleRemoveImage(index)}
                            />
                            <Img src={item} objectFit="cover" w="10rem" h="10rem" borderRadius="0.8rem" />
                        </Box>
                    ))}
                </HStack>
            )}

            <Flex gap="1rem">
                <Button
                    as="label"
                    id="upload"
                    variant="btnSubmit"
                    bg="#fff"
                    color="var(--gray-700)"
                    borderColor="var(--gray-300)"
                    cursor="pointer"
                    pointerEvents={listImage.length >= 3 ? "none" : "auto"}
                    opacity={listImage.length >= 3 ? "0.5" : "1"}
                    _hover={{ opacity: 0.8, background: "#fff", color: "var(--gray-700)" }}
                >
                    {t("ADD_PHOTO")}
                    <Input
                        display="none"
                        accept="image/png, image/jpeg"
                        type="file"
                        name="upload"
                        onChange={(event) => {
                            handleUpload(event);
                            event.target.value = "";
                        }}
                    />
                </Button>
                <Button variant="btnSubmit" onClick={() => onSubmit("quick")}>
                    {t("SUBMIT_REVIEW")}
                </Button>
            </Flex>
        </Box>
    );
};

export default ReviewQuick;
