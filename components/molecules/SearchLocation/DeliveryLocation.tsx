import SearchLocation from "@/components/molecules/SearchLocation";
import { RootState } from "@/store";
import textStyles from "@/theme/textStyle";
import { Customer } from "@/types";
import { storageKeys } from "@/utils/constants";
import { loadState } from "@/utils/localstorage";
import { Img, InputLeftElement, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const DeliveryLocation = () => {
    const defaultAddress: Customer = loadState(storageKeys.userProfile);
    const address = useSelector((state: RootState) => state.auth.profile?.address ?? defaultAddress?.address ?? "");
    return (
        <SearchLocation
            variant={"searchBox"}
            bg="white"
            borderRadius="1rem"
            minW={{
                lg: "44rem",
                base: "70%",
            }}
            h="4.4rem"
            rightElement={<></>}
            leftElement={
                <InputLeftElement pointerEvents="none" w="12rem" h="100%" p="1rem 1rem">
                    <Text fontWeight={"400"} color="var(--gray-500)" whiteSpace={"nowrap"} {...textStyles.small}>
                        Giao đến
                    </Text>
                    <Img
                        src="/images/icons/marker-pin-01.svg"
                        ml="0.5rem"
                        w={{ base: "1.5rem", lg: "2rem" }}
                        h={{ base: "1.5rem", lg: "2rem" }}
                    />
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
                bg: "transparent",
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
