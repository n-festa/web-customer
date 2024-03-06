import { routes } from "@/utils/routes";
import { FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const useConfirmOrder = () => {
    const router = useRouter();

    const formRef = useRef<
        FormikProps<{
            province: string | undefined;
            district: string | undefined;
            ward: string | undefined;
            address: string | undefined;
            note: string;
        }>
    >(null);
    const handleConfirm = () => {
        // formRef.current?.submitForm();
        //TODO: orderId
        router.push(routes.OrderDetail + `/${123}`);
    };
    return { formRef, handleConfirm };
};

export default useConfirmOrder;
