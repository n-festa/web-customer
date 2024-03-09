import { Flex, Switch, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import GroupWrapper from "./GroupWrapper";

const PackageGroup = () => {
    const t = useTranslations("CONFIRM_ORDER.PACKAGE_GROUP");
    return (
        <GroupWrapper title={t("TITLE")}>
            <Flex minW="fit-content" alignItems="center" mt="0.8rem" w="100%" color="black" gap="4rem">
                <VStack fontSize="1.6rem" alignItems="flex-start">
                    <Text fontWeight={600}>{t("EATING_UTENSILS")}</Text>
                    <Text>{t("REQUEST_ONLY_WHEN_NEEDED")}</Text>
                </VStack>
                <Switch id="isCheckedr" variant={"green"} size="lg"></Switch>
            </Flex>
        </GroupWrapper>
    );
};

export default PackageGroup;
