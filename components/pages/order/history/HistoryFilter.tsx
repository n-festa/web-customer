"use client";
import GroupRadioButton from "@/components/atoms/radio/GroupRadioButton";
import { FilterType } from "@/types/enum";
import { ddMMyyyy } from "@/utils/constants";
import { formatDate, subDays } from "@/utils/date";
import { HStack, Img, Popover, PopoverContent, PopoverTrigger, Select, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const HistoryFilter = () => {
    const [selectedDate, setSelectedDate] = useState<{
        from: Date | undefined;
        to: Date | undefined;
    }>({
        from: subDays(new Date(), 30),
        to: new Date(),
    });

    const handleRangeSelect = (range: DateRange | undefined) => {
        setSelectedDate({ from: range?.from, to: range?.to });
    };

    return (
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
                />
            </WrapItem>
            <WrapItem>
                <Select placeholder="" w="16rem" variant={"filter"} defaultValue={"1"}>
                    <option value={"1"}>Ngày gần nhất</option>
                </Select>
            </WrapItem>
            <WrapItem>
                <Select placeholder="" w="18.5rem" variant={"filter"} defaultValue={"1"}>
                    <option value={"1"}>Tất cả trạng thái</option>
                    <option value={"1"}>Giao hàng thành công</option>
                    <option value={"1"}>Đã hủy</option>
                </Select>
            </WrapItem>
            <WrapItem>
                <Popover variant={"responsive"}>
                    <PopoverTrigger>
                        <HStack
                            p="1rem 1.6rem"
                            bg="white"
                            borderRadius={"0.8rem"}
                            border="1px solid var(--gray-300)"
                            boxSizing="border-box"
                            h="4rem"
                        >
                            <Img src="/images/calendar.svg" />
                            <Text fontSize={"1.4rem"} lineHeight={"2rem"} fontWeight={"600"}>
                                {formatDate(selectedDate.from, ddMMyyyy)} - {formatDate(selectedDate.to, ddMMyyyy)}
                            </Text>
                        </HStack>
                    </PopoverTrigger>
                    <PopoverContent minWidth={"max-content"}>
                        <DayPicker mode="range" selected={selectedDate} onSelect={handleRangeSelect} />
                    </PopoverContent>
                </Popover>
            </WrapItem>

            <WrapItem>
                <Select placeholder="" w="14rem" variant={"filter"} defaultValue={"1"}>
                    <option value={"1"}>Tất cả nhãn</option>
                    <option value={"2"}>Yêu thích</option>
                </Select>
            </WrapItem>
        </Wrap>
    );
};

export default HistoryFilter;
