import textStyles from "@/theme/textStyle";
import { Center, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const Empty = ({ message }: { message?: string }) => {
    const t = useTranslations("COMMON");
    return (
        <Center minH="30rem">
            <Text {...textStyles.medium3}>{message ?? t("EMPTY")}</Text>
        </Center>
    );
};

export default Empty;
