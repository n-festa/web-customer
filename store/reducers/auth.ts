import { createSlice } from "@reduxjs/toolkit";
import { UserAuth } from "@/types";

interface initialStateType {
    phoneNumber: string;
    otp: string;
    access_token: string;
    userInfor?: UserAuth;
}

const initialState: initialStateType = {
    phoneNumber: "",
    otp: "",
    access_token: "",
};

const authSlice = createSlice({
    name: "sign",
    initialState,
    reducers: {
        setUserInfor: (state, { payload }) => {
            state.userInfor = payload;
        },
        setInfoSign: (state, { payload }) => {
            state.otp = payload.otp;
            state.phoneNumber = payload.phoneNumber;
        },
        setAccessToken: (state, { payload }) => {
            state.access_token = payload;
        },
    },
});

export const { setUserInfor, setInfoSign, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
