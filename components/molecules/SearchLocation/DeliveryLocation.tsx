import SearchLocation from "@/components/molecules/SearchLocation";
import { RootState } from "@/store";
import { Img, InputLeftElement, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const DeliveryLocation = () => {
    const address = useSelector((state: RootState) => state.auth.profile?.address ?? "");
    return (
        <SearchLocation
            variant={"searchBox"}
            bg="white"
            borderRadius="1rem"
            minW={"44rem"}
            h="4.4rem"
            rightElement={<></>}
            leftElement={
                <InputLeftElement pointerEvents="none" w="12rem" h="100%" p="1rem 1rem">
                    <Text fontSize={"1.6rem"} fontWeight={"400"} lineHeight={"2.4rem"} color="var(--gray-500)">
                        Giao đến
                    </Text>
                    <Img src="/images/icons/marker-pin-01.svg" ml="0.5rem" />
                </InputLeftElement>
            }
            inputProps={{
                variant: "",
                ml: "10rem",
                mr: "0",
                p: 0,
                flex: 1,
                color: "var(--gray-600)",
                fontSize: "1.6rem",
            }}
            locationSuggestionProps={{
                bg: "white",
                hoverBg: "#F9FAFB",
            }}
            initValue={address}
        />
    );
};

export default DeliveryLocation;
