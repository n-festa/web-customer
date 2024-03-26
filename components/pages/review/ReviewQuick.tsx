import GroupRadioButton from "@/components/atoms/radio/GroupRadioButton";
import config from "@/config";
import { Box, Button, Flex, HStack, Img, Input, Text, Textarea } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import UIRating from "./UIRating";
const {
    review: { formData },
} = config;
const ReviewQuick = () => {
    const t = useTranslations("REVIEW");
    const [listImage, setListImage] = useState<string[]>([]);
    const [listImageUpload, setListImageUpload] = useState<File[]>([]);
    const handleUpload = (event: any) => {
        setListImage([...listImage, URL.createObjectURL(event.target.files[0])]);
        setListImageUpload([...listImageUpload, event.target.files[0]]);
    };
    return (
        <Box pb="4.8rem">
            <Flex
                p="2rem 0 1rem"
                borderBottom="1px solid var(--gray-300)"
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
                <UIRating size="lg" maxRating={5} />
            </Flex>
            <Flex p="2rem 0 1rem" alignItems="center" justifyContent="space-between" mb="1rem">
                <Flex gap="1.6rem" alignItems="center">
                    <Img w="4rem" height="3.8rem" src="/images/icons/icon_disk.svg" />
                    <Text fontSize="1.8rem" fontWeight="bold">
                        {t("DISH_RATING")}
                    </Text>
                </Flex>
                <Flex gap="0.7rem">
                    <UIRating size="lg" maxRating={5} />
                </Flex>
            </Flex>
            <Text mb="1rem" fontSize="1.6rem" fontWeight="400">
                {t("SATISFIED_WITH_DISH")}
            </Text>
            <GroupRadioButton
                isRounded
                options={formData.satisfied}
                defaultValue={"Đồ ăn chất lượng"}
            ></GroupRadioButton>
            <Box m="1.8rem 0 1rem">
                <Textarea placeholder={t("SHARE_FEEDBACK_PLACEHOLDER")} minH="12.8rem" />
            </Box>
            <HStack spacing={6} p="2rem 0" borderTop="1px solid var(--gray-300)" minH="10rem">
                {listImage.map((item, index) => (
                    <Img key={index} src={item} objectFit="cover" w="10rem" h="10rem" borderRadius="0.8rem" />
                ))}
            </HStack>
            <Flex gap="1rem">
                <Button
                    as="label"
                    id="upload"
                    variant="btnSubmit"
                    bg="#fff"
                    color="var(--gray-700)"
                    borderColor="var(--gray-300)"
                    cursor="pointer"
                    _hover={{ opacity: 0.8, background: "#fff", color: "var(--gray-700)" }}
                >
                    {t("ADD_PHOTO")}
                    <Input
                        display="none"
                        accept="image/png, image/jpeg"
                        type="file"
                        name="upload"
                        onChange={(event) => handleUpload(event)}
                    />
                </Button>
                <Button variant="btnSubmit">{t("SUBMIT_REVIEW")}</Button>
            </Flex>
        </Box>
    );
};

export default ReviewQuick;
