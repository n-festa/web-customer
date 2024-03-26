import { Box, Flex, Img, Input, Text, Textarea } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import UIRating from "./UIRating";
interface ReviewDetailItemProps {
    title: string;
    iconTitle: string;
}
const ReviewDetailItem = ({ title, iconTitle }: ReviewDetailItemProps) => {
    const t = useTranslations("REVIEW");
    const [listImage, setListImage] = useState<string[]>([]);
    const [listImageUpload, setListImageUpload] = useState<File[]>([]);
    const handleUpload = (event: any) => {
        setListImage([...listImage, URL.createObjectURL(event.target.files[0])]);
        setListImageUpload([...listImageUpload, event.target.files[0]]);
    };
    return (
        <Flex pb="4.8rem" w="100%" gap="2rem" flexDirection={{ base: "column", md: "row" }}>
            <Box flex="1">
                <Flex gap="1.6rem" alignItems="center">
                    <Img w="3.6rem" height="auto" src={iconTitle} />
                    <Text fontSize="2rem" fontWeight="bold">
                        {title}
                    </Text>
                </Flex>
                <Flex gap="0.4rem" m="1rem 0">
                    <UIRating maxRating={5} size="sm" />
                    <Text ml="0.4rem" fontSize="1.4rem" fontWeight="400">
                        {t("VERY_SATISFIED")}
                    </Text>
                </Flex>
                <Flex gap="1.6rem">
                    {listImage.map((image, index) => (
                        <Img key={index} src={image} w="4.8rem" h="4.8rem" borderRadius="0.8rem" />
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
                    >
                        <Img src="/images/icons/icon_camera_plus.svg" w="2.4rem" h="auto" />
                        <Input
                            accept="image/png, image/jpeg"
                            display="none"
                            type="file"
                            onChange={handleUpload}
                        ></Input>
                    </Flex>
                </Flex>
            </Box>
            <Box flex="1">
                <Textarea w="100%" placeholder={t("PLACEHOLDER_COMMENT")} minH="12.8rem"></Textarea>
            </Box>
        </Flex>
    );
};

export default ReviewDetailItem;
