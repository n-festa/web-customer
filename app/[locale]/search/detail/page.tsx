"use client";
import { BackButton } from "@/components/atoms/bottom/BackButton";
import SeachBox from "@/components/molecules/SearchBox";
import FilterBox from "@/components/pages/search/FilterBox";
import SearchResult from "@/components/pages/search/SearchResult";
import { useSearchResult } from "@/hooks/useSearchResult";
import { Flex } from "@chakra-ui/react";

const SearchDetailPage = () => {
    const { isLoading, keySearch, searchResult, filterCondition, onChangeFilterOptions } = useSearchResult();

    return (
        <Flex flexDirection={"column"} alignItems={"center"} bg="white" w="100%" h="100%">
            <Flex flexDirection={"column"} alignItems={"flex-start"} py="2rem" px="6.7rem" w="100%">
                <BackButton label="Quay lại trang trước" />
                <SeachBox
                    placeholder="Gõ tên món ăn mà bạn đang muốn tìm"
                    flex="1"
                    groupsProps={{ my: "1rem" }}
                    value={keySearch}
                    key={keySearch}
                    isDisabled={true}
                    variant={"searchBoxViewOnly"}
                />
                <FilterBox condition={filterCondition} onChangeFilterOptions={onChangeFilterOptions} />
                <SearchResult
                    type={filterCondition.type}
                    result={searchResult}
                    isLoading={isLoading}
                    filterCondition={filterCondition}
                />
            </Flex>
        </Flex>
    );
};

export default SearchDetailPage;
