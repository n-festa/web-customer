"use client";
import FoodCategoryCard from "@/components/molecules/FoodCategory/FoodCategoryCard";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import SlideSwiper from "@/components/molecules/SlideSwiper";
import useSWRAPI from "@/hooks/useApi";
import { Flex, Wrap, WrapItem, useMediaQuery } from "@chakra-ui/react";
import { useMemo, useRef } from "react";

const Categories = () => {
    const { GetAllCategories } = useSWRAPI();
    const { data, isLoading } = GetAllCategories();
    const [isMedium] = useMediaQuery("(max-width: 700px)");
    const [isLarger] = useMediaQuery("(max-width: 1250px)");
    const ref = useRef<HTMLDivElement>(null);

    const perPage = useMemo(() => {
        return isMedium ? 2 : isLarger ? 3 : 4;
    }, [, isMedium, isLarger]);

    return (
        <Flex flexDirection={"column"} w="100%" ref={ref} className="categories" mt="1.6rem">
            {isLoading ? (
                <Wrap alignSelf={"center"} align="center" mt="4.8rem" justify={"center"} spacing="3.6rem" w="100%">
                    {Array.from([1, 2, 3], (index) => (
                        <WrapItem key={`skeleton${index}`} display="flex" flexDir="column" flex={1}>
                            <SkeletonBox isLoaded={false} />
                        </WrapItem>
                    ))}
                </Wrap>
            ) : (
                <SlideSwiper
                    items={
                        data?.data?.map((el, index) => (
                            <FoodCategoryCard
                                key={String(index)}
                                name={el.name?.[0].text ?? ""}
                                categoryId={el.sys_category_id}
                                imageUrl={el.image_url}
                            />
                        )) ?? []
                    }
                    perPage={perPage}
                    spaceBetween="0"
                />
            )}
        </Flex>
    );
};
export default Categories;
