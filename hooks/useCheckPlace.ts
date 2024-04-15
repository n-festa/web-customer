import { dialogRef } from "@/components/modal/dialog/DialogWrapper";
import { RootState } from "@/store";
import { useTranslations } from "next-intl";
import { RefObject, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const useCheckPlace = (inputRef?: RefObject<HTMLInputElement>) => {
    const { latAddress, longAddress } = useSelector((state: RootState) => state.userInfo?.userInfo ?? {});
    const t = useTranslations("COMMON.CART");
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!latAddress || !longAddress) {
            dialogRef.current?.show({
                title: t("ADDRESS_MISSING"),
                message: t("ADDRESS_REQUEST"),
                negative: {
                    text: t("OK"),
                    onClick: async () => {
                        if (ref.current) {
                            setTimeout(() => {
                                inputRef?.current?.focus();
                                ref.current?.focus();
                            }, 100);
                        }
                    },
                },
            });
            return;
        }
    }, [latAddress, longAddress, ref, t]);
    return { ref };
};

export default useCheckPlace;
