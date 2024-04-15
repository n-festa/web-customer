import useFileSizeCheck from "@/hooks/useFileSizeCheck";
import { DriverType, OrderType } from "@/hooks/usePostReview";
import { evaluateLevel } from "@/utils/constants";
import { Box, Flex, Img, Input, Text, Textarea, Tooltip } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import UIRating from "./UIRating";
interface ReviewDetailItemProps {
    placeholder: string;
    title: string;
    iconTitle: string;
    order?: OrderType;
    driver?: DriverType;
    isMissing?: boolean;
    onChangeOrders?: (index: number, key: "score" | "remarks" | "img_blobs", value: string | number | Blob[]) => void;
    onChangeDriver?: (key: "score" | "remarks" | "img_blobs", value: string | number | Blob[]) => void;
}
const ReviewDetailItem = ({
    placeholder,
    title,
    iconTitle,
    order,
    isMissing,
    onChangeOrders,
    onChangeDriver,
    driver,
}: ReviewDetailItemProps) => {
    const t = useTranslations("REVIEW");
    const { checkHasFileSize } = useFileSizeCheck();
    const ratingMode: { [key: number]: string } = evaluateLevel(t);
    const [listImage, setListImage] = useState<string[]>([]);
    const [listImageUpload, setListImageUpload] = useState<File[]>([]);
    const [rating, setRating] = useState<number>(0);
    const labelTooltip = order
        ? `${order?.raw?.advanced_taste_customization} ${order?.raw?.basic_taste_customization} ${order?.raw?.portion_customization}`
        : "";
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
        order &&
            order.order_sku_id &&
            onChangeOrders?.(order.order_sku_id, "img_blobs", [...listImageUpload, event.target.files[0]]);
        driver && onChangeDriver?.("img_blobs", [...listImageUpload, event.target.files[0]]);
    };
    const handleRemoveImage = (index: number) => {
        setListImage([...listImage.slice(0, index), ...listImage.slice(index + 1)]);
        setListImageUpload([...listImageUpload.slice(0, index), ...listImageUpload.slice(index + 1)]);
        order &&
            order.order_sku_id &&
            onChangeOrders?.(order.order_sku_id, "img_blobs", [
                ...listImageUpload.slice(0, index),
                ...listImageUpload.slice(index + 1),
            ]);
        driver &&
            onChangeDriver?.("img_blobs", [...listImageUpload.slice(0, index), ...listImageUpload.slice(index + 1)]);
    };

    return (
        <Flex pb="4.8rem" w="100%" gap="2rem" flexDirection={{ base: "column", md: "row" }}>
            <Box flex="1">
                <Flex gap="1.6rem" alignItems="center">
                    <Img w="3.6rem" height="auto" src={iconTitle} />
                    <Tooltip label={labelTooltip || ""} fontSize="md" placement="top">
                        <Text fontSize="2rem" fontWeight="bold">
                            {title}
                        </Text>
                    </Tooltip>
                </Flex>
                <Flex gap="0.4rem" m="1rem 0">
                    <UIRating
                        maxRating={5}
                        size="sm"
                        onRatingChange={(value) => {
                            order && order.order_sku_id && onChangeOrders?.(order.order_sku_id, "score", value);
                            driver && onChangeDriver?.("score", value);
                            setRating(value);
                        }}
                    />
                    <Text ml="0.4rem" fontSize="1.4rem" fontWeight="400">
                        {ratingMode[rating]}
                    </Text>
                </Flex>
                <Flex gap="1.6rem">
                    {listImage.map((image, index) => (
                        <Box key={index} position="relative">
                            <Img src={image} w="4.8rem" h="4.8rem" borderRadius="0.8rem" />
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
                        </Box>
                    ))}
                    <Flex
                        as="label"
                        cursor="pointer"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        w="4.8rem"
                        h="4.8rem"
                        borderRadius="0.8rem"
                        border="1.5px dashed var(--gray-300)"
                        pointerEvents={listImage.length >= 3 ? "none" : "auto"}
                        opacity={listImage.length >= 3 ? "0.5" : "1"}
                    >
                        <Img src="/images/icons/icon_camera_plus.svg" w="2.4rem" h="auto" />
                        <Input
                            accept="image/png, image/jpeg"
                            display="none"
                            type="file"
                            onChange={(e) => {
                                handleUpload(e);
                                e.target.value = "";
                            }}
                        ></Input>
                    </Flex>
                </Flex>
                {isMissing && (
                    <Text mt="1rem" fontSize="1.3rem" color="red" textAlign="left" w="100%">
                        {t("UPLOAD.ERROR_REVIEW_MISSING")}
                    </Text>
                )}
            </Box>
            <Box flex="1">
                <Textarea
                    w="100%"
                    placeholder={placeholder}
                    minH="12.8rem"
                    onChange={(e) => {
                        order && order.order_sku_id && onChangeOrders?.(order.order_sku_id, "remarks", e.target.value);
                        driver && onChangeDriver?.("remarks", e.target.value);
                    }}
                ></Textarea>
            </Box>
        </Flex>
    );
};

export default ReviewDetailItem;
