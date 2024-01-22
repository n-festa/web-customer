import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    phoneNumber: string;
    otp: string;
    access_token: string;
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
        setInfoSign: (state, { payload }) => {
            state.otp = payload.otp;
            state.phoneNumber = payload.phoneNumber;
        },
        setAccessToken: (state, { payload }) => {
            state.access_token = payload;
        },
    },
});

export const { setInfoSign, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
