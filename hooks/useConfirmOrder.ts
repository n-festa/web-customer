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

        router.push(routes.OrderDetail);
    };
    return { formRef, handleConfirm };
};

export default useConfirmOrder;
