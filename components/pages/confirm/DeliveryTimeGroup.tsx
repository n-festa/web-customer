import { Button, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import GroupWrapper from "./GroupWrapper";

const DeliveryTimeGroup = () => {
    return (
        <GroupWrapper title="Thời gian giao hàng">
            <HStack pt="1.6rem" spacing="1.6rem">
                <Menu>
                    <MenuButton
                        fontSize="1.6rem"
                        fontWeight={500}
                        as={Button}
                        h="4.4rem"
                        borderRadius="0.8rem"
                        rightIcon={<ChevronDownIcon width={15} />}
                    >
                        Hôm nay
                    </MenuButton>
                    <MenuList>
                        {
                            //
                        }
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton
                        fontSize="1.6rem"
                        fontWeight={500}
                        as={Button}
                        h="4.4rem"
                        borderRadius="0.8rem"
                        rightIcon={<ChevronDownIcon width={15} />}
                    >
                        11:30 - 11:45
                    </MenuButton>
                    <MenuList>
                        <MenuItem> 11:45 - 12:00</MenuItem>
                        <MenuItem> 12:00 - 12:15</MenuItem>
                        <MenuItem> 12:15 - 12:30</MenuItem>
                        <MenuItem> 12:30 - 12:45</MenuItem>
                        <MenuItem> 12:45 - 13:00</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </GroupWrapper>
    );
};

export default DeliveryTimeGroup;
