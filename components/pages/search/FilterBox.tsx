"use client";
import CheckBoxButton from "@/components/atoms/checkbox/CheckboxButton";
import GroupRadioButton from "@/components/atoms/radio/GroupRadioButton";
import { FilterOptionKey } from "@/hooks/useFoodDecovery";
import { FilterType, SortOrder } from "@/types/enum";
import { FilterCondition } from "@/types/interfaces";
import { HStack, Select } from "@chakra-ui/react";

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
    return (
        <HStack py="1rem" w="100%">
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
                defaultValue={condition.type}
                onChange={(value) => {
                    onChangeFilterOptions<FilterType>("type", value as FilterType);
                }}
            />
            <Select
                placeholder="Săp xếp"
                w="fit-content"
                variant={"filter"}
                onChange={(e) => {
                    const value = e.target.value ? (e.target.value as SortOrder) : undefined;
                    onChangeFilterOptions<SortOrder | undefined>("sort", value);
                }}
            >
                <option value={SortOrder.ASC}>Giá tăng</option>
                <option value={SortOrder.DESC}>Giá giảm</option>
            </Select>
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
    );
};

export default FilterBox;
