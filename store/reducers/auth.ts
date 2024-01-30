import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    phoneNumber: string;
    otp: string;
    access_token: string;
    refresh_token: string;
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
    },
});

export const { setAccessToken, setRefreshToken, setInfoSign } = authSlice.actions;

export default authSlice.reducer;
