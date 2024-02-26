"use client";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import SlideSwiper from "@/components/molecules/SlideSwiper";
import WraperInfo from "@/components/molecules/WraperInfo";
import { ReviewCard } from "@/components/pages/landing-page/testimonial";
import { Review } from "@/types/response/FoodResponse";
import { Flex, StackProps, useMediaQuery } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface Props {
    reviews: Review[];
    title?: string;
    reviewItemProps?: StackProps;
    defaultPerpage?: number;
    isLoading?: boolean;
}

const Feedback = ({ reviews, title, reviewItemProps, defaultPerpage = 3, isLoading, ...rest }: Props & StackProps) => {
    const t = useTranslations("RESTAURANT");
    const [isSmaller] = useMediaQuery("(max-width: 700px)");

    const perPage = useMemo(() => {
        return isSmaller ? 1 : defaultPerpage;
    }, [isSmaller, defaultPerpage]);
    return reviews.length < 1 ? (
        <></>
    ) : (
        <Flex flexDirection={"column"} w="100%" {...rest}>
            <WraperInfo
                title={title ?? t("COMMENT_FOOD")}
                titleProps={{ fontSize: "2.4rem" }}
                isViewAll={false}
                contentProps={{ mt: "1.6rem" }}
                mt="5.6rem"
            >
                {isLoading ? (
                    <SkeletonBox isLoaded={false} />
                ) : (
                    <SlideSwiper
                        items={reviews.map((el, index) => (
                            <ReviewCard
                                key={String(index)}
                                star={el.score}
                                isShowAuthor={el.isShowAuthor}
                                comment={el.remarks}
                                {...reviewItemProps}
                            />
                        ))}
                        perPage={perPage}
                    />
                )}
            </WraperInfo>
        </Flex>
    );
};

export default Feedback;
