import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabase/supabaseClient";

export interface IOneRepMaxLine {
  type: "ONE_REP_MAX_EST";
  title: string;
  subtitle: string;
  exerciseId: number;
}

export interface IWidgetInterface {
  type: "SESSION_FREQUENCY";
  title: string;
  subtitle: string;
}

export type TWidget = IWidgetInterface | IOneRepMaxLine

interface IInitialState {
  status: "fulfilled" | "pending" | "rejected" | "idle";
  widgets: {
    [key: string]: TWidget
  };
}

const initialState: IInitialState = {
  status: "idle",
  widgets: {
    "wid-99999": {
      type: "SESSION_FREQUENCY",
      title: "Sessions",
      subtitle: "Session Frequency"
    },
    "wid-99991": {
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
    // createWidget: (state, { payload }) => {
    //   const { type } = payload
    //   const { title, subtitle, widgetId } = payload

    //   state.widgets[widgetId] = {
    //     title,
    //     subtitle,
    //     type
    //   }

    //   if (type === "ONE_REP_MAX_EST") {
    //     const { exerciseId } = payload as IOneRepMaxLine
    //     const widget = state.widgets[widgetId] as IOneRepMaxLine
    //     widget.exerciseId = exerciseId
    //   }
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(createWidget.fulfilled, (state, { payload }) => {
      if (!payload) return

      const { widgetId } = payload

      const { type, title, subtitle } = payload as TWidget

      let newWidget = {
        title,
        subtitle,
        type,
      }

      state.widgets[widgetId] = newWidget as TWidget

      if (type === "ONE_REP_MAX_EST") {
        const { exerciseId } = payload as IOneRepMaxLine
        const newWidget = state.widgets[widgetId] as IOneRepMaxLine
        newWidget.exerciseId = exerciseId
      }
    })
      .addCase(createWidget.rejected, (state, payload) => {
        state.status = "rejected"
      })
      .addCase(getWidgets.fulfilled, (state, payload) => {
        console.log("fulfilled ", payload)
        state.status = "fulfilled"
      })
      .addCase(getWidgets.rejected, (state, payload) => {
        console.log("rejected ", payload)
        state.status = "fulfilled"
      })
  },
});

interface IGetWidgets {
  userId: string;
}

export const getWidgets = createAsyncThunk(
  "widget/getWidgets",
  async (payload: IGetWidgets, { rejectWithValue }) => {
    console.log("GETWIDGETS!")
    const { userId } = payload

    const { data, error } = await supabase.from("widgets").select("id, type, title, subtitle, exerciseId").eq("userId", userId)

    if (error) {
      console.error(error)
      return rejectWithValue([])
    }

    console.log("data ", data)

    return data
  }
)

export const createWidget = createAsyncThunk(
  "widget/createWidget",
  async (payload: TWidget, { rejectWithValue }) => {
    const { subtitle, title, type } = payload

    let newWidget = {
      type,
      title,
      subtitle,
    }

    if ("exerciseId" in payload && type === "ONE_REP_MAX_EST") {
      const { exerciseId } = payload as IOneRepMaxLine
      newWidget = { ...newWidget, exerciseId } as IOneRepMaxLine
    }

    const { data, error } = await supabase.from("widgets").insert(newWidget)

    if (error) {
      console.error(error)
      return rejectWithValue({})
    }

    return {
      ...payload, widgetId: data[0].id
    }
  }
)

// export const { createWidget } = widgetSlice.actions
export default widgetSlice.reducer;