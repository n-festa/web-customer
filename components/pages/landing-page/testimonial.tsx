"use client";
import SlideSwiper from "@/components/molecules/SlideSwiper";
import useSWRAPI from "@/hooks/useApi";
import { poppins } from "@/theme/fonts";
import { Flex, HStack, Img, StackProps, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const GroupStars = ({ star = 5, ...rest }: { star?: number } & StackProps) => {
    return (
        <HStack alignSelf="flex-start" spacing="0.4rem" {...rest}>
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
    reviewer_img,
    reviewer_title,
    ...rest
}: {
    isShowAuthor?: boolean;
    comment: string;
    name?: string;
    loyalCustomers?: boolean;
    star?: number;
    reviewer_img?: string;
    reviewer_title?: string;
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
                        <Img className="customer-avatar" alt="reviewer_img" src={reviewer_img} />
                        <VStack alignItems="flex-start" spacing="0">
                            <Text fontFamily={poppins.style.fontFamily} fontWeight="500" fontSize="1.5rem">
                                {name}
                            </Text>
                            <Text color="var(--primary-500, #00473c)" fontSize="1.2rem" fontWeight="500">
                                {reviewer_title}
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
    const t = useTranslations("HOME.TESTIMONIAL");
    const { GetTopReview } = useSWRAPI();
    const { data = { data: [] } } = GetTopReview();

    const [isSmaller] = useMediaQuery("(max-width: 700px)");

    const perPage = useMemo(() => {
        return isSmaller ? 1 : 3;
    }, [isSmaller]);
    return data?.data ? (
        <Flex px="4.3rem" flexDir="column" pb="17.2rem" alignItems="center">
            <Text mt="15.6rem" mb="5.6rem" fontWeight="bold" fontSize="4.8rem" className="heading">
                {t("TITLE")}
            </Text>
            <SlideSwiper
                items={data?.data?.map((el, index) => (
                    <ReviewCard
                        key={String(index)}
                        star={el.score}
                        isShowAuthor={index == 0}
                        comment={el.remarks ?? ""}
                        name={el.reviewer_name}
                        reviewer_title={el.reviewer_title}
                        reviewer_img={el.reviewer_img}
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
    ) : (
        <></>
    );
};

export default Testimonial;
