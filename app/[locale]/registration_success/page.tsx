"use client";
import UISignWrap from "@/components/molecules/UISignWrap";
import { RootState } from "@/store";
import { redirectAfterLogin } from "@/utils/functions";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const RegistrationSuccess = () => {
    const t = useTranslations();
    const router = useRouter();
    const profile = useSelector((state: RootState) => state.userInfo.userInfo);
    const health_info = {
        bmi: profile?.health_info?.bmi,
        recommended_dietary_allowance_kcal: profile?.health_info?.recommended_dietary_allowance_kcal,
    };
    const handleRedirect = () => {
        redirectAfterLogin(router);
    };
    return (
        <UISignWrap maxW="40.6rem">
            <Box>
                <Text fontSize="2.4rem" fontWeight="700" mb="3.2rem" color="var(--gray-950)" textAlign="center">
                    {t.rich("REGISTRATION_SUCCESS.TITLE", {
                        br: () => <br />,
                    })}
                </Text>
                <Flex justifyContent="space-between" flexWrap="wrap" mb="3.2rem">
                    <Box>
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
                            {health_info.bmi}
                        </Center>
                        <Text fontSize="1.8rem" textAlign="center" fontWeight="500" color="var(--gray-modern-950)">
                            Cân đối
                            {t("REGISTRATION_SUCCESS.BALANCE")}
                        </Text>
                    </Box>
                    <Box>
                        <Text
                            fontSize="2.4rem"
                            textAlign="center"
                            fontWeight="600"
                            color="var(--gray-modern-950)"
                            mb="1.6rem"
                        >
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
                            {health_info.recommended_dietary_allowance_kcal}
                        </Center>
                        <Text fontSize="1.8rem" fontWeight="500" textAlign="center" color="var(--gray-modern-950)">
                            {t("REGISTRATION_SUCCESS.KCAL_PER_DAY")}
                        </Text>
                    </Box>
                </Flex>
                <Button variant="btnSubmit" onClick={handleRedirect}>
                    {t("REGISTRATION_SUCCESS.DISCOVER_FOOD_TODAY")}
                </Button>
            </Box>
        </UISignWrap>
    );
};

export default RegistrationSuccess;
