"use client";
import FoodCategoryCard from "@/components/molecules/FoodCategory/FoodCategoryCard";
import Pagination from "@/components/molecules/Pagination";
import { Flex, Wrap, WrapItem } from "@chakra-ui/react";

const Categories = () => {
    const category = ["Ăn nhẹ < 300 kcal", "Món thuần chay", "Không thịt đỏ", "Bữa ăn cân bằng"];
    return (
        <Flex flexDirection={"column"} w="100%">
            <Wrap
                alignSelf={"center"}
                align="center"
                mt="4.8rem"
                justify={{ base: "center", md: "space-between" }}
                spacing="4rem"
                w="100%"
            >
                {category.map((el) => (
                    <WrapItem key={el}>
                        <FoodCategoryCard name={el} />
                    </WrapItem>
                ))}
            </Wrap>
            <Pagination
                currentPage={1}
                onChangePage={(_index: number) => {
                    //
                }}
                totalPage={3}
                showAll={true}
                alignSelf={"flex-end"}
                my="1rem"
            />
        </Flex>
    );
};
export default Categories;
