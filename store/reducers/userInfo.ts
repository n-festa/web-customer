import { Customer } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    userInfo?: Customer;
} = {};
const userInfoSlice = createSlice({
    name: "sign",
    initialState,
    reducers: {
        setUserInfo: (state, { payload }: { payload?: Customer }) => {
            state.userInfo = payload ? { ...state.userInfo, ...payload } : undefined;
        },
    },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
