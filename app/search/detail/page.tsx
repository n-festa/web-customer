"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import SeachBox from "@/components/molecules/SearchBox";
import FilterBox from "@/components/pages/search/FilterBox";
import SearchResult from "@/components/pages/search/SearchResult";
import { useFoodDiscovery } from "@/hooks/useFoodDecovery";
import { Flex } from "@chakra-ui/react";

const SearchDetailPage = () => {
    const {
        keySearch,
        searchResult,
        filterCondition,

        onSearch,
        onChangeValue,
        onChangeFilterOptions,
    } = useFoodDiscovery();
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
                        onChangeValue<string>("keySearch", e.target.value ?? "");
                    }}
                    onKeyDown={onKeyDown}
                />
                <FilterBox condition={filterCondition} onChangeFilterOptions={onChangeFilterOptions} />
                <SearchResult type={filterCondition.type} result={searchResult} />
            </Flex>
        </Flex>
    );
};

export default SearchDetailPage;
