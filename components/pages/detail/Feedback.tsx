"use client";
import SlideSwiper from "@/components/molecules/SlideSwiper";
import WraperInfo from "@/components/molecules/WraperInfo";
import { ReviewCard } from "@/components/pages/landing-page/testimonial";
import { Review } from "@/types/response/FoodResponse";
import { Flex, StackProps, useMediaQuery } from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
    reviews: Review[];
    title?: string;
    reviewItemProps?: StackProps;
    defaultPerpage?: number;
}

const Feedback = ({ reviews, title, reviewItemProps, defaultPerpage = 3, ...rest }: Props & StackProps) => {
    const [isSmaller] = useMediaQuery("(max-width: 700px)");

    const perPage = useMemo(() => {
        return isSmaller ? 1 : defaultPerpage;
    }, [isSmaller, defaultPerpage]);
    return (
        <Flex flexDirection={"column"} w="100%" {...rest}>
            <WraperInfo
                title={title ?? "Nhận xét món ăn"}
                titleProps={{ fontSize: "2.4rem" }}
                isViewAll={false}
                contentProps={{ mt: "1.6rem" }}
                mt="5.6rem"
            >
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
            </WraperInfo>
        </Flex>
    );
};

export default Feedback;
