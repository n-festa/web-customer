import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import useSWRAPI from "@/hooks/useApi";
import useDeleteCartItem from "@/hooks/useDeleteCartItem";
import { cartSynced } from "@/recoil/recoilState";
import { useAppSelector } from "@/store/hooks";
import { DateStep } from "@/types/interfaces";
import { HHmm, YYYYMMDD } from "@/utils/constants";
import { Button, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { addMinutes, formatDate, isToday, isTomorrow } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import GroupWrapper from "./GroupWrapper";

const DeliveryTimeGroup = () => {
    const router = useRouter();
    const [date, setDate] = useState<string>();
    const [timeIndex, setTime] = useState(0);
    const { GetAvailableTime } = useSWRAPI();
    const { handleDeleteWholeCart } = useDeleteCartItem();
    const cart = useRecoilValue(cartSynced);
    const profile = useAppSelector((app) => app.userInfo.userInfo);
    const { data, isLoading: isLoadingTime } = GetAvailableTime({
        lat: profile?.latAddress,
        long: profile?.longAddress,
        utc_offset: -(new Date().getTimezoneOffset() / 60),
        menu_item_ids: cart.cart_info?.map((item) => item.item_id),
        now: new Date("2024-02-17").getTime(),
    });
    useEffect(() => {
        if (data?.statusCode === 404) {
            dialogRef.current?.show({
                message: `Giỏ hàng không khả dụng đến hết ${formatDate(data.data as unknown as number, YYYYMMDD)}`,
                title: "Giỏ hàng không khả dụng",
                negative: {
                    text: "Trở lại",
                    onClick: async () => {
                        router.back();
                    },
                    buttonProps: {
                        fontSize: "1.4rem ",
                    },
                },
                positive: {
                    text: "Xoá giỏ hàng",
                    onClick: async () => {
                        await handleDeleteWholeCart(cart.customer_id);
                        router.back();
                    },
                    buttonProps: {
                        variant: "error",
                    },
                },
            });
        }
    }, [cart.customer_id, data, handleDeleteWholeCart, router]);
    const { dateOptions, timeOptionsByDate, dateOptionsList } = useMemo(() => {
        const dateOptions: { [key: string]: { value: string; name: string } } = {};
        const timeOptionsByDate: {
            [key: string]: DateStep[];
        } = {};
        if (typeof data?.data != "number") {
            data?.data?.forEach((item) => {
                if (item.date && !dateOptions[item.date]) {
                    let name = item.date;
                    name = isTomorrow(item.date) ? "Ngày mai" : isToday(item.date) ? "Hôm nay" : name;

                    dateOptions[item.date] = {
                        name: name,
                        value: item.date,
                    };
                }

                if (item.date) {
                    if (!timeOptionsByDate[item.date]) {
                        timeOptionsByDate[item.date] = [item];
                    } else {
                        timeOptionsByDate[item.date].push(item);
                    }
                }
            });
        }
        const dateOptionsList = Object.values(dateOptions);

        return { dateOptions, timeOptionsByDate, dateOptionsList };
    }, [data?.data]);
    const timeList = useMemo(() => {
        const currentDate = date ? dateOptions[date]?.value : dateOptionsList[0]?.value;
        const timeByDateList = timeOptionsByDate[currentDate] ?? [];
        return timeByDateList.map((item) => {
            const currentTime = formatDate(`${item.date} ${item.hours}:${item.minutes}`, HHmm);
            const nextQuaterTime = addMinutes(`${item.date} ${item.hours}:${item.minutes}`, 15);
            const nextQuater = formatDate(nextQuaterTime, HHmm);
            return `${currentTime} - ${nextQuater}`;
        });
    }, [date, dateOptions, dateOptionsList, timeOptionsByDate]);

    return (
        <GroupWrapper title="Thời gian giao hàng">
            <HStack pt="1.6rem" spacing="1.6rem">
                <Menu>
                    <MenuButton
                        fontSize="1.6rem"
                        fontWeight={500}
                        as={Button}
                        h="4.4rem"
                        _active={{
                            bg: "white",
                            border: "var(--divider)",
                            color: "var(--gray-700)",
                            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                        }}
                        isLoading={isLoadingTime}
                        border="1px solid transparent"
                        borderRadius="0.8rem"
                        rightIcon={<ChevronDownIcon width={15} />}
                    >
                        {date ? dateOptions[date].name : dateOptionsList?.[0]?.name ?? "-"}
                    </MenuButton>
                    <MenuList>
                        {dateOptionsList.map((item, i) => (
                            <MenuItem key={`date-${i}`} onClick={() => setDate(item.value)}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton
                        fontSize="1.6rem"
                        fontWeight={500}
                        _active={{
                            bg: "white",
                            border: "var(--divider)",
                            color: "var(--gray-700)",
                            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                        }}
                        isLoading={isLoadingTime}
                        border="1px solid transparent"
                        as={Button}
                        h="4.4rem"
                        borderRadius="0.8rem"
                        rightIcon={<ChevronDownIcon width={15} />}
                    >
                        {timeList[timeIndex]}
                    </MenuButton>
                    <MenuList maxHeight="30rem" overflow="auto">
                        {timeList.map((item, i) => (
                            <MenuItem key={`time-${i}`} onClick={() => setTime(i)}>
                                {item}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </HStack>
        </GroupWrapper>
    );
};

export default DeliveryTimeGroup;
