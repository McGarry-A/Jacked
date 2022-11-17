import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface notificationInterface {
  title: string;
  type: "success" | "info" | "error" | null
  content?: string;
  show: boolean;
}

const initialState: notificationInterface = {
    title: "",
    type: null,
    show: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    notify: (state, action: PayloadAction<notificationInterface>) => {
      state = { ...action.payload };
    },
  },
});

export const { notify } = notificationSlice.actions;

export default notificationSlice.reducer;