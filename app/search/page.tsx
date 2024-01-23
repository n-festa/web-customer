"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import SeachBox from "@/components/molecules/SearchBox";
import Categories from "@/components/pages/search/Categories";
import SpecialFood from "@/components/pages/search/SpecialFood";
import SpecialRestaurants from "@/components/pages/search/SpecialRestaurants";
import { useSearchPage } from "@/hooks/useSearchPage";
import { Flex } from "@chakra-ui/react";

const Search = () => {
    const { keySearch, onSearch, onChangeSearchValue } = useSearchPage();
    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === "Enter") onSearch();
    };
    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="white" w="100%" h="100%">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="6.7rem" w="100%">
                <BackButton label="Quay lại trang trước" />
                <SeachBox
                    placeholder="Gõ tên món ăn, nhà hàng mà bạn đang muốn tìm"
                    flex="1"
                    groupsProps={{ my: "1rem" }}
                    value={keySearch}
                    onChange={(e) => {
                        onChangeSearchValue(e.target.value ?? "");
                    }}
                    onKeyDown={onKeyDown}
                />
                <Categories />
                <SpecialFood />
                <SpecialRestaurants />
            </Flex>
        </Flex>
    );
};

export default Search;
