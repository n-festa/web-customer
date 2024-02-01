"use client";
import SlideSwiper from "@/components/molecules/SlideSwiper";
import WraperInfo from "@/components/molecules/WraperInfo";
import { ReviewCard } from "@/components/pages/landing-page/testimonial";
import { Review } from "@/types/response/FoodResponse";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
    reviews: Review[];
}

const Feedback = ({ reviews }: Props) => {
    const [isSmaller] = useMediaQuery("(max-width: 700px)");

    const perPage = useMemo(() => {
        return isSmaller ? 1 : 3;
    }, [isSmaller]);
    return (
        <Flex flexDirection={"column"} w="100%">
            <WraperInfo
                title="Nhận xét món ăn"
                titleProps={{ fontSize: "2.4rem" }}
                isViewAll={false}
                contentProps={{ mt: "1.6rem" }}
                mt="5.6rem"
            >
                <SlideSwiper
                    items={reviews.map((el, index) => (
                        <ReviewCard key={String(index)} star={el.score} isShowAuthor={false} comment={el.remarks} />
                    ))}
                    perPage={perPage}
                />
            </WraperInfo>
        </Flex>
    );
};

export default Feedback;
