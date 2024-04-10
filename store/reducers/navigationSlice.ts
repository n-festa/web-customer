import { routes } from "@/utils/routes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    currentRoute?: string;
    prevRoute?: string;
    domain?: string;
    prevLoginUrl?: string;
}

const initialState: initialStateType = {};

const authSlice = createSlice({
    name: "navigation",
    initialState,
    reducers: {
        setNavigationState: (state, action: PayloadAction<string>) => {
            if (action.payload.includes(routes.SignIn)) {
                state.prevLoginUrl = state.currentRoute;
            }
            state.prevRoute = state.currentRoute;
            state.currentRoute = action.payload;
        },
        clearPrevLoginUrl: (state) => {
            state.prevLoginUrl = undefined;
        },
        setDomain: (state, action: PayloadAction<string | undefined>) => {
            state.domain = action.payload;
        },
    },
});

export const { setNavigationState, setDomain, clearPrevLoginUrl } = authSlice.actions;

export default authSlice.reducer;
