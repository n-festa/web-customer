import { DriverType, OrderType } from "@/hooks/usePostReview";
import useRenderText from "@/hooks/useRenderText";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import ReviewDetailItem from "./ReviewDetailItem";

interface ReviewDetailProps {
    onChangeOrders: (index: number, key: "score" | "remarks" | "img_blobs", value: string | number | Blob[]) => void;
    orders: { [key: string]: OrderType };
    driver?: DriverType;
    onChangeDriver?: (key: "score" | "remarks" | "img_blobs", value: string | number | Blob[]) => void;
    onSubmit: (type: "quick" | "detail") => void;
}

const ReviewDetail = ({ onChangeOrders, orders, driver, onChangeDriver, onSubmit }: ReviewDetailProps) => {
    const { renderTxt } = useRenderText();
    const t = useTranslations("REVIEW");
    return (
        <Box pb="4.8rem">
            <VStack spacing="1.6rem">
                <ReviewDetailItem
                    placeholder={t("PLACEHOLDER_COMMENT")}
                    title={t("DRIVER_RATING")}
                    iconTitle="/images/icons/icon_shipper.svg"
                    driver={driver}
                    onChangeOrders={onChangeOrders}
                    onChangeDriver={onChangeDriver}
                />
                {Object.values(orders)?.length &&
                    Object.values(orders).map((order) => (
                        <ReviewDetailItem
                            key={order.order_sku_id}
                            placeholder={t("PLACEHOLDER_FOOD")}
                            title={renderTxt(order?.raw?.name)}
                            iconTitle="/images/icons/icon_disk.svg"
                            order={order}
                            onChangeOrders={onChangeOrders}
                        />
                    ))}
            </VStack>
            <Button variant="btnSubmit" onClick={() => onSubmit("detail")}>
                {t("SUBMIT_REVIEW")}
            </Button>
        </Box>
    );
};

export default ReviewDetail;
