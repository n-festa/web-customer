import * as Yup from "yup";
const signUp = (t: any) => ({
    initialValues: {
        name: "",
        email: "",
        birthday: "",
        sex: "m",
        height_m: "",
        weight_kg: "",
        physical_activity_level: "light",
        current_diet: "Hỗn hợp",
        allergic_food: "",
        expected_diet: "Thuần chay",
    },
    validationSchema: {
        validation: Yup.object({
            name: Yup.string().required(t("MESSAGE_FORM.REQUIRED")),
            email: Yup.string().email(t("MESSAGE_FORM.EMAIL")).required(t("MESSAGE_FORM.REQUIRED")),
            birthday: Yup.string().required(t("MESSAGE_FORM.REQUIRED")),
            sex: Yup.string().required(t("MESSAGE_FORM.REQUIRED")),
            height_m: Yup.number().required(t("MESSAGE_FORM.REQUIRED")),
            weight_kg: Yup.number().required(t("MESSAGE_FORM.REQUIRED")),
            physical_activity_level: Yup.string().required(t("MESSAGE_FORM.REQUIRED")),
            current_diet: Yup.string(),
            allergic_food: Yup.string(),
            expected_diet: Yup.string(),
        }),
    },
    formData: {
        gender: [
            { value: "m", content: t("FORM_DATA.MEN") },
            { value: "f", content: t("FORM_DATA.WOMEN") },
            { value: "o", content: t("FORM_DATA.OTHER") },
        ],
        physicalActivityLevel: [
            { value: "light", content: t("FORM_DATA.LIGHT") },
            { value: "moderate", content: t("FORM_DATA.MODERATE") },
            { value: "vigorous", content: t("FORM_DATA.VIGOROUS") },
        ],
        currentDiet: [
            { value: "Hỗn hợp", content: t("FORM_DATA.MIXED") },
            { value: "Thuần chay", content: t("FORM_DATA.VEGAN1") },
            { value: "Chỉ ăn thịt", content: t("FORM_DATA.CARNIVORE") },
            { value: "Cá", content: t("FORM_DATA.FISH") },
            { value: "Chay", content: t("FORM_DATA.VEGETARIAN") },
            { value: "Không ăn kiêng", content: t("FORM_DATA.NO_DIET") },
        ],
        expectedDiet: [
            { value: "Thuần chay", content: t("FORM_DATA.VEGAN2") },
            { value: "Eat clean", content: t("FORM_DATA.EAT_CLEAN") },
            { value: "Tăng cơ", content: t("FORM_DATA.MUSCLE_GAIN") },
            { value: "Bổ sung chất sơ", content: t("FORM_DATA.FIBER_SUPPLEMENT") },
            { value: "Chế độ ăn hỗn hợp", content: t("FORM_DATA.MIXED_DIET") },
            { value: "Khác", content: t("FORM_DATA.OTHER") },
        ],
    },
});
export default signUp;
