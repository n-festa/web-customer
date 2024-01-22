import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    phoneNumber: string;
    otp: string;
}

const initialState: initialStateType = {
    phoneNumber: "",
    otp: "string",
};

const AuthSlice = createSlice({
    name: "sign",
    initialState,
    reducers: {
        setOtp: (state, { payload }) => {
            state.otp = payload;
        },
    },
});

export const { setOtp } = AuthSlice.actions;

export default AuthSlice.reducer;
