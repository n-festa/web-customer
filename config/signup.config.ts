import * as Yup from "yup";
const signUp = {
    initialValues: {
        name: "",
        email: "",
        birthday: "",
        sex: "",
        height_m: "",
        weight_kg: "",
        physical_activity_level: "",
        current_diet: "",
        allergic_food: "",
        chronic_disease: "",
        expected_diet: "",
    },
    validationSchema: {
        validation: Yup.object({
            name: Yup.string().required("Vui lòng nhập trường này."),
            email: Yup.string().required("Vui lòng nhập trường này."),
            birthday: Yup.string().required("Vui lòng nhập trường này."),
            sex: Yup.string().required("Vui lòng nhập trường này."),
            height_m: Yup.number().required("Vui lòng nhập trường này."),
            weight_kg: Yup.number().required("Vui lòng nhập trường này."),
            physical_activity_level: Yup.string().required("Vui lòng nhập trường này."),
            current_diet: Yup.string(),
            allergic_food: Yup.string(),
            expected_diet: Yup.string(),
        }),
    },
    formData: {
        gender: [
            { value: "m", content: "Nam" },
            { value: "f", content: "Nữ" },
            { value: "o", content: "Khác" },
        ],
        physicalActivityLevel: [
            { value: "light", content: "Nhẹ nhàng" },
            { value: "moderate", content: "Trung bình" },
            { value: "vigorous", content: "Nặng" },
        ],
        currentDiet: [
            { value: "Hỗn hợp", content: "Hỗn hợp" },
            { value: "Thuần chay", content: "Thuần chay" },
            { value: "Chỉ ăn thịt", content: "Chỉ ăn thịt" },
            { value: "Cá", content: "Cá" },
            { value: "Chay", content: "Chay" },
            { value: "Không ăn kiêng", content: "Không ăn kiêng" },
        ],
        expectedDiet: [
            { value: "Thuần chay", content: "Thuần chay" },
            { value: "Eat clean", content: "Eat clean" },
            { value: "Tăng cơ", content: "Tăng cơ" },
            { value: "Bổ sung chất sơ", content: "Bổ sung chất sơ" },
            { value: "Chế độ ăn hỗn hợp", content: "Chế độ ăn hỗn hợp" },
            { value: "Khác", content: "Khác" },
        ],
    },
};
export default signUp;
