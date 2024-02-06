import apiServices from "@/services/sevices";
import { FoodDetailDto } from "@/types/response/FoodResponse";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const useFoodDetail = () => {
    const { product } = useParams();
    const [isLoading, setLoading] = useState(true);
    const formRef = useRef<HTMLFormElement>(null);
    const [foodInfo, setFoodInfo] = useState<{
        info?: FoodDetailDto;
        listSKUs: SKUsDto[];
    }>({
        listSKUs: [],
    });

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
    return {
        isLoading: isLoading,
        foodInfo: foodInfo,
        formRef: formRef,
    };
};

export default useFoodDetail;
