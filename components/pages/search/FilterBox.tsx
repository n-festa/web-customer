"use client";
import CheckBoxButton from "@/components/atoms/checkbox/CheckboxButton";
import GroupRadioButton from "@/components/atoms/radio/GroupRadioButton";
import { FilterOptionKey } from "@/hooks/useSearchResult";
import { FilterType, SortOrder } from "@/types/enum";
import { FilterCondition } from "@/types/interfaces";
import { isNullOrEmpty } from "@/utils/functions";
import { HStack, Select, Wrap, WrapItem } from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
    condition: FilterCondition;
    onChangeFilterOptions: <T>(key: FilterOptionKey, value?: T) => void;
}

const FilterBox = ({ condition, onChangeFilterOptions }: Props) => {
    const { other, orderOptions } = condition;
    const otherSelectedOptions = other[condition.type];
    const otherOptions = orderOptions[condition.type];

    const onFilterOthers = (value: string) => () => {
        let newOptions = [...otherSelectedOptions];
        const index = otherSelectedOptions.findIndex((e) => e === value);
        if (index != -1) {
            newOptions.splice(index, 1);
        } else newOptions = [...newOptions, value];
        onChangeFilterOptions("other", {
            ...other,
            [condition.type]: [...newOptions],
        });
    };

    const isShowFilterBox = useMemo(() => {
        return !(condition.viewAllFood || condition.viewAllRestaurant || !isNullOrEmpty(condition.categoryId));
    }, [condition]);

    return isShowFilterBox ? (
        <Wrap py="1rem" w="100%">
            <WrapItem>
                <GroupRadioButton
                    options={[
                        {
                            value: FilterType.Food,
                            name: "Món ăn",
                        },
                        {
                            value: FilterType.Restaurant,
                            name: "Nhà hàng",
                        },
                    ]}
                    value={condition.type}
                    onChange={(value) => {
                        onChangeFilterOptions<FilterType>("type", value as FilterType);
                    }}
                    isDisabled={condition.viewAllFood || condition.viewAllRestaurant}
                />
            </WrapItem>
            <WrapItem>
                <Select
                    placeholder="Săp xếp"
                    w="11.6rem"
                    variant={"filter"}
                    onChange={(e) => {
                        const value = e.target.value ? (e.target.value as SortOrder) : undefined;
                        onChangeFilterOptions<SortOrder | undefined>("sort", value);
                    }}
                >
                    <option value={SortOrder.ASC}>Giá tăng</option>
                    <option value={SortOrder.DESC}>Giá giảm</option>
                </Select>
            </WrapItem>
            <WrapItem>
                <HStack alignItems={"center"} h="100%">
                    {otherOptions.map((el) => (
                        <CheckBoxButton
                            isChecked={otherSelectedOptions.includes(el.key)}
                            onChange={onFilterOthers(el.key)}
                            key={el.key}
                        >
                            {el.name}
                        </CheckBoxButton>
                    ))}
                </HStack>
            </WrapItem>
        </Wrap>
    ) : (
        <></>
    );
};

export default FilterBox;
