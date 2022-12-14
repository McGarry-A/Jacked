import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";

export interface IOneRepMaxLine extends IWidgetInterface {
  exerciseId: number;
}

interface IWidgetInterface {
  type: "SESSION_FREQUENCY" | "ONE_REP_MAX_EST";
  title: string;
  subtitle: string;
}

type TWidget = IWidgetInterface | IOneRepMaxLine

interface IInitialState {
  status: "fulfilled" | "pending" | "rejected" | "idle";
  widgets: {
    [key: string]: TWidget
  };
}

const initialState: IInitialState = {
  status: "idle",
  widgets: {
    "wid-01": {
      type: "SESSION_FREQUENCY",
      title: "Sessions",
      subtitle: "Session Frequency"
    },
    "wid-02": {
      type: "ONE_REP_MAX_EST",
      title: "Barbell Bench Press Max",
      subtitle: "1RM Estimate",
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
  extraReducers: (builder) => {
    builder.addCase(createWidgetThunk.fulfilled, (state, { payload: { widget, id } }) => {
      if (!widget || !id) return

      const { type, title, subtitle } = widget as TWidget

      state.widgets[id] = {
        title,
        subtitle,
        type,

      }

      if (type === "ONE_REP_MAX_EST") {
        const { exerciseId } = widget as IOneRepMaxLine
        const newWidget = state.widgets[id] as IOneRepMaxLine
        newWidget.exerciseId = exerciseId
      }
    })
  },
});

interface ICreateWidget {
  widgetId: string;
  widget: TWidget
}

export const createWidgetThunk = createAsyncThunk(
  "widget/createWidget",
  async (payload: ICreateWidget, _) => {
    const { widgetId: id, widget } = payload
    const { error } = await supabase.from("widgets").insert({ ...payload })
    if (error) {
      console.error(error)
      return { payload: {}, id: null }
    }

    return { widget, id }
  }
)

export const { createWidget } = widgetSlice.actions
export default widgetSlice.reducer;