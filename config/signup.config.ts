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
