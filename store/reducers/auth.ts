import { createSlice } from "@reduxjs/toolkit";
import { UserAuth } from "@/types";
import { Customer } from "@/types";

interface initialStateType {
    phoneNumber: string;
    otp: string;
    access_token: string;
    refresh_token: string;
    userInfo?: UserAuth;
    profile?: Customer;
}

const initialState: initialStateType = {
    phoneNumber: "",
    otp: "",
    access_token: "",
    refresh_token: "",
};

const authSlice = createSlice({
    name: "sign",
    initialState,
    reducers: {
        setUserInfo: (state, { payload }) => {
            state.userInfo = payload;
        },
        setInfoSign: (state, { payload }) => {
            state.otp = payload.otp;
            state.phoneNumber = payload.phoneNumber;
        },
        setAccessToken: (state, { payload }) => {
            state.access_token = payload;
        },
        setRefreshToken: (state, { payload }) => {
            state.refresh_token = payload;
        },
        setProfile: (state, { payload }) => {
            state.profile = payload;
        },
    },
});

export const { setAccessToken, setRefreshToken, setProfile, setUserInfo, setInfoSign } = authSlice.actions;

export default authSlice.reducer;
