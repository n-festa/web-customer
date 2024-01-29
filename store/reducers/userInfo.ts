import { Customer } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
    userInfo?: Customer;
} = {};
const userInfoSlice = createSlice({
    name: "sign",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<Customer | undefined>) => {
            state.userInfo = action.payload ? { ...state.userInfo, ...action.payload } : undefined;
        },
    },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
