"use client";
import FoodCategoryCard from "@/components/molecules/FoodCategory/FoodCategoryCard";
import Pagination from "@/components/molecules/Pagination";
import SkeletonBox from "@/components/molecules/SkeletonBox";
import useSWRAPI from "@/hooks/useApi";
import { Flex, Wrap, WrapItem } from "@chakra-ui/react";

const Categories = () => {
    const { GetAllCategories } = useSWRAPI();
    const { data } = GetAllCategories();

    return (
        <Flex flexDirection={"column"} w="100%">
            <Wrap alignSelf={"center"} align="center" mt="4.8rem" justify={"center"} spacing="3.6rem" w="100%">
                {data?.data?.map((el) => {
                    return (
                        <WrapItem key={String(el.sys_category_id)}>
                            <FoodCategoryCard
                                name={el.name?.[0].text ?? ""}
                                categoryId={el.sys_category_id}
                                imageUrl={el.image_url}
                            />
                        </WrapItem>
                    );
                }) ??
                    Array.from([1, 2, 3], (index) => (
                        <WrapItem key={`skeleton${index}`} display="flex" flexDir="column" flex={1}>
                            <SkeletonBox isLoaded={false} />
                        </WrapItem>
                    ))}
            </Wrap>
            {data?.data && (
                <Pagination
                    currentPage={1}
                    onChangePage={(_index: number) => {
                        //
                    }}
                    totalPage={3}
                    alignSelf={"flex-end"}
                    my="1rem"
                />
            )}
        </Flex>
    );
};
export default Categories;
