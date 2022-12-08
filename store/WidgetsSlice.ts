import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  status: "fulfilled" | "pending" | "rejected" | "idle";
  widgets: {
    [key: string]: {
      type: "bar" | "line";
      title: string;
      subtitle: string;
      data: {
        labels: string[];
        datasets: {
          data: number[];
        };
      };
    };
  };
}

const initialState: IInitialState = {
  status: "idle",
  widgets: {},
};

const widgetSlice = createSlice({
  name: "widget_slice",
  initialState: initialState,
  reducers: {
    createWidget: (state, { payload }) => {
      const { widgetId, type, title, subtitle } = payload

      const widget = {
        type,
        title,
        subtitle,
        data: {
          labels: [],
          datasets: {
            data: []
          }
        }
      }

      state.widgets[widgetId] = widget
    }
  },
  // NOTE: THESE SHOULD PROBABLY BE IN CUSTOM HOOKS AND NOT IN REDUCER
  // REDUCER SHOULD JUST HAVE THE LOGIC TO CRUD GRAPHS
  extraReducers: (builder) => { },
});

export const { createWidget } = widgetSlice.actions
export default widgetSlice.reducer;