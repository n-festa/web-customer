import apiServices from "@/services/sevices";
import { FoodDetailDto } from "@/types/response/FoodResponse";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { parseArrayToObject } from "@/utils/functions";
import { useToast } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const useFoodDetail = () => {
    const { product } = useParams();
    const t = useTranslations("COMMON");
    const [isLoading, setLoading] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);
    const [foodInfo, setFoodInfo] = useState<{
        info?: FoodDetailDto;
        listSKUs: SKUsDto[];
    }>({
        listSKUs: [],
    });

    const toast = useToast();
    const [activeSKU, setActiveSKU] = useState<SKUsDto>();
    const [portions, setPortions] = useState<{
        [key: string]: {
            option_id: string;
            value_id: string | number;
        };
    }>();

    const getFoodDetail = (id: number) => {
        return apiServices.getFoodDetailById(id).then(({ data }) => {
            setFoodInfo((prevState) => ({
                ...prevState,
                info: data,
            }));
        });
    };

    const getListOfSKUs = (id: number) => {
        return apiServices.getListOfSKUsById(id).then(({ data }) => {
            setFoodInfo((prevState) => ({
                ...prevState,
                listSKUs: data,
            }));
        });
    };

    useEffect(() => {
        if (product) {
            setLoading(true);
            const id = Number(product);
            Promise.all([getFoodDetail(id), getListOfSKUs(id)]).finally(() => {
                setLoading(false);
            });
            return;
        }
        setLoading(false);
    }, [product]);

    const handleChangePortions = useCallback(
        (key: string, value: string | number) => {
            const newSKU = foodInfo.listSKUs?.find((item) => {
                const result = item.portion_customization.every((_portion) => {
                    return value === _portion.value_id;
                });
                return result;
            });

            if (newSKU) {
                setActiveSKU(newSKU);
                setPortions((prev) => ({ ...prev, [key]: { option_id: key, value_id: value } }));
            } else {
                toast({
                    title: t("TOAST.PORTION_UNAVAILABLE"),
                    description: t("TOAST.PORTION_UNAVAILABLE_DESC"),
                    status: "error",
                    duration: 4000,
                    position: "top",
                    isClosable: true,
                });
            }
        },
        [foodInfo.listSKUs, t, toast],
    );

    useEffect(() => {
        if (!activeSKU) {
            const item = foodInfo.listSKUs?.find((el) => el.is_standard);

            if (item) {
                setActiveSKU(item);
                const portions = parseArrayToObject(item.portion_customization, "option_id");
                setPortions(portions);
                return;
            }
        }
    }, [activeSKU, foodInfo.listSKUs]);

    return {
        isLoading: isLoading,
        foodInfo: foodInfo,
        formRef: formRef,
        activeSKU,
        handleChangePortions,
        portions,
    };
};

export default useFoodDetail;
