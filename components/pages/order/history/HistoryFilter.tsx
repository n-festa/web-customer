/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import GroupRadioButton from "@/components/atoms/radio/GroupRadioButton";
import { HistoryFilterCondition } from "@/hooks/useOrderHistory";
import { FilterOrderStatuType, FilterType, SortOrderHistory } from "@/types/enum";
import { ddMMyyyy } from "@/utils/constants";
import { formatDate } from "@/utils/date";
import {
    HStack,
    Img,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    Text,
    Wrap,
    WrapItem,
    useDisclosure,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props {
    condition: HistoryFilterCondition;
    onChangeType: (type: FilterType) => void;
    onChangeFilterCondition: (params: { type: FilterType; name: string; value: any }) => void;
}

const HistoryFilter = ({ condition, onChangeType, onChangeFilterCondition }: Props) => {
    const t = useTranslations("ORDER_HISTORY.FILTER");
    const tOrder = useTranslations("ORDER_DETAIL.ORDER_CONFIRMATION.MD");
    const [range, setRange] = useState<DateRange | undefined>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const options = useMemo(() => {
        return condition[condition.type];
    }, [condition]);

    useEffect(() => {
        const timeRange = options.timeRange;
        if (timeRange?.from?.getTime() != range?.from?.getTime() || timeRange?.to?.getTime() != range?.to?.getTime()) {
            setRange(options.timeRange);
        }
    }, [options.timeRange]);

    useEffect(() => {
        if (range?.from && range.to && !isOpen) {
            onChangeFilterCondition({
                type: condition.type,
                name: "timeRange",
                value: range,
            });
        }
    }, [range, isOpen]);

    return (
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
                    onChange={(value) => onChangeType(value as FilterType)}
                />
            </WrapItem>
            <WrapItem>
                <Select
                    placeholder=""
                    w="16rem"
                    variant={"filter"}
                    defaultValue={options.sortType}
                    onChange={(e) => {
                        onChangeFilterCondition({
                            type: condition.type,
                            name: "sortType",
                            value: e.target.value,
                        });
                    }}
                >
                    <option value={SortOrderHistory.DATE_ASC}>{t("DATE_ASC")}</option>
                    <option value={SortOrderHistory.DATE_DESC}>{t("DATE_DESC")}</option>
                    <option value={SortOrderHistory.TOTAL_ASC}>{t("TOTAL_ASC")}</option>
                    <option value={SortOrderHistory.TOTAL_DESC}>{t("TOTAL_DESC")}</option>
                </Select>
            </WrapItem>
            <WrapItem>
                <Select
                    placeholder=""
                    w="25rem"
                    variant={"filter"}
                    value={options.orderStatus}
                    onChange={(e) => {
                        onChangeFilterCondition({
                            type: condition.type,
                            name: "orderStatus",
                            value: e.target.value,
                        });
                    }}
                >
                    <option value={FilterOrderStatuType.ALL}>{t("ALL_STATUS")}</option>
                    <option value={FilterOrderStatuType.COMPLETED}>{tOrder(FilterOrderStatuType.COMPLETED)}</option>
                    <option value={FilterOrderStatuType.FAILED}>{tOrder(FilterOrderStatuType.FAILED)}</option>
                    <option value={FilterOrderStatuType.CANCELLED}> {tOrder(FilterOrderStatuType.CANCELLED)}</option>
                </Select>
            </WrapItem>
            <WrapItem>
                <Popover variant={"responsive"} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                    <PopoverTrigger>
                        <HStack
                            p="1rem 1.6rem"
                            bg="white"
                            borderRadius={"0.8rem"}
                            border="1px solid var(--gray-300)"
                            boxSizing="border-box"
                            h="4rem"
                            minW="25rem"
                        >
                            <Img src="/images/calendar.svg" />
                            <Text
                                fontSize={"1.4rem"}
                                lineHeight={"2rem"}
                                fontWeight={"600"}
                                textAlign={"center"}
                                flex={1}
                            >
                                {formatDate(options.timeRange?.from, ddMMyyyy)} -{" "}
                                {formatDate(options.timeRange?.to, ddMMyyyy)}
                            </Text>
                        </HStack>
                    </PopoverTrigger>
                    <PopoverContent minWidth={"max-content"}>
                        <DayPicker mode="range" selected={range} onSelect={setRange} defaultMonth={new Date()} />
                    </PopoverContent>
                </Popover>
            </WrapItem>

            <WrapItem>
                <Select placeholder="" w="14rem" variant={"filter"} defaultValue={"1"}>
                    <option value={"1"}>{t("ALL_LABELS")}</option>
                    <option value={"2"}>{t("FAVORITES")}</option>
                </Select>
            </WrapItem>
        </Wrap>
    );
};

export default HistoryFilter;
