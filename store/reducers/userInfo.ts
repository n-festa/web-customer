import { Customer, UserForm } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    userInfo?: Customer;
    userForm: UserForm;
}

const initialState: initialStateType = {
    userInfo: undefined,
    userForm: {
        name: "",
        email: "",
        birthday: "",
        sex: "m",
        height_m: NaN,
        weight_kg: NaN,
        physical_activity_level: "light",
        current_diet: "Hỗn hợp",
        allergic_food: "",
        expected_diet: "Thuần chay",
    },
};
const userInfoSlice = createSlice({
    name: "sign",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<Customer | undefined>) => {
            state.userInfo = action.payload ? { ...state.userInfo, ...action.payload } : undefined;
        },
        setUserForm: (state, action: PayloadAction<UserForm | undefined>) => {
            state.userForm = { ...state.userForm, ...action.payload };
        },
    },
});

export const { setUserInfo, setUserForm } = userInfoSlice.actions;

export default userInfoSlice.reducer;
