"use client";
import UISignWrap from "@/components/molecules/UISignWrap";
import BodyInformation from "@/components/pages/registration_success/BodyInformation";
import { RootState } from "@/store";
import { redirectAfterLogin } from "@/utils/functions";
import { Box, Button, Text } from "@chakra-ui/react";
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
                <BodyInformation info={health_info} justifyContent="space-between" mb="3.2rem" />
                <Button variant="btnSubmit" onClick={handleRedirect}>
                    {t("REGISTRATION_SUCCESS.DISCOVER_FOOD_TODAY")}
                </Button>
            </Box>
        </UISignWrap>
    );
};

export default RegistrationSuccess;
