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
            state.userInfo = action.payload
                ? { ...state.userInfo, ...action.payload }
                : {
                      latAddress: state.userInfo?.latAddress,
                      longAddress: state.userInfo?.longAddress,
                      address: state.userInfo?.address,
                      addressCompound: state.userInfo?.addressCompound,
                  };
        },
        clearKeepAddress: (state) => {
            state.userInfo = {
                latAddress: state.userInfo?.latAddress,
                longAddress: state.userInfo?.longAddress,
                address: state.userInfo?.address,
                addressCompound: state.userInfo?.addressCompound,
            };
        },
    },
});

export const { setUserInfo, clearKeepAddress } = userInfoSlice.actions;

export default userInfoSlice.reducer;
