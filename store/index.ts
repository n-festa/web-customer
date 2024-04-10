import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import appSlice from "./reducers/appSlice";
import authReducer from "./reducers/auth";
import navigationSlice from "./reducers/navigationSlice";
import userInfoReducer from "./reducers/userInfo";
import storage from "./storage";

const rootReducer = combineReducers({
    auth: authReducer,
    userInfo: userInfoReducer,
    app: appSlice,
    navigation: navigationSlice,
});

const persistConfig = {
    key: "shoppingcart",
    blacklist: ["auth", "app"], // only counter will be persisted, add other reducers if needed
    storage, // if needed, use a safer storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
