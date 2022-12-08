import { createSlice } from "@reduxjs/toolkit";

export interface IOneRepMaxLine {
  type: "line";
  title: string;
  subtitle: string;
  exerciseId: number;
}

interface ISessionFrequency {
  type: "bar";
  title: string;
  subtitle: string;
}

interface IInitialState {
  status: "fulfilled" | "pending" | "rejected" | "idle";
  widgets: {
    [key: string]: ISessionFrequency | IOneRepMaxLine
  };
}

const initialState: IInitialState = {
  status: "idle",
  widgets: {
    "wid-01": {
      type: "bar",
      title: "Sessions",
      subtitle: "Session Frequency"
    },
    "wid-02": {
      type: "line",
      title: "Sessions",
      subtitle: "Session Frequency",
      exerciseId: 2
    }
  },
};

const widgetSlice = createSlice({
  name: "widget_slice",
  initialState: initialState,
  reducers: {
    createWidget: (state, { payload }) => {
      const { type } = payload
      const { title, subtitle, widgetId } = payload

      state.widgets[widgetId] = {
        title,
        subtitle,
        type
      }

      if (type === "line") {
        const { exerciseId } = payload as IOneRepMaxLine
        const widget = state.widgets[widgetId] as IOneRepMaxLine
        widget.exerciseId = exerciseId
      }
    }
  },
  // NOTE: THESE SHOULD PROBABLY BE IN CUSTOM HOOKS AND NOT IN REDUCER
  // REDUCER SHOULD JUST HAVE THE LOGIC TO CRUD GRAPHS
  extraReducers: (builder) => { },
});

export const { createWidget } = widgetSlice.actions
export default widgetSlice.reducer;