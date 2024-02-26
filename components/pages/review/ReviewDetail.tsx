import { Box, Button, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import ReviewDetailItem from "./ReviewDetailItem";
const ReviewDetail = () => {
    const t = useTranslations("REVIEW");
    return (
        <Box pb="4.8rem">
            <VStack spacing="1.6rem">
                <ReviewDetailItem title={t("DRIVER_RATING")} iconTitle="/images/icons/icon_shipper.svg" />
                <ReviewDetailItem title={t("RATE_YAKITORI_FISH_NOODLES")} iconTitle="/images/icons/icon_disk.svg" />
                <ReviewDetailItem title={t("RATE_SUMMER_AVOCADO_SALAD")} iconTitle="/images/icons/icon_disk.svg" />
            </VStack>
            <Button variant="btnSubmit">{t("SUBMIT_REVIEW")}</Button>
        </Box>
    );
};

export default ReviewDetail;
