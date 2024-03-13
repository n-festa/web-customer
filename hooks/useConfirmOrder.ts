import { totalQuantityState } from "@/recoil/recoilState";
import { routes } from "@/utils/routes";
import { FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWRAPI from "./useApi";
import useUpdateCart from "./useUpdateCart";

const useConfirmOrder = () => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<string>();
    const formRef = useRef<
        FormikProps<{
            province: string | undefined;
            district: string | undefined;
            ward: string | undefined;
            address: string | undefined;
            note: string;
        }>
    >(null);
    const totalItem = useRecoilValue(totalQuantityState);
    const { totalPrice, cartSync: cart } = useUpdateCart();
    const { GetApplicationFee, GetCutleryFee } = useSWRAPI();
    const [cutleryFee, setCutleryFee] = useState<number>();
    const [addCutlery, setAddCutlery] = useState(false);

    const [applicationFee, setApplicationFee] = useState<number>();

    const { data: applicationFeeData } = GetApplicationFee({ itemTotal: totalPrice, exchangeRate: 1 });
    const { data: cutleryFeeData } = GetCutleryFee(addCutlery, {
        restaurant_id: cart?.restaurant_id,
        item_quantity: totalItem,
    });
    useEffect(() => {
        if (cutleryFeeData) {
            setCutleryFee(cutleryFeeData.cutlery_fee);
        }
    }, [cutleryFeeData]);
    useEffect(() => {
        if (applicationFeeData) {
            setApplicationFee(applicationFeeData.application_fee);
        }
    }, [applicationFeeData]);

    const handleConfirm = () => {
        // formRef.current?.submitForm();
        //TODO: orderId
        router.push(routes.OrderDetail + `/${123}`);
    };
    return {
        totalPrice,
        formRef,
        handleConfirm,
        paymentMethod,
        setPaymentMethod,
        cart,
        applicationFee,
        cutleryFee,
        setAddCutlery,
        addCutlery,
    };
};

export default useConfirmOrder;
