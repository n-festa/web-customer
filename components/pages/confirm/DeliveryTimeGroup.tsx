import { Button, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import GroupWrapper from "./GroupWrapper";

const dateOptions = ["Hôm nay", "Ngày mai", "15/10/2023"];
const timeOptions = ["11:45 - 12:00", "12:00 - 12:15", "12:15 - 12:30", "12:30 - 12:45", "12:45 - 13:00"];

const DeliveryTimeGroup = () => {
    const [dateIndex, setDate] = useState(0);
    const [timeIndex, setTime] = useState(0);

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
                        border="1px solid transparent"
                        borderRadius="0.8rem"
                        rightIcon={<ChevronDownIcon width={15} />}
                    >
                        {dateOptions[dateIndex]}
                    </MenuButton>
                    <MenuList>
                        {dateOptions.map((item, i) => (
                            <MenuItem key={`date-${i}`} onClick={() => setDate(i)}>
                                {item}
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
                        border="1px solid transparent"
                        as={Button}
                        h="4.4rem"
                        borderRadius="0.8rem"
                        rightIcon={<ChevronDownIcon width={15} />}
                    >
                        {timeOptions[timeIndex]}
                    </MenuButton>
                    <MenuList>
                        {timeOptions.map((item, i) => (
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
