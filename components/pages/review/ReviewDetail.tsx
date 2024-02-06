import { Box, Button, VStack } from "@chakra-ui/react";
import ReviewDetailItem from "./ReviewDetailItem";
const ReviewDetail = () => {
    return (
        <Box pb="4.8rem">
            <VStack spacing="1.6rem">
                <ReviewDetailItem title="Đánh giá tài xế" iconTitle="/images/icons/icon_shipper.svg" />
                <ReviewDetailItem title="Đánh giá Mỳ Cá Cờ Sốt Yakitori" iconTitle="/images/icons/icon_disk.svg" />
                <ReviewDetailItem title="Đánh giá Summer Avocado Salad" iconTitle="/images/icons/icon_disk.svg" />
            </VStack>
            <Button variant="btnSubmit">GỬI ĐÁNH GIÁ</Button>
        </Box>
    );
};

export default ReviewDetail;
