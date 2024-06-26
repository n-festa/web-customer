"use client";
import CheckBoxButton from "@/components/atoms/checkbox/CheckboxButton";
import GroupRadioButton from "@/components/atoms/radio/GroupRadioButton";
import { FilterOptionKey } from "@/hooks/useSearchResult";
import { FilterType, SortOrderFood } from "@/types/enum";
import { FilterCondition } from "@/types/interfaces";
import { isNullOrEmpty } from "@/utils/functions";
import { HStack, Select, Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface Props {
    condition: FilterCondition;
    onChangeFilterOptions: <T>(key: FilterOptionKey, value?: T) => void;
}

const FilterBox = ({ condition, onChangeFilterOptions }: Props) => {
    const t = useTranslations("COMMON");
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
        return !(!isNullOrEmpty(condition.categoryId) || !isNullOrEmpty(condition.detailType));
    }, [condition]);

    return isShowFilterBox ? (
        <Wrap py="1rem" w="100%">
            <WrapItem>
                <GroupRadioButton
                    options={[
                        {
                            value: FilterType.Food,
                            name: t("FOOD"),
                        },
                        {
                            value: FilterType.Restaurant,
                            name: t("RESTAURANT"),
                        },
                    ]}
                    value={condition.type}
                    onChange={(value) => {
                        onChangeFilterOptions<FilterType>("type", value as FilterType);
                    }}
                    isDisabled={!isNullOrEmpty(condition.detailType)}
                />
            </WrapItem>
            <WrapItem>
                <Select
                    placeholder={t("SORT")}
                    w="14rem"
                    variant={"filter"}
                    onChange={(e) => {
                        const value = e.target.value ? (e.target.value as SortOrderFood) : undefined;
                        onChangeFilterOptions<SortOrderFood | undefined>("sort", value);
                    }}
                >
                    <option value={SortOrderFood.RELEVANCE}>{t("RELEVANCE")}</option>
                    <option value={SortOrderFood.PRICE_ASC}>{t("PRICE_ASCENDING")}</option>
                    <option value={SortOrderFood.PRICE_DESC}>{t("PRICE_DESCENDING")}</option>
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
