import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import currentWorkoutSlice from "./currentWorkoutSlice";
import exerciseListSlice from "./exerciseList";
import userSlice from "./userSlice";
import workoutHistorySlice from "./workoutHistorySlice";
import templateSlice from "./templateSlice";
import widgetSlice from "./WidgetsSlice";
import weightSlice from "./weightSlice";

const store = configureStore({
  reducer: {
    exerciseListSlice,
    currentWorkoutSlice,
    userSlice,
    workoutHistorySlice,
    templateSlice,
    widgetSlice,
    weightSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
