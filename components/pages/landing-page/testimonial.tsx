"use client";
import SlideSwiper from "@/components/molecules/SlideSwiper";
import { poppins } from "@/theme/fonts";
import { Flex, HStack, Img, StackProps, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { useMemo } from "react";

const GroupStars = ({ star = 5 }: { star?: number }) => {
    return (
        <HStack alignSelf="flex-start" spacing="0.4rem">
            {Array(star)
                .fill(0)
                .map((_, index) => (
                    <Img key={String(index)} w="2rem" h="2rem" alt="" src="/images/star-icon2.svg" />
                ))}
        </HStack>
    );
};

export const ReviewCard = ({
    name,
    star,
    comment,
    isShowAuthor,
    ...rest
}: {
    isShowAuthor?: boolean;
    comment: string;
    name?: string;
    loyalCustomers?: boolean;
    star?: number;
} & StackProps) => {
    return (
        <VStack
            spacing="1.6rem"
            borderRadius="2.4rem"
            bg="var(--full-white)"
            boxShadow="0 3px 10px 3px rgba(240, 255, 219, 0.7)"
            border="1px solid var(--color-palegoldenrod)"
            overflow="hidden"
            p="4rem 3.2rem"
            height={{ md: "fit-content", base: "100%" }}
            {...rest}
        >
            {isShowAuthor && (
                <Flex w="100%" display={{ base: "none", md: "flex" }} justifyContent="space-between">
                    <Flex gap="1.5rem">
                        <Img className="customer-avatar" alt="" src="/images/pic@2x.png" />
                        <VStack alignItems="flex-start" spacing="0">
                            <Text fontFamily={poppins.style.fontFamily} fontWeight="500" fontSize="1.5rem">
                                {name ?? "Alexander R."}
                            </Text>
                            <Text color="var(--primary-500, #00473c)" fontSize="1.2rem" fontWeight="500">
                                Khách hàng thân thiết
                            </Text>
                        </VStack>
                    </Flex>
                    <Img
                        display={{
                            base: "none",
                            lg: "unset",
                        }}
                        alt=""
                        src="/images/path-173.svg"
                    />
                </Flex>
            )}
            <Text fontSize="1.8rem" lineHeight="2.4rem" fontWeight={600} alignSelf={"flex-start"} textAlign={"left"}>
                {comment}
            </Text>
            <GroupStars star={star} />
        </VStack>
    );
};

const Testimonial = () => {
    const reviews = [
        {
            food_rating_id: 1,
            score: 5,
            remarks:
                "“1. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt nhất.”",
            isShowAuthor: true,
        },
        {
            food_rating_id: 2,
            score: 5,
            remarks:
                "“2. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt nhất.”",
        },
        {
            food_rating_id: 3,
            score: 5,
            remarks:
                "“3. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt nhất.”",
        },
        {
            food_rating_id: 4,
            score: 5,
            remarks:
                "“4. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt nhất.”",
        },
        {
            food_rating_id: 5,
            score: 5,
            remarks:
                "“5. Tôi đã sử dụng 2all để đặt món ăn và rất hài lòng với trải nghiệm của mình. Dịch vụ giao hàng nhanh chóng và đáng tin cậy, và thực phẩm luôn được giao hàng trong tình trạng tốt nhất.”",
        },
    ];
    const [isSmaller] = useMediaQuery("(max-width: 700px)");

    const perPage = useMemo(() => {
        return isSmaller ? 1 : 3;
    }, [isSmaller]);
    return (
        <Flex scrollMarginTop="8rem" px="4.3rem" flexDir="column" pb="17.2rem" alignItems="center">
            <Text mt="15.6rem" mb="5.6rem" fontWeight="bold" fontSize="4.8rem" className="heading">
                Mọi người yêu thích 2All
            </Text>
            <SlideSwiper
                items={reviews.map((el, index) => (
                    <ReviewCard
                        key={String(index)}
                        star={el.score}
                        isShowAuthor={el.isShowAuthor}
                        comment={el.remarks}
                    />
                ))}
                paginationGroupProps={{
                    zIndex: 10,
                    position: "relative",
                    mt: isSmaller ? "1.6rem" : "-4rem",
                }}
                perPage={perPage}
            />
        </Flex>
    );
};

export default Testimonial;
