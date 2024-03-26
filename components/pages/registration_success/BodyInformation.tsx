"use client";
import { Center, Flex, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const BodyInformation = ({ info, ...props }: any) => {
    const t = useTranslations();
    return (
        <Flex flexWrap="wrap" {...props}>
            <Flex flexDirection="column" alignItems="center">
                <Text fontSize="2.4rem" fontWeight="600" color="var(--gray-modern-950)" mb="1.6rem">
                    {t("REGISTRATION_SUCCESS.BMI_INDEX")}
                </Text>
                <Center
                    textAlign="center"
                    w="11.6rem"
                    h="11.6rem"
                    border="2px solid var(--green-light-500)"
                    borderRadius="50%"
                    bg="var(--green-light-100)"
                    fontSize="3rem"
                    fontWeight="600"
                    color="var(--green-light-500)"
                    mb="0.8rem"
                >
                    {info.bmi}
                </Center>
                <Text fontSize="1.8rem" textAlign="center" fontWeight="500" color="var(--gray-modern-950)">
                    {t("REGISTRATION_SUCCESS.BALANCE")}
                </Text>
            </Flex>
            <Flex flexDirection="column" alignItems="center">
                <Text fontSize="2.4rem" textAlign="center" fontWeight="600" color="var(--gray-modern-950)" mb="1.6rem">
                    {t("REGISTRATION_SUCCESS.ENERGY")}
                </Text>
                <Center
                    textAlign="center"
                    w="11.6rem"
                    h="11.6rem"
                    border="2px solid var(--green-light-500)"
                    borderRadius="50%"
                    bg="var(--green-light-100)"
                    fontSize="3rem"
                    fontWeight="600"
                    color="var(--green-light-500)"
                    mb="0.8rem"
                >
                    {info.recommended_dietary_allowance_kcal}
                </Center>
                <Text fontSize="1.8rem" fontWeight="500" textAlign="center" color="var(--gray-modern-950)">
                    {t("REGISTRATION_SUCCESS.KCAL_PER_DAY")}
                </Text>
            </Flex>
        </Flex>
    );
};

export default BodyInformation;
