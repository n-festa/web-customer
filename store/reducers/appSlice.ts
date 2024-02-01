import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
    modalOpened?: boolean;
    loading: boolean;
    errorScreenDes?: string | null;
}

const initialState: AppState = {
    loading: false,
};

export const delayReloadTime = () => Math.floor(Date.now() / 1000);

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setOpenModal: (state, action: PayloadAction<boolean | undefined>) => {
            state.modalOpened = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setErrorScreenDes: (state, action: PayloadAction<string | null>) => {
            state.errorScreenDes = action.payload;
        },
    },
});

export const { setOpenModal, setLoading, setErrorScreenDes } = appSlice.actions;

export default appSlice.reducer;
