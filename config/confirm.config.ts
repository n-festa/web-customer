import * as Yup from "yup";
const confirmOrder = {
    initialValues: {
        note: "",
    },
    validationSchema: {
        validation: Yup.object({
            province: Yup.string().required("Vui lòng chọn tỉnh/thành phố."),
            district: Yup.string().required("Vui lòng chọn quận/huyện."),
            ward: Yup.string().required("Vui lòng chọn xã/phường"),
            address: Yup.string().required("Vui lòng nhập địa chỉ"),
            note: Yup.string(),
        }),
    },
};
export default confirmOrder;
