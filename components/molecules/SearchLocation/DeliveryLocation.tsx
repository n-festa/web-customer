import SearchLocation from "@/components/molecules/SearchLocation";
import useCheckPlace from "@/hooks/useCheckPlace";
import { RootState } from "@/store";
import textStyles from "@/theme/textStyle";
import { Img, InputLeftElement, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";

const DeliveryLocation = () => {
    const t = useTranslations("COMMON");
    const address = useSelector((state: RootState) => state.userInfo?.userInfo?.address ?? "");
    const { ref } = useCheckPlace();
    return (
        <SearchLocation
            inputRefProps={ref}
            variant={"searchBox"}
            bg="white"
            borderRadius="1rem"
            minW={{
                base: "70%",
                xl: "30rem",
                "2xl": "44rem",
            }}
            h="4.4rem"
            rightElement={<></>}
            leftElement={
                <InputLeftElement pointerEvents="none" w="12rem" h="100%" p="1rem 1rem">
                    <Text fontWeight={"400"} color="var(--gray-500)" whiteSpace={"nowrap"} {...textStyles.small}>
                        {t("DELIVER_TO")}
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
                fontWeight: "bold",
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
