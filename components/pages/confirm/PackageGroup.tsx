import { Box, Flex, HStack, Image, Switch, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import GroupWrapper from "./GroupWrapper";

const PackageGroup = () => {
    const t = useTranslations("CONFIRM_ORDER.PACKAGE_GROUP");
    return (
        <GroupWrapper title={t("TITLE")}>
            <VStack w="100%" spacing="0.8rem" color="black">
                <Flex alignItems="center" mt="0.8rem" w="100%" color="black">
                    <VStack fontSize="1.6rem" flex={1} alignItems="flex-start">
                        <Text fontWeight={600}>{t("SUGARCANE_BOX")}</Text>
                        <Text>3,000 đ</Text>
                    </VStack>
                    <HStack flex={1}>
                        <Box w="10rem" h="10rem">
                            <Image borderRadius="0.8rem" src="/images/image-2.svg" alt="food-container-1" />
                        </Box>
                        <Box w="10rem" h="10rem">
                            <Image borderRadius="0.8rem" src="/images/image-3.svg" alt="food-container-2" />
                        </Box>
                    </HStack>
                </Flex>
                <Flex minW="fit-content" alignItems="center" mt="0.8rem" w="100%" color="black">
                    <VStack fontSize="1.6rem" flex={1} alignItems="flex-start">
                        <Text fontWeight={600}>{t("EATING_UTENSILS")}</Text>
                        <Text>{t("REQUEST_ONLY_WHEN_NEEDED")}</Text>
                    </VStack>
                    <Flex flex={1}>
                        <Switch id="isCheckedr" variant={"green"} size="lg"></Switch>
                    </Flex>
                </Flex>
            </VStack>
        </GroupWrapper>
    );
};

export default PackageGroup;
